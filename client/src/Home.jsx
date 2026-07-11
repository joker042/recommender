import { useState, useEffect, useRef } from 'react';
import { getUserRecommendations } from './api.js';
import ShowCard from './ShowCard.jsx';

const PAGE_SIZE = 20;

export default function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const sentinelRef = useRef(null);
  const seenIds = useRef(new Set());
  const loadingRef = useRef(false); // prevent double-fires

  async function fetchBatch() {
    if (loadingRef.current || done) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const exclude = [...seenIds.current].join(',');
      const data = await getUserRecommendations(PAGE_SIZE, 0, exclude);
      if (data.length === 0) {
        setDone(true);
      } else {
        data.forEach(s => seenIds.current.add(s.id));
        setShows(prev => [...prev, ...data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }

  useEffect(() => { fetchBatch(); }, []);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loadingRef.current) {
        fetchBatch();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>
        {shows.length > 0 ? 'Recommended for You' : 'Trending'}
      </h2>
      {shows.map(show => (
        <ShowCard key={show.id} show={show} />
      ))}
      {!done && (
        <div ref={sentinelRef} style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading && <span>Loading...</span>}
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
