import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

export default function Navbar({ user, onLogout, onLogin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Game Library
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/library">
                    My Library
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">
                    Settings
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <ProfilePicture
                  src={user.profileImage}
                  alt="Profile"
                  size={40}
                />
                <button className="btn btn-outline-danger" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="btn btn-outline-primary" onClick={onLogin}>
                Login with Steam
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
