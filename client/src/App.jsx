import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import ShowDetail from "./ShowDetail.jsx";
import Watchlist from "./Watchlist.jsx";
import { ensureAuth } from "./api.js";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureAuth().then(() => setReady(true));
  }, []);

  if (!ready) return <div className="loading">Loading...</div>;

  return (
    <BrowserRouter>
      <div className="container">
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "center" }}>
          <Link to="/">Home</Link>
          <Link to="/watchlist">Watchlist</Link>
          <span style={{ flex: 1 }} />
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
            title="New random user ID for testing"
          >
            Roll ID
          </button>
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
