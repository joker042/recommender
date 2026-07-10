import { useState } from 'react';
import { Link } from 'react-router-dom';
import { voteShow, addToWatchlist } from './api.js';

export default function ShowCard({ show }) {
  const [added, setAdded] = useState(false);

  async function handleVote(vote) {
    try {
      await voteShow(show.id, vote);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleWatchlist() {
    try {
      await addToWatchlist(show.id);
      setAdded(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: '0.75rem',
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <Link to={`/show/${show.id}`} style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          {show.title}
        </Link>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>
          {show.type} {show.year && `(${show.year})`}
          {show.similarity != null && ` — similarity: ${Number(show.similarity).toFixed(2)}`}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => handleVote(1)} title="Upvote">+</button>
        <button onClick={() => handleVote(-1)} title="Downvote">-</button>
        <button onClick={handleWatchlist} disabled={added}>
          {added ? 'Added' : 'Watch'}
        </button>
      </div>
    </div>
  );
}
