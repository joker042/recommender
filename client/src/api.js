const GUID_KEY = 'x-user-guid';

function getGuid() {
  let guid = localStorage.getItem(GUID_KEY);
  if (!guid) {
    // crypto.randomUUID() not available in all browsers
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      guid = crypto.randomUUID();
    } else {
      guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }
    localStorage.setItem(GUID_KEY, guid);
  }
  return guid;
}

export async function ensureAuth() {
  const guid = getGuid();
  try {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-guid': guid },
      body: JSON.stringify({}),
    });
  } catch {
    // server may not be running
  }
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-user-guid': getGuid(),
    ...options.headers,
  };

  const res = await fetch(path, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function searchShows(query, offset = 0, limit = 20) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  params.set('offset', offset);
  params.set('limit', limit);
  return request(`/api/shows?${params}`);
}

export function getShow(id) {
  return request(`/api/shows/${id}`);
}

export function getRecommendations(showId, limit = 10) {
  return request(`/api/recommendations/${showId}?limit=${limit}`);
}

export function getTags() {
  return request('/api/tags');
}

export function voteShow(showId, vote) {
  return request('/api/votes/show', {
    method: 'POST',
    body: JSON.stringify({ show_id: showId, vote }),
  });
}

export function voteTag(tagId, vote) {
  return request('/api/votes/tag', {
    method: 'POST',
    body: JSON.stringify({ tag_id: tagId, vote }),
  });
}

export function voteShowTag(showId, tagId, vote) {
  return request('/api/votes/show-tag', {
    method: 'POST',
    body: JSON.stringify({ show_id: showId, tag_id: tagId, vote }),
  });
}

export function getWatchlist() {
  return request('/api/watchlist');
}

export function addToWatchlist(showId) {
  return request('/api/watchlist', {
    method: 'POST',
    body: JSON.stringify({ show_id: showId }),
  });
}

export function updateWatchlistPosition(entryId, position) {
  return request(`/api/watchlist/${entryId}`, {
    method: 'PUT',
    body: JSON.stringify({ position }),
  });
}

export function removeFromWatchlist(entryId) {
  return request(`/api/watchlist/${entryId}`, { method: 'DELETE' });
}

export function getUserRecommendations(limit = 10) {
  return request(`/api/recommended?limit=${limit}`);
}
