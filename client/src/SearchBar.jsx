import { useState, useEffect, useCallback, useRef } from 'react';
import { searchShows, getRecommendations } from './api.js';
import ShowCard from './ShowCard.jsx';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [upvotedShowId, setUpvotedShowId] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [recsLoading, setRecsLoading] = useState(false);
  const searchMode = useRef(false);
  const pageSize = 20;

  useEffect(() => {
    async function loadInitial() {
      try {
        const data = await searchShows('', 0, pageSize);
        setResults(data);
        setHasMore(data.length === pageSize);
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    }
    loadInitial();
  }, []);

  useEffect(() => {
    const seedId = upvotedShowId || (results.length > 0 ? results[0].id : null);
    if (!seedId) return;

    let cancelled = false;
    setRecsLoading(true);
    getRecommendations(seedId, 10)
      .then((data) => {
        if (!cancelled) setRecommendations(data);
      })
      .catch((err) => {
        if (!cancelled) console.error(err);
      })
      .finally(() => {
        if (!cancelled) setRecsLoading(false);
      });

    return () => { cancelled = true; };
  }, [results, upvotedShowId]);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    searchMode.current = true;
    try {
      const data = await searchShows(query, 0, pageSize);
      setResults(data);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadMore() {
    setLoadingMore(true);
    try {
      const offset = results.length;
      const data = await searchShows(searchMode.current ? query : '', offset, pageSize);
      setResults((prev) => [...prev, ...data]);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }

  function handleVoteChange(showId, vote) {
    if (vote === 1) {
      setUpvotedShowId(showId);
    } else if (upvotedShowId === showId && vote <= 0) {
      setUpvotedShowId(null);
    }
  }

  if (initialLoading) return <div className="loading">Loading shows...</div>;

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shows..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div>
        {results.length === 0 && <div className="empty-state"><p>No shows found.</p></div>}
        {results.map((show) => (
          <ShowCard key={show.id} show={show} onVoteChange={handleVoteChange} />
        ))}
      </div>

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '2rem' }}>
          <button onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {recsLoading && <div className="loading">Loading recommendations...</div>}

      {!recsLoading && recommendations && recommendations.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Recommended</h2>
          <p className="meta" style={{ marginBottom: '0.75rem' }}>
            Based on {upvotedShowId ? 'your upvote' : results.length > 0 ? results[0].title : 'your activity'}
          </p>
          <div className="recs-grid">
            {recommendations.map((show) => (
              <ShowCard key={show.id} show={show} onVoteChange={handleVoteChange} />
            ))}
          </div>
        </div>
      )}

      {!recsLoading && recommendations && recommendations.length === 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Recommended</h2>
          <div className="empty-state"><p>No recommendations available.</p></div>
        </div>
      )}
    </div>
  );
}
