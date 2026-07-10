import { useState } from 'react';
import { Link } from 'react-router-dom';
import { voteShow, addToWatchlist } from './api.js';

export default function ShowCard({ show }) {
  const [added, setAdded] = useState(false);
  const [myVote, setMyVote] = useState(0); // -1, 0, +1

  async function handleVote(vote) {
    const newVote = myVote === vote ? 0 : vote; // toggle off if same
    setMyVote(newVote);
    try {
      await voteShow(show.id, newVote);
    } catch (err) {
      setMyVote(myVote); // revert on error
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
          <button className={`vote-btn${myVote === 1 ? ' active' : ''}`} onClick={() => handleVote(1)} title="Upvote">+</button>
          <button className={`vote-btn${myVote === -1 ? ' active' : ''}`} onClick={() => handleVote(-1)} title="Downvote">-</button>
          <button onClick={handleWatchlist} disabled={added}>
            {added ? 'Added' : '+Watch'}
          </button>
        </div>
      </div>
    </div>
  );
}
