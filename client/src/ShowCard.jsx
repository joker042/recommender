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

  const synopsisSnippet = show.synopsis
    ? show.synopsis.length > 80
      ? show.synopsis.slice(0, 80) + '...'
      : show.synopsis
    : null;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-body">
          <Link to={`/show/${show.id}`} style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            {show.title}
          </Link>
          <div className="meta">
            {show.type} {show.year && `(${show.year})`}
            {show.similarity != null && (
              <span className="score-badge">
                &mdash; {Number(show.similarity).toFixed(2)}
              </span>
            )}
          </div>
          {synopsisSnippet && <div className="synopsis-snippet">{synopsisSnippet}</div>}
        </div>
        <div className="card-actions">
          <button className="vote-btn" onClick={() => handleVote(1)} title="Upvote">+</button>
          <button className="vote-btn" onClick={() => handleVote(-1)} title="Downvote">-</button>
          <button onClick={handleWatchlist} disabled={added}>
            {added ? 'Added' : '+Watch'}
          </button>
        </div>
      </div>
    </div>
  );
}
