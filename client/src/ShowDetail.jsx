import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShow, getRecommendations, voteShowTag, addToWatchlist } from './api.js';
import ShowCard from './ShowCard.jsx';

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [showData, recsData] = await Promise.all([
          getShow(id),
          getRecommendations(id),
        ]);
        setShow(showData);
        setRecs(recsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!show) return <div className="empty-state"><p>Show not found.</p></div>;

  async function handleTagVote(tagId, vote) {
    try {
      await voteShowTag(show.id, tagId, vote);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleWatchlist() {
    try {
      await addToWatchlist(show.id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Link to="/" className="back-link">&larr; Back</Link>
      <h1>{show.title}</h1>
      <p className="meta" style={{ marginBottom: '0.75rem' }}>
        {show.type} &middot; {show.year}
      </p>
      {show.synopsis && <p style={{ marginBottom: '0.75rem', lineHeight: 1.6 }}>{show.synopsis}</p>}
      <p style={{ marginBottom: '1rem' }}>
        <strong>Score:</strong> {Number(show.score).toFixed(1)}
        <span className="score-badge">({show.votes} votes)</span>
      </p>
      <button onClick={handleWatchlist} style={{ marginBottom: '1.5rem' }}>
        + Add to Watchlist
      </button>

      {show.tags && show.tags.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2>Tags</h2>
          <div>
            {show.tags.map((tag) => (
              <div key={tag.id} className="tag">
                <span>{tag.name} <span className="meta">({tag.category})</span></span>
                <span className="score-badge">
                  {Number(tag.score).toFixed(1)} ({tag.votes})
                </span>
                <button className="vote-btn" onClick={() => handleTagVote(tag.id, 1)}>+</button>
                <button className="vote-btn" onClick={() => handleTagVote(tag.id, -1)}>-</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {recs.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <div className="recs-grid">
            {recs.map((rec) => (
              <ShowCard key={rec.id} show={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
