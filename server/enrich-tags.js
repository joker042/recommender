import pool from './src/db.js';

const KEYWORD_MAP = [
  { keywords: ['zombie', 'undead', 'apocalypse', 'outbreak', 'walker'], tag: 'zombies' },
  { keywords: ['vampire', 'bloodsucker', 'dracula', 'nosferatu'], tag: 'vampires' },
  { keywords: ['werewolf', 'lycan', 'shapeshifter'], tag: 'werewolves' },
  { keywords: ['ghost', 'haunt', 'spirit', 'specter', 'apparition', 'poltergeist'], tag: 'ghosts' },
  { keywords: ['demon', 'exorcism', 'possession', 'devil', 'satanic', 'hell', 'demonic'], tag: 'demons' },
  { keywords: ['witch', 'wizard', 'sorcerer', 'sorcery', 'magic', 'spell', 'enchant', 'occult'], tag: 'magic' },
  { keywords: ['dragon', 'dragon'], tag: 'fantasy' },
  { keywords: ['alien', 'extraterrestrial', 'ufo', 'mars', 'invasion'], tag: 'aliens' },
  { keywords: ['robot', 'android', 'cyborg', 'mecha', 'mechanical', 'automaton'], tag: 'robots' },
  { keywords: ['time travel', 'time machine', 'time loop', 'time paradox', 'time slip', 'past', 'future'], tag: 'time-travel' },
  { keywords: ['ai', 'artificial intelligence', 'machine learning', 'conscious machine', 'sentient'], tag: 'artificial-intelligence' },
  { keywords: ['parallel universe', 'multiverse', 'alternate dimension', 'alternate reality', 'alternate timeline', 'alternate world'], tag: 'parallel-universe' },
  { keywords: ['space', 'spacecraft', 'spaceship', 'interstellar', 'galaxy', 'astronaut', 'cosmic', 'planet', 'orbit', 'space colony'], tag: 'space-exploration' },
  { keywords: ['prison', 'inmate', 'jail', 'incarcerated', 'cell', 'penitentiary', 'convict', 'escape from prison'], tag: 'prison' },
  { keywords: ['mafia', 'mob', 'gangster', 'crime family', 'organized crime'], tag: 'mafia' },
  { keywords: ['high school', 'college', 'student', 'teacher', 'campus', 'academia', 'classroom', 'university'], tag: 'school' },
  { keywords: ['office', 'coworker', 'corporate', 'company', 'startup', 'boss', 'employee'], tag: 'workplace' },
  { keywords: ['small town', 'village', 'rural', 'countryside', 'suburb', 'provincial'], tag: 'small-town' },
  { keywords: ['city', 'urban', 'metropolis', 'downtown'], tag: 'big-city' },
  { keywords: ['heist', 'robbery', 'burglary', 'thief', 'steal', 'con artist', 'con man', 'scam', 'grift'], tag: 'heist' },
  { keywords: ['surviv', 'wilderness', 'castaway', 'stranded', 'shipwreck', 'desert island'], tag: 'survival' },
  { keywords: ['immortal', 'live forever', 'ageless', 'eternal life'], tag: 'immortality' },
  { keywords: ['reincarnation', 'past life', 'rebirth', 'born again'], tag: 'reincarnation' },
  { keywords: ['memory', 'amnesia', 'remember', 'forget', 'lost memory', 'mind'], tag: 'memory' },
  { keywords: ['identity', 'who am i', 'imposter', 'doppelganger', 'double life', 'secret life', 'dual identity'], tag: 'identity' },
  { keywords: ['family', 'parent', 'mother', 'father', 'son', 'daughter', 'sibling', 'brother', 'sister', 'generational'], tag: 'family-dynamics' },
  { keywords: ['politics', 'president', 'election', 'government', 'senator', 'congress', 'parliament', 'diplomat', 'political'], tag: 'politics' },
  { keywords: ['war', 'battle', 'soldier', 'military', 'army', 'navy', 'combat', 'front line', 'battlefield'], tag: 'war' },
  { keywords: ['revolution', 'uprising', 'rebel', 'overthrow', 'insurrection', 'coup'], tag: 'revolution' },
  { keywords: ['spy', 'espionage', 'intelligence agency', 'cia', 'kgb', 'mi6', 'secret agent', 'double agent', 'covert'], tag: 'espionage' },
  { keywords: ['hacker', 'hacking', 'cyber', 'computer', 'digital', 'code', 'programmer'], tag: 'hacking' },
  { keywords: ['video game', 'gamer', 'rpg', 'mmorpg', 'virtual reality', 'vr', 'game world'], tag: 'gaming' },
  { keywords: ['music', 'musician', 'band', 'singer', 'rapper', 'concert', 'recording', 'songwriter', 'rock star'], tag: 'music-industry' },
  { keywords: ['hollywood', 'actor', 'actress', 'filmmaking', 'movie set', 'film industry', 'director'], tag: 'hollywood' },
  { keywords: ['fashion', 'model', 'designer', 'runway', 'couture', 'clothing'], tag: 'fashion' },
  { keywords: ['cook', 'chef', 'restaurant', 'kitchen', 'food', 'recipe', 'baking', 'culinary', 'gourmet'], tag: 'food' },
  { keywords: ['doctor', 'hospital', 'nurse', 'surgery', 'patient', 'clinic', 'diagnosis', 'surgeon', 'er'], tag: 'medicine' },
  { keywords: ['lawyer', 'attorney', 'court', 'judge', 'trial', 'lawsuit', 'legal', 'prosecutor', 'defense'], tag: 'law' },
  { keywords: ['business', 'entrepreneur', 'ceo', 'wall street', 'finance', 'invest', 'startup', 'corporation', 'tycoon'], tag: 'business' },
  { keywords: ['journalist', 'newspaper', 'reporter', 'newsroom', 'press', 'media', 'broadcast', 'anchor'], tag: 'journalism' },
  { keywords: ['travel', 'journey', 'road trip', 'backpack', 'voyage', 'expedition', 'tour'], tag: 'traveling' },
  { keywords: ['royal', 'king', 'queen', 'prince', 'princess', 'monarch', 'throne', 'crown', 'palace'], tag: 'royalty' },
  { keywords: ['pirate', 'buccaneer', 'swashbuckler', 'treasure hunt', 'high seas'], tag: 'pirates' },
  { keywords: ['ninja', 'shinobi'], tag: 'ninjas' },
  { keywords: ['samurai', 'ronin', 'bushido', 'feudal japan', 'shogun'], tag: 'samurai' },
  { keywords: ['viking', 'norse', 'nordic warrior', 'valhalla', 'ragnar'], tag: 'vikings' },
  { keywords: ['dystopia', 'dystopian', 'totalitarian', 'authoritarian', 'oppressive regime', 'big brother', 'orwellian'], tag: 'dystopian' },
  { keywords: ['utopia', 'perfect society', 'paradise'], tag: 'utopia' },
  { keywords: ['apocalypse', 'apocalyptic', 'end of the world', 'post-apocalyptic', 'nuclear war', 'doomsday', 'armageddon'], tag: 'post-apocalyptic' },
  { keywords: ['superhero', 'superhero', 'superpower', 'mutant', 'vigilante', 'hero'], tag: 'superhero' },
  { keywords: ['secret identity', 'alter ego', 'disguise', 'hidden identity', 'undercover'], tag: 'secret-identity' },
  { keywords: ['found family', 'makeshift family', 'chosen family', 'unlikely family', 'bond'], tag: 'found-family' },
  { keywords: ['redemption', 'second chance', 'atonement', 'forgive', 'redeem'], tag: 'redemption' },
  { keywords: ['revenge', 'vengeance', 'retribution', 'payback', 'avenge', 'vendetta', 'get even'], tag: 'revenge' },
  { keywords: ['betrayal', 'betray', 'backstab', 'double cross', 'traitor', 'treachery'], tag: 'betrayal' },
  { keywords: ['sacrifice', 'martyr', 'selfless', 'give up', 'lay down'], tag: 'sacrifice' },
  { keywords: ['power struggle', 'power grab', 'fight for power', 'succession', 'coup'], tag: 'power-struggle' },
  { keywords: ['corruption', 'corrupt', 'bribe', 'graft', 'dirty cop', 'scandal'], tag: 'corruption' },
  { keywords: ['justice', 'injustice', 'wrongful', 'fair trial', 'righteous'], tag: 'justice' },
  { keywords: ['freedom', 'liberation', 'escape from oppression', 'breaking free'], tag: 'freedom' },
  { keywords: ['oppression', 'oppressed', 'tyranny', 'dictator', 'subjugation'], tag: 'oppression' },
  { keywords: ['rebellion', 'resistance', 'underground movement', 'insurgent'], tag: 'rebellion' },
  { keywords: ['discovery', 'discover', 'uncover', 'find', 'reveal'], tag: 'discovery' },
  { keywords: ['invention', 'inventor', 'innovation', 'breakthrough', 'genius'], tag: 'invention' },
  { keywords: ['exploration', 'explore', 'expedition', 'uncharted', 'frontier'], tag: 'exploration' },
  { keywords: ['colonial', 'colony', 'settlement', 'settler', 'colonize'], tag: 'colonization' },
  { keywords: ['first contact', 'first encounter', 'meeting aliens'], tag: 'first-contact' },
  { keywords: ['alien invasion', 'invasion of earth'], tag: 'alien-invasion' },
  { keywords: ['conspiracy', 'conspiracy theory', 'cover up', 'secret government', 'hidden truth'], tag: 'conspiracy' },
  { keywords: ['cult', 'religious sect', 'brainwash', 'charismatic leader', 'commune'], tag: 'cult' },
  { keywords: ['god', 'myth', 'mythology', 'pantheon', 'greek', 'norse', 'egyptian', 'deity'], tag: 'gods-and-mythology' },
  { keywords: ['clone', 'cloning', 'genetic copy', 'duplicate'], tag: 'clones' },
  { keywords: ['dinosaur', 'prehistoric creature', 'jurassic', 'cretaceous', 'extinct'], tag: 'dinosaurs' },
  { keywords: ['serial killer', 'murder spree', 'psychopath', 'sociopath'], tag: 'crime' },
  { keywords: ['drug', 'addiction', 'rehab', 'withdrawal', 'overdose', 'substance abuse', 'narcotic'], tag: 'drama' },
  { keywords: ['race', 'racism', 'racial', 'discrimination', 'civil rights', 'segregation'], tag: 'drama' },
  { keywords: ['lgbt', 'gay', 'lesbian', 'transgender', 'queer', 'sexuality', 'coming out'], tag: 'drama' },
  { keywords: ['religion', 'faith', 'church', 'priest', 'monastery', 'spirituality', 'belief'], tag: 'drama' },
  { keywords: ['class', 'inequality', 'poverty', 'wealth', 'social divide', 'rich and poor'], tag: 'drama' },
  { keywords: ['dark', 'grim', 'bleak', 'brooding', 'somber'], tag: 'dark' },
  { keywords: ['funny', 'humor', 'hilarious', 'laugh', 'comic', 'witty', 'joke'], tag: 'funny' },
  { keywords: ['feel good', 'heartwarming', 'uplifting', 'charming', 'delightful', 'joyful'], tag: 'feel-good' },
  { keywords: ['intense', 'gripping', 'edge of seat', 'nail biting', 'nerve wracking'], tag: 'intense' },
  { keywords: ['melancholy', 'melancholic', 'sad', 'tragic', 'sorrow', 'grief', 'mourning', 'loss', 'heartbreaking'], tag: 'melancholic' },
  { keywords: ['quirky', 'odd', 'eccentric', 'peculiar', 'unusual', 'offbeat', 'whimsical'], tag: 'quirky' },
  { keywords: ['hope', 'optimistic', 'aspirational', 'hopeful', 'inspire'], tag: 'hopeful' },
  { keywords: ['bleak', 'despair', 'hopeless', 'nihilistic', 'pessimistic'], tag: 'bleak' },
  { keywords: ['suspense', 'tension', 'mystery', 'cliffhanger', 'whodunit', 'whodunnit'], tag: 'suspenseful' },
  { keywords: ['thrill', 'exciting', 'exhilarating', 'adrenaline', 'pulse pounding'], tag: 'thrilling' },
  { keywords: ['cozy', 'comfort', 'gentle', 'pleasant', 'warmth'], tag: 'cozy' },
  { keywords: ['gritty', 'raw', 'rough', 'brutal', 'unflinching', 'realistic'], tag: 'gritty' },
  { keywords: ['epic', 'grand', 'sweeping', 'vast', 'monumental', 'cinematic'], tag: 'epic' },
  { keywords: ['intimate', 'personal', 'close up', 'character driven'], tag: 'intimate' },
  { keywords: ['chaos', 'chaotic', 'frenetic', 'wild', 'frantic', 'manic'], tag: 'chaotic' },
  { keywords: ['calm', 'serene', 'peaceful', 'meditative', 'tranquil', 'soothing'], tag: 'calm' },
  { keywords: ['nostalgia', 'nostalgic', 'retro', 'throwback', 'childhood'], tag: 'nostalgic' },
  { keywords: ['bittersweet', 'poignant', 'touching'], tag: 'bittersweet' },
  { keywords: ['disturbing', 'unsettling', 'creepy', 'chilling', 'horrifying'], tag: 'disturbing' },
  { keywords: ['eerie', 'creepy', 'uncanny', 'strange', 'mysterious atmosphere'], tag: 'eerie' },
  { keywords: ['tense', 'high stakes', 'pressure', 'anxiety'], tag: 'tense' },
  { keywords: ['relaxing', 'easy', 'laid back', 'chill', 'ambient'], tag: 'relaxing' },
  { keywords: ['inspirational', 'inspiring', 'motivational', 'empowering'], tag: 'inspirational' },
  { keywords: ['serious', 'solemn', 'grave', 'weighty'], tag: 'serious' },
  { keywords: ['dramatic', 'emotional', 'turbulent', 'tumultuous'], tag: 'dramatic' },
  { keywords: ['lighthearted', 'carefree', 'playful', 'breezy'], tag: 'lighthearted' },
  { keywords: ['nonlinear', 'non linear', 'fragmented narrative', 'out of order'], tag: 'nonlinear' },
  { keywords: ['unreliable narrator', 'untrustworthy narrator'], tag: 'unreliable-narrator' },
  { keywords: ['flashback', 'flashback'], tag: 'flashbacks' },
  { keywords: ['dream', 'surreal', 'hallucination', 'psychedelic', 'fantasy sequence'], tag: 'dream-sequence' },
  { keywords: ['twist', 'twist ending', 'surprise ending', 'shocking reveal', 'plot twist'], tag: 'twist-ending' },
  { keywords: ['voiceover', 'narration', 'narrated by', 'narrator'], tag: 'voiceover' },
  { keywords: ['fourth wall', 'meta', 'self aware', 'self referential'], tag: 'breaking-fourth-wall' },
  { keywords: ['slow burn', 'slow pace', 'gradual', 'methodical pace'], tag: 'slow-burn' },
  { keywords: ['found footage', 'handheld camera', 'amateur footage'], tag: 'found-footage' },
  { keywords: ['black and white', 'monochrome', 'noir style'], tag: 'black-and-white' },
  { keywords: ['ensemble', 'multiple characters', 'interwoven stories', 'large cast', 'many characters'], tag: 'ensemble-cast' },
  { keywords: ['musical', 'song and dance', 'show tune', 'original songs'], tag: 'musical-numbers' },
  { keywords: ['fight', 'martial arts', 'combat', 'action sequence', 'brawl'], tag: 'fight-scenes' },
  { keywords: ['car chase', 'pursuit', 'high speed'], tag: 'car-chases' },
  { keywords: ['documentary style', 'mockumentary', 'pseudo documentary'], tag: 'documentary-style' },
  { keywords: ['cliffhanger', 'cliffhanger ending', 'unresolved'], tag: 'cliffhangers' },
  { keywords: ['anthology', 'collection of stories', 'short stories'], tag: 'anthology' },
  { keywords: ['reboot', 'reboot'], tag: 'reboot' },
  { keywords: ['remake', 'remake'], tag: 'remake' },
  { keywords: ['spin off', 'spinoff'], tag: 'spin-off' },
  { keywords: ['prequel', 'prequel', 'origin story'], tag: 'prequel' },
  { keywords: ['sequel', 'sequel', 'continuation'], tag: 'sequel' },
  { keywords: ['animation', 'anime', 'cartoon', 'animated', 'cgi animation'], tag: 'animation' },
];

const ERA_MAP = [
  { min: -10000, max: 1899, tag: 'pre-1900s' },
  { min: 1900, max: 1909, tag: 'edwardian' },
  { min: 1910, max: 1919, tag: 'edwardian' },
  { min: 1920, max: 1929, tag: 'edwardian' },
  { min: 1930, max: 1939, tag: 'period-piece' },
  { min: 1940, max: 1949, tag: 'period-piece' },
  { min: 1950, max: 1959, tag: '1950s' },
  { min: 1960, max: 1969, tag: '1960s' },
  { min: 1970, max: 1979, tag: '1970s' },
  { min: 1980, max: 1989, tag: '1980s' },
  { min: 1990, max: 1999, tag: '1990s' },
  { min: 2000, max: 2009, tag: '2000s' },
  { min: 2010, max: 2019, tag: '2010s' },
  { min: 2020, max: 2029, tag: '2020s' },
];

const FORMAT_MAP = {
  tv: ['series', 'episodic'],
  movie: ['movie', 'standalone'],
  miniseries: ['mini-series', 'limited-series'],
  documentary: ['documentary'],
  anime: ['animation', 'animated'],
};

const TAG_CATEGORIES = {};

async function loadTags() {
  const { rows } = await pool.query('SELECT id, name, category FROM tags');
  for (const tag of rows) {
    if (!TAG_CATEGORIES[tag.category]) TAG_CATEGORIES[tag.category] = [];
    TAG_CATEGORIES[tag.category].push({ id: tag.id, name: tag.name });
  }
  return rows;
}

async function loadShows() {
  const { rows } = await pool.query(`
    SELECT s.id, s.title, s.type, s.year, s.synopsis,
           array_agg(t.name) FILTER (WHERE t.name IS NOT NULL) AS tag_names,
           array_agg(t.category) FILTER (WHERE t.name IS NOT NULL) AS tag_categories
    FROM shows s
    LEFT JOIN show_tags st ON st.show_id = s.id
    LEFT JOIN tags t ON t.id = st.tag_id
    GROUP BY s.id
  `);
  return rows;
}

function tokenize(text) {
  if (!text) return [];
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter(Boolean);
}

function computeKeywordTagCandidates(title, synopsis) {
  const text = `${title} ${synopsis || ''}`.toLowerCase();
  const scores = {};

  for (const entry of KEYWORD_MAP) {
    for (const kw of entry.keywords) {
      if (text.includes(kw.toLowerCase())) {
        const weight = kw.length > 8 ? 0.7 : kw.length > 4 ? 0.6 : 0.5;
        if (!scores[entry.tag] || scores[entry.tag] < weight) {
          scores[entry.tag] = Math.min(1.0, weight + 0.1);
        }
      }
    }
  }

  return scores;
}

function computeEraCandidate(year) {
  if (!year) return null;
  for (const era of ERA_MAP) {
    if (year >= era.min && year <= era.max) return era.tag;
  }
  return null;
}

function getCategoryCounts(tagNames, existingCategories) {
  const counts = {};
  for (const cat of existingCategories) {
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts;
}

function diversifySelection(candidates, existingNames, existingCategories, targetCount) {
  const existing = new Set(existingNames);
  const catCounts = getCategoryCounts(existingNames, existingCategories);

  const filtered = [];
  for (const [tag, weight] of Object.entries(candidates)) {
    if (!existing.has(tag)) {
      filtered.push({ name: tag, weight });
    }
  }

  filtered.sort((a, b) => b.weight - a.weight);

  const selected = [];
  const selectedCats = {};
  for (const cat of existingCategories) {
    selectedCats[cat] = (catCounts[cat] || 0);
  }

  for (const cand of filtered) {
    if (selected.length >= targetCount) break;

    const cat = getCategoryForTag(cand.name);
    const catCount = selectedCats[cat] || 0;
    if (catCount >= 3) continue;

    selected.push(cand);
    selectedCats[cat] = catCount + 1;
  }

  return selected;
}

function getCategoryForTag(tagName) {
  for (const [cat, tags] of Object.entries(TAG_CATEGORIES)) {
    if (tags.some(t => t.name === tagName)) return cat;
  }
  return 'theme';
}

function getTagId(tagName) {
  for (const tags of Object.values(TAG_CATEGORIES)) {
    const found = tags.find(t => t.name === tagName);
    if (found) return found.id;
  }
  return null;
}

async function enrichShow(show, client) {
  const candidates = computeKeywordTagCandidates(show.title, show.synopsis);

  const eraTag = computeEraCandidate(show.year);
  if (eraTag) candidates[eraTag] = 0.5;

  const formatTags = FORMAT_MAP[show.type] || [];
  for (const ft of formatTags) {
    candidates[ft] = 0.4;
  }

  const existingNames = show.tag_names || [];
  const existingCategories = show.tag_categories || [];

  let targetCount = Math.min(8, Object.keys(candidates).length);
  if (existingNames.length >= 8) return 0;

  targetCount = Math.min(12 - existingNames.length, 8);

  const selected = diversifySelection(candidates, existingNames, existingCategories, targetCount);

  let added = 0;
  for (const sc of selected) {
    const tagId = getTagId(sc.name);
    if (!tagId) continue;

    const weight = Math.max(0.3, Math.min(1.0, sc.weight));
    await client.query(
      `INSERT INTO show_tags (show_id, tag_id, weight) VALUES ($1, $2, $3) ON CONFLICT (show_id, tag_id) DO NOTHING`,
      [show.id, tagId, weight]
    );
    added++;
  }

  return added;
}

async function main() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const allTags = await loadTags();
    console.log(`Loaded ${allTags.length} tags`);

    const shows = await loadShows();
    console.log(`Loaded ${shows.length} shows\n`);

    let totalAdded = 0;
    for (const show of shows) {
      const oldCount = (show.tag_names || []).length;
      const added = await enrichShow(show, client);
      totalAdded += added;

      if (added > 0) {
        console.log(
          `  ${show.title} (${show.type}): ${oldCount} → ${oldCount + added} tags (+${added})`
        );
      } else {
        console.log(`  ${show.title} (${show.type}): ${oldCount} tags (no new)`)
      }
    }

    console.log(`\nTotal tags added: ${totalAdded}`);

    await client.query('COMMIT');
    console.log('Done. Transaction committed.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
