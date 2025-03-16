import PropTypes from "prop-types";

export default function RecommendedGame({ game }) {
  if (!game) return null;

  return (
    <div
      className="card"
      style={{
        width: "200px",
        height: "300px",
        overflow: "hidden", //  Prevents content from leaking
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "12px",
      }}
    >
      <div className="card-body d-flex flex-column align-items-center">
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
        <h6 className="text-center" style={{ fontSize: "14px" }}>
          {game.name}
        </h6>
        <p className="mb-1" style={{ fontSize: "12px" }}>
          Rating: {game.rating} ⭐
        </p>
        <p className="mb-2" style={{ fontSize: "12px" }}>
          Release Date: {game.releaseDate}
        </p>
      </div>

      {/*  Fix button size and alignment */}
      <a
        href={`steam://rungameid/${game.appid}`}
        className="btn btn-primary"
        style={{
          width: "100%", //  Make button match the card width
          borderRadius: "0 0 12px 12px", //  Match button with card border
          padding: "8px 0", //  Consistent height
          fontSize: "14px",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        Play Now
      </a>
    </div>
  );
}

RecommendedGame.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.string,
    releaseDate: PropTypes.string,
    logoUrl: PropTypes.string,
    appid: PropTypes.number.isRequired,
  }),
};
