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

  if (loading) return <div>Loading...</div>;
  if (!show) return <div>Show not found</div>;

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
      <Link to="/">&larr; Back</Link>
      <h1>{show.title}</h1>
      <p>
        {show.type} &middot; {show.year}
      </p>
      {show.description && <p>{show.description}</p>}
      <p>Score: {Number(show.score).toFixed(1)} ({show.votes} votes)</p>
      <button onClick={handleWatchlist} style={{ marginBottom: '1rem' }}>
        Add to Watchlist
      </button>

      {show.tags && show.tags.length > 0 && (
        <div>
          <h2>Tags</h2>
          {show.tags.map((tag) => (
            <div key={tag.id} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              margin: '0.25rem 0.5rem 0.25rem 0',
              padding: '0.25rem 0.5rem',
              border: '1px solid #ddd',
              borderRadius: 4,
            }}>
              <span>{tag.name} ({tag.category})</span>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>
                {Number(tag.score).toFixed(1)} ({tag.votes})
              </span>
              <button onClick={() => handleTagVote(tag.id, 1)} style={{ fontSize: '0.75rem', padding: '0 0.3rem' }}>+</button>
              <button onClick={() => handleTagVote(tag.id, -1)} style={{ fontSize: '0.75rem', padding: '0 0.3rem' }}>-</button>
            </div>
          ))}
        </div>
      )}

      {recs.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Recommendations</h2>
          {recs.map((rec) => (
            <ShowCard key={rec.id || rec.show_id} show={rec} />
          ))}
        </div>
      )}
    </div>
  );
}
