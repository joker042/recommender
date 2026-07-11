import { useState, useEffect } from 'react';
import { getUserRecommendations } from './api.js';
import ShowCard from './ShowCard.jsx';

const PAGE_SIZE = 20;

export default function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const seenIds = new Set();

  useEffect(() => { loadMore(); }, []);

  async function loadMore() {
    setLoading(true);
    try {
      const exclude = [...seenIds].join(',');
      const data = await getUserRecommendations(PAGE_SIZE, 0, exclude);
      if (data.length === 0) {
        setDone(true);
      } else {
        data.forEach(s => seenIds.add(s.id));
        setShows(prev => [...prev, ...data]);
        if (data.length < PAGE_SIZE) setDone(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>
        {shows.length > 0 ? 'Recommended for You' : 'Trending'}
      </h2>
      {shows.map(show => (
        <ShowCard key={show.id} show={show} />
      ))}
      {!done && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'More'}
          </button>
        </div>
      )}
      {done && shows.length > 0 && (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>
          You've seen them all!
        </p>
      )}
    </div>
  );
}
