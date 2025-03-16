import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Library from "./pages/Library";
import Navbar from "./components/Navbar";
import ProfilePicture from "./components/ProfilePicture";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
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

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="mb-4">Welcome to the Game Library</h1>
                {user ? (
                  <>
                    <ProfilePicture
                      src={user.profileImage}
                      alt="Profile"
                      size={80}
                    />
                    <p className="lead">Hi, {user.displayName}!</p>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
