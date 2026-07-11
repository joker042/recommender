import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShow, getRecommendations, voteShow, voteShowTag, addToWatchlist, removeFromWatchlistByShow } from './api.js';
import ShowCard from './ShowCard.jsx';

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myVote, setMyVote] = useState(0);
  const [watchlisted, setWatchlisted] = useState(false);
  const [tagVotes, setTagVotes] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const [showData, recsData] = await Promise.all([
          getShow(id),
          getRecommendations(id),
        ]);
        setShow(showData);
        setRecs(recsData);
        // Pre-fill tag votes from user's previous votes
        if (showData.tags) {
          const votes = {};
          showData.tags.forEach(t => {
            if (t.my_vote && t.my_vote !== 0) votes[t.id] = t.my_vote;
          });
          setTagVotes(votes);
        }
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

  async function handleTagVote(tagId, vote, e) {
    if (e) e.preventDefault();
    const prev = tagVotes[tagId] || 0;
    const newVote = prev === vote ? 0 : vote;
    setTagVotes({ ...tagVotes, [tagId]: newVote });
    try { await voteShowTag(show.id, tagId, newVote); }
    catch (err) { console.error('Tag vote failed:', err.message); }
  }

  async function handleVote(vote, e) {
    if (e) e.preventDefault();
    const newVote = myVote === vote ? 0 : vote;
    setMyVote(newVote);
    try { await voteShow(show.id, newVote); }
    catch (err) { console.error('Vote failed:', err.message); }
  }

  async function handleWatchlist() {
    try {
      if (watchlisted) {
        await removeFromWatchlistByShow(show.id);
        setWatchlisted(false);
      } else {
        await addToWatchlist(show.id);
        setWatchlisted(true);
      }
    } catch (err) { console.error(err); }
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button type="button" className={`vote-btn${myVote === 1 ? ' active' : ''}`} onClick={(e) => handleVote(1, e)}>+</button>
        <button type="button" className={`vote-btn${myVote === -1 ? ' active' : ''}`} onClick={(e) => handleVote(-1, e)}>-</button>
        <button onClick={handleWatchlist}>
          {watchlisted ? '✓ Watchlist' : '+ Watchlist'}
        </button>
      </div>

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
                <button type="button" className={`vote-btn${(tagVotes[tag.id] || 0) === 1 ? ' active' : ''}`} onClick={(e) => handleTagVote(tag.id, 1, e)}>+</button>
                <button type="button" className={`vote-btn${(tagVotes[tag.id] || 0) === -1 ? ' active' : ''}`} onClick={(e) => handleTagVote(tag.id, -1, e)}>-</button>
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
