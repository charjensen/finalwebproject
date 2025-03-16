import PropTypes from "prop-types";
import RecommendedGame from "./RecommendedGame";

export default function RecommendedGamesList({ games }) {
  if (!games || games.length === 0) return null;

  return (
    <div className="d-flex justify-content-center mt-4">
      <div
        className="d-flex flex-wrap gap-3"
        style={{
          justifyContent: "center",
          alignItems: "flex-start", // ✅ Prevents Flexbox height stretching
          maxWidth: "1000px",
        }}
      >
        {games.map((game) => (
          <RecommendedGame key={game.appid} game={game} />
        ))}
      </div>
    </div>
  );
}

RecommendedGamesList.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rating: PropTypes.string,
      releaseDate: PropTypes.string,
      logoUrl: PropTypes.string,
      appid: PropTypes.number.isRequired,
    })
  ),
};
