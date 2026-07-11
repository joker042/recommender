import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../../server/src/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BATCH_SIZE = 20;
const BATCH_DELAY_MS = 2000;
const DEFAULT_LIMIT = 100;

const WP_API = 'https://en.wikipedia.org/w/api.php';
const HEADERS = {
  'User-Agent': 'RecommenderEnrichBot/1.0 (https://github.com/anomalyco/opencode)',
  'Accept': 'application/json',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function wikipediaSearch(title) {
  const url = `${WP_API}?action=query&list=search&srsearch=${encodeURIComponent(title)}&format=json`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.query?.search?.length) return null;
  return data.query.search[0];
}

async function wikipediaExtract(pageId) {
  const url = `${WP_API}?action=query&prop=extracts&exintro=1&explaintext=1&pageids=${pageId}&format=json`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query?.pages;
  if (!pages) return null;
  const page = pages[pageId];
  if (!page || page.missing) return null;
  return page.extract || null;
}

async function wikipediaCategories(pageId) {
  const url = `${WP_API}?action=parse&pageid=${pageId}&prop=categories&format=json`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return [];
  const data = await res.json();
  if (data.error) return [];
  const cats = data.parse?.categories || [];
  return cats
    .map(c => c['*'])
    .filter(c =>
      !c.startsWith('Articles ') &&
      !c.startsWith('All ') &&
      !c.startsWith('CS1 ') &&
      !c.startsWith('Webarchive ') &&
      !c.startsWith('Wikipedia ') &&
      !c.includes('_disambiguation_pages') &&
      !c.includes('_article_disambiguation') &&
      !c.startsWith('Short_description') &&
      !c.startsWith('IMDb ') &&
      !c.includes('pages_with') &&
      !c.startsWith('Use_') &&
      !c.startsWith('Official_website')
    );
}

function parseInfoboxPeople(html) {
  const people = [];

  const directed = html.match(/Directed by<\/th>\s*<td[^>]*>(.*?)<\/td>/is);
  if (directed) {
    extractNamesFromHtml(directed[1]).forEach(n => people.push({ name: n, role: 'director' }));
  }

  const starring = html.match(/Starring<\/th>\s*<td[^>]*>(.*?)<\/td>/is);
  if (starring) {
    extractNamesFromHtml(starring[1]).slice(0, 5).forEach(n => people.push({ name: n, role: 'cast' }));
  }

  const created = html.match(/Created by<\/th>\s*<td[^>]*>(.*?)<\/td>/is);
  if (created) {
    extractNamesFromHtml(created[1]).forEach(n => people.push({ name: n, role: 'creator' }));
  }

  const written = html.match(/Written by<\/th>\s*<td[^>]*>(.*?)<\/td>/is);
  if (written) {
    extractNamesFromHtml(written[1]).forEach(n => people.push({ name: n, role: 'writer' }));
  }

  return people;
}

function extractNamesFromHtml(html) {
  const names = [];
  const cleaned = html
    .replace(/<sup[^>]*>.*?<\/sup>/g, '')
    .replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#91;\d+&#93;/g, '')
    .replace(/\[\d+\]/g, '');

  for (const part of cleaned.split(/[\n,;]/)) {
    const name = part.trim();
    if (name.length > 2 && name.length < 120 && !/^[\d\s.]+$/.test(name)) {
      names.push(name);
    }
  }
  return names;
}

async function wikipediaInfobox(pageId) {
  const url = `${WP_API}?action=parse&pageid=${pageId}&prop=text&section=0&format=json`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return [];
  const data = await res.json();
  if (data.error) return [];
  const text = data.parse?.text?.['*'];
  if (!text) return [];
  return parseInfoboxPeople(text);
}

async function fetchWikipedia(title) {
  const searchResult = await wikipediaSearch(title);
  if (!searchResult) return null;

  const pageId = searchResult.pageid;
  const wikiTitle = searchResult.title;
  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiTitle.replace(/ /g, '_'))}`;

    const [extract, categories, people] = await Promise.allSettled([
    wikipediaExtract(pageId),
    wikipediaCategories(pageId),
    wikipediaInfobox(pageId),
  ]);

  return {
    wikiUrl,
    synopsis: extract.status === 'fulfilled' && extract.value ? extract.value.substring(0, 5000) : null,
    categories: categories.status === 'fulfilled' ? categories.value : [],
    people: people.status === 'fulfilled' ? people.value : [],
  };
}

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS show_details (
      show_id        INTEGER PRIMARY KEY REFERENCES shows(id) ON DELETE CASCADE,
      synopsis       TEXT,
      wikipedia_url  TEXT,
      enriched_at    TIMESTAMPTZ DEFAULT now()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS show_people (
      id      SERIAL PRIMARY KEY,
      show_id INTEGER REFERENCES shows(id) ON DELETE CASCADE,
      name    TEXT NOT NULL,
      role    TEXT NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS show_categories (
      id       SERIAL PRIMARY KEY,
      show_id  INTEGER REFERENCES shows(id) ON DELETE CASCADE,
      category TEXT NOT NULL
    )
  `);
  console.log('Tables ready.');
}

async function getShowsToEnrich(limitVal) {
  const { rows } = await pool.query(
    'SELECT id, title, type, year FROM shows WHERE id NOT IN (SELECT show_id FROM show_details WHERE synopsis IS NOT NULL) ORDER BY id LIMIT $1',
    [limitVal],
  );
  return rows;
}

async function storeEnrichment(showId, wikiData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (wikiData) {
      await client.query(
        'INSERT INTO show_details (show_id, synopsis, wikipedia_url) VALUES ($1, $2, $3) ON CONFLICT (show_id) DO UPDATE SET synopsis=$2, wikipedia_url=$3, enriched_at=now()',
        [showId, wikiData.synopsis, wikiData.wikiUrl],
      );

      await client.query('DELETE FROM show_people WHERE show_id = $1', [showId]);
      await client.query('DELETE FROM show_categories WHERE show_id = $1', [showId]);

      try {
        if (wikiData.people.length > 0) {
          const values = [];
          const params = [];
          for (let i = 0; i < wikiData.people.length; i++) {
            const p = wikiData.people[i];
            const offset = i * 3;
            values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);
            params.push(showId, p.name, p.role);
          }
          await client.query(
            `INSERT INTO show_people (show_id, name, role) VALUES ${values.join(', ')}`,
            params,
          );
        }
      } catch (err) {
        console.error(`  [warn] people insert failed for ${showId}: ${err.message}`);
      }

      try {
        if (wikiData.categories.length > 0) {
          const values = [];
          const params = [];
          for (let i = 0; i < wikiData.categories.length; i++) {
            const offset = i * 2;
            values.push(`($${offset + 1}, $${offset + 2})`);
            params.push(showId, wikiData.categories[i]);
          }
          await client.query(
            `INSERT INTO show_categories (show_id, category) VALUES ${values.join(', ')}`,
            params,
          );
        }
      } catch (err) {
        console.error(`  [warn] categories insert failed for ${showId}: ${err.message}`);
      }
    } else {
      await client.query(
        'INSERT INTO show_details (show_id) VALUES ($1) ON CONFLICT (show_id) DO NOTHING',
        [showId],
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function exportSql() {
  const output = path.join(__dirname, 'enriched.sql');

  const client = await pool.connect();
  try {
    const { rows: details } = await client.query('SELECT * FROM show_details ORDER BY show_id');
    const { rows: people } = await client.query('SELECT * FROM show_people ORDER BY id');
    const { rows: categories } = await client.query('SELECT * FROM show_categories ORDER BY id');

    const lines = ['-- Wikipedia enrichment data', 'BEGIN;', ''];

    lines.push('-- show_details');
    for (const r of details) {
      lines.push(`INSERT INTO show_details (show_id, synopsis, wikipedia_url, enriched_at) VALUES (${r.show_id}, ${esc(r.synopsis)}, ${esc(r.wikipedia_url)}, ${esc(r.enriched_at)});`);
    }
    lines.push('');

    lines.push('-- show_people');
    for (const r of people) {
      lines.push(`INSERT INTO show_people (id, show_id, name, role) VALUES (${r.id}, ${r.show_id}, ${esc(r.name)}, ${esc(r.role)});`);
    }
    lines.push('');

    lines.push('-- show_categories');
    for (const r of categories) {
      lines.push(`INSERT INTO show_categories (id, show_id, category) VALUES (${r.id}, ${r.show_id}, ${esc(r.category)});`);
    }
    lines.push('');

    lines.push('COMMIT;');
    const sql = lines.join('\n');
    fs.writeFileSync(output, sql);
    const compressed = zlib.gzipSync(Buffer.from(sql), { level: 9 });
    fs.writeFileSync(output + '.gz', compressed);
    console.log(`Exported ${details.length} details, ${people.length} people, ${categories.length} categories to enriched.sql.gz`);
  } finally {
    client.release();
  }
}

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (val instanceof Date) return `'${val.toISOString()}'`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function main() {
  const limitVal = parseInt(process.argv[2], 10) || DEFAULT_LIMIT;
  console.log(`Enriching up to ${limitVal} shows from Wikipedia...\n`);

  await createTables();

  const shows = await getShowsToEnrich(limitVal);
  if (shows.length === 0) {
    console.log('No shows to enrich. All shows already have entries in show_details.');
    await pool.end();
    return;
  }
  console.log(`Found ${shows.length} shows to enrich.\n`);

  let enriched = 0;
  let skipped = 0;

  for (let i = 0; i < shows.length; i += BATCH_SIZE) {
    const batch = shows.slice(i, i + BATCH_SIZE);
    const results = [];
    for (let j = 0; j < batch.length; j++) {
      const show = batch[j];
      if (j > 0) await sleep(500);
      try {
        const wikiData = await fetchWikipedia(show.title);
        await storeEnrichment(show.id, wikiData);
        results.push({ show, wikiData });
      } catch (err) {
        console.error(`  ERROR on ${show.title}: ${err.message}`);
        try {
          await storeEnrichment(show.id, null);
        } catch (_) {}
        results.push({ show, wikiData: null });
      }
    }

    for (const { show, wikiData } of results) {
      if (wikiData && wikiData.synopsis) {
        enriched++;
        const synLen = wikiData.synopsis.length;
        const catCount = wikiData.categories.length;
        const pplCount = wikiData.people.length;
        console.log(`  Show ${show.id}/${show.title}: ${synLen} chars, ${catCount} categories, ${pplCount} people`);
      } else {
        skipped++;
        console.log(`  Show ${show.id}/${show.title}: NO WIKIPEDIA PAGE`);
      }
    }

    const remaining = shows.length - i - batch.length;
    if (remaining > 0) {
      const done = enriched + skipped;
      console.log(`  [${done}/${shows.length}] Sleeping 2s... (${remaining} remaining)\n`);
      await sleep(BATCH_DELAY_MS);
    }
  }

  console.log(`\nDone! Enriched: ${enriched}, Skipped: ${skipped}`);

  await exportSql();
  await pool.end();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
