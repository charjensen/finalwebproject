import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import RecommendedGamesList from "./components/RecommendedGamesList";

function App() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Track loading state

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));

    // ✅ Start loading before fetching recommendations
    setLoading(true);

    axios
      .get("http://localhost:5000/api/recommendation", {
        withCredentials: true,
      })
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((err) => console.error("No recommendations available"))
      .finally(() => setLoading(false)); // ✅ Stop loading after response
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/steam";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:5000/auth/logout";
  };

  return (
    <Router>
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />

      <div className="container mt-4 d-flex flex-column align-items-center">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1>Game Library</h1>
                {user ? (
                  <>
                    <p>Welcome, {user.displayName}!</p>

                    {/* ✅ Show loading indicator */}
                    {loading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <RecommendedGamesList games={recommendations} />
                    )}
                  </>
                ) : (
                  <button className="btn btn-success" onClick={handleLogin}>
                    Login with Steam
                  </button>
                )}
              </div>
            }
          />
          <Route path="/library" element={<Library />} />
          <Route path="/settings" element={<Settings user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
