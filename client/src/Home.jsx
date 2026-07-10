import { useState, useEffect, useRef, useCallback } from 'react';
import { getUserRecommendations } from './api.js';
import ShowCard from './ShowCard.jsx';

export default function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const seenIds = useRef(new Set());

  useEffect(() => { loadMore(); }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const exclude = [...seenIds.current].join(',');
      const data = await getUserRecommendations(20, 0, exclude);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        data.forEach(s => seenIds.current.add(s.id));
        setShows(prev => [...prev, ...data]);
        if (data.length < 20) setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, hasMore, loadMore]);

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>
        {shows.length > 0 ? 'Recommended for You' : 'Trending'}
      </h2>
      {shows.map(show => (
        <ShowCard key={show.id} show={show} />
      ))}
      {hasMore && (
        <div ref={sentinelRef} style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading && <span>Loading more...</span>}
        </div>
      )}
      {!hasMore && shows.length > 0 && (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>
          You've seen them all!
        </p>
      )}
    </div>
  );
}
