import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWatchlist, removeFromWatchlist, updateWatchlistPosition } from './api.js';

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Watchlist</h1>
      <Link to="/">&larr; Back</Link>
      {items.length === 0 && <p>No items in your watchlist.</p>}
      {items.map((item, idx) => (
        <div key={item.id} style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: '0.75rem',
          marginBottom: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <Link to={`/show/${item.show_id}`} style={{ fontWeight: 'bold' }}>
              {item.title}
            </Link>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>
              {item.type} {item.year && `(${item.year})`}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button onClick={() => moveUp(idx)} disabled={idx === 0}>&uarr;</button>
            <button onClick={() => moveDown(idx)} disabled={idx >= items.length - 1}>&darr;</button>
            <button onClick={() => handleRemove(item.id)} style={{ color: 'red' }}>x</button>
          </div>
        </div>
      ))}
    </div>
  );
}
