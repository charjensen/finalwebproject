export default function GameCard({ game }) {
  return (
    <div key={game.appid} className="col-md-3 mb-4">
      <div className="card h-100">
        <img
          src={game.logoUrl || "/placeholder.png"}
          alt={game.name}
          className="card-img-top"
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
          style={{
            height: "200px", // Bigger size for logos
            width: "100%",
            objectFit: "contain",
            backgroundColor: "#f0f0f0",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">
            Playtime: {game.playtime ? (game.playtime / 60).toFixed(1) : "0"}{" "}
            hrs
          </p>
          <a
            href={`steam://rungameid/${game.appid}`}
            className="btn btn-outline-primary"
          >
            Launch Game
          </a>
        </div>
      </div>
    </div>
  );
}
