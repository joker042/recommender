import { useState, useEffect, useRef } from 'react';
import { getUserRecommendations, voteShow, addToWatchlist } from './api.js';
import ShowCard from './ShowCard.jsx';

export default function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const topRef = useRef(null);
  const PAGE_SIZE = 20;

  useEffect(() => { loadPage(0, true); }, []);

  async function loadPage(newOffset, replace) {
    if (replace) setLoading(true); else setMoreLoading(true);
    try {
      const data = await getUserRecommendations(PAGE_SIZE, newOffset);
      setShows(prev => replace ? data : [...prev, ...data]);
      setOffset(newOffset + data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setMoreLoading(false);
    }
  }

  function handleMore() {
    loadPage(offset, false);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div ref={topRef} />
      <h2 style={{ marginBottom: '1rem' }}>
        {shows.length > 0 ? 'Recommended for You' : 'Trending'}
      </h2>
      {shows.length === 0 && <p>No recommendations yet. Try upvoting some shows!</p>}
      {shows.map(show => (
        <ShowCard key={show.id} show={show} />
      ))}
      {shows.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '2rem' }}>
          <button 
            className="load-more-btn" 
            onClick={handleMore} 
            disabled={moreLoading}
          >
            {moreLoading ? 'Loading...' : 'More'}
          </button>
        </div>
      )}
    </div>
  );
}
