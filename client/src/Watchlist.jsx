import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWatchlist, removeFromWatchlist, updateWatchlistPosition } from './api.js';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Watchlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWatchlist();
  }, []);

  async function loadWatchlist() {
    try {
      const data = await getWatchlist();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(entryId) {
    try {
      await removeFromWatchlist(entryId);
      setItems((prev) => prev.filter((i) => i.id !== entryId));
    } catch (err) {
      console.error(err);
    }
  }

  async function moveUp(index) {
    if (index === 0) return;
    const a = items[index];
    const b = items[index - 1];
    try {
      await Promise.all([
        updateWatchlistPosition(a.id, b.position),
        updateWatchlistPosition(b.id, a.position),
      ]);
      const updated = [...items];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setItems(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function moveDown(index) {
    if (index >= items.length - 1) return;
    const a = items[index];
    const b = items[index + 1];
    try {
      await Promise.all([
        updateWatchlistPosition(a.id, b.position),
        updateWatchlistPosition(b.id, a.position),
      ]);
      const updated = [...items];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setItems(updated);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h1>Watchlist</h1>
      <Link to="/" className="back-link">&larr; Back</Link>

      {items.length === 0 && (
        <div className="empty-state">
          <p>Your watchlist is empty.</p>
          <p>Search for shows and add them to your watchlist to start tracking what to watch next.</p>
        </div>
      )}

      {items.map((item, idx) => (
        <div key={item.id} className="card">
          <div className="card-header">
            <div className="card-body">
              <Link to={`/show/${item.show_id}`} style={{ fontWeight: 'bold' }}>
                {item.title}
              </Link>
              <div className="meta">
                {item.type} {item.year && `(${item.year})`}
                {item.added_at && <span> &mdash; added {formatDate(item.added_at)}</span>}
              </div>
            </div>
            <div className="card-actions">
              <button className="vote-btn" onClick={() => moveUp(idx)} disabled={idx === 0} title="Move up">&uarr;</button>
              <button className="vote-btn" onClick={() => moveDown(idx)} disabled={idx >= items.length - 1} title="Move down">&darr;</button>
              <button className="danger" onClick={() => handleRemove(item.id)} title="Remove">x</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
