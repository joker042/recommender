import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { voteShow, addToWatchlist, getShow } from './api.js';

export default function ShowCard({ show, onVoteChange }) {
  const [added, setAdded] = useState(false);
  const [myVote, setMyVote] = useState(0);
  const [topTags, setTopTags] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getShow(show.id).then(data => {
      if (!cancelled && data.tags) {
        setTopTags(data.tags.slice(0, 3));
      }
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [show.id]); // -1, 0, +1

  async function handleVote(vote) {
    const newVote = myVote === vote ? 0 : vote;
    setMyVote(newVote);
    try {
      await voteShow(show.id, newVote);
      if (onVoteChange) onVoteChange(show.id, newVote);
    } catch (err) {
      setMyVote(myVote);
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
        {topTags.length > 0 && (
          <div className="card-tags">
            {topTags.map(t => (
              <span key={t.id} className="mini-tag">{t.name}</span>
            ))}
          </div>
        )}
        </div>
        <div className="card-actions">
          <button type="button" className={`vote-btn${myVote === 1 ? ' active' : ''}`} onClick={(e) => handleVote(1, e)} title="Upvote">+</button>
          <button type="button" className={`vote-btn${myVote === -1 ? ' active' : ''}`} onClick={(e) => handleVote(-1, e)} title="Downvote">-</button>
          <button onClick={handleWatchlist} disabled={added}>
            {added ? 'Added' : '+Watch'}
          </button>
        </div>
      </div>
    </div>
  );
}
