import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function GameCard({ game, onComplete }) {
  if (!game) return null;

  const [isCompleted, setIsCompleted] = useState(game.completed);

  const handleComplete = async () => {
    try {
      const res = await axios.post(
        `/api/steam/library/complete/${game.appid}`,
        {},
        { withCredentials: true }
      );

      console.log("Game marked as completed:", res.data.message);

      // ✅ Update state directly after success
      setIsCompleted(true);
      onComplete(game.appid);
    } catch (err) {
      if (err.response) {
        console.error(`Failed to complete game: ${err.response.data.message}`);
      } else {
        console.error("Network error:", err);
      }
    }
  };

  return (
    <div
      className="card"
      style={{
        width: "200px",
        height: "300px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // ✅ Center vertically
        alignItems: "center", // ✅ Center horizontally
        textAlign: "center",
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      {/* ✅ Game Logo */}
      <img
        src={game.logoUrl || "/placeholder.png"}
        alt={game.name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      {/* ✅ Game Name */}
      <h6 style={{ fontSize: "14px", marginBottom: "5px" }}>{game.name}</h6>

      {/* ✅ Playtime */}
      <p style={{ fontSize: "12px", marginBottom: "5px" }}>
        Playtime: {(game.playtime / 60).toFixed(1)} hrs
      </p>

      {/* ✅ Play Now Button */}
      <a
        href={`steam://rungameid/${game.appid}`}
        className="btn btn-primary"
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "14px",
          borderRadius: "6px",
        }}
      >
        Play Now
      </a>

      {/* ✅ Completion Button */}
      {isCompleted ? (
        <button className="btn btn-secondary mt-2" disabled>
          Completed
        </button>
      ) : (
        <button onClick={handleComplete} className="btn btn-success mt-2">
          Mark as Completed
        </button>
      )}
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.shape({
    appid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    playtime: PropTypes.number.isRequired,
    logoUrl: PropTypes.string,
  }),
  onComplete: PropTypes.func.isRequired,
};
