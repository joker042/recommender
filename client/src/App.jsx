import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import ShowDetail from './ShowDetail.jsx';
import Watchlist from './Watchlist.jsx';
import { ensureAuth } from './api.js';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureAuth().then(() => setReady(true));
  }, []);

  if (!ready) return <div className="loading">Loading...</div>;

  return (
    <BrowserRouter>
      <div className="container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
