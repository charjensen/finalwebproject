import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import SortControls from "../components/SortControls";

export default function Library() {
  const [games, setGames] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("playtime");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/steam/library", { withCredentials: true })
      .then((res) => setGames(res.data?.games || []))
      .catch((err) => console.error(err));
  }, []);

  // Handle sorting
  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === "playtime") {
      return sortOrder === "asc"
        ? a.playtime - b.playtime
        : b.playtime - a.playtime;
    } else {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  // Handle search
  const searchedGames = sortedGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle filtering
  const filteredGames = searchedGames.filter((game) => {
    if (filter === "all") return true;
    if (filter === "low" && game.playtime <= 10 * 60) return true;
    if (
      filter === "medium" &&
      game.playtime > 10 * 60 &&
      game.playtime <= 50 * 60
    )
      return true;
    if (filter === "high" && game.playtime > 50 * 60) return true;
    return false;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Steam Library</h1>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Options */}
      <div className="mb-4">
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Games</option>
          <option value="low">Low Playtime (0-10 hrs)</option>
          <option value="medium">Medium Playtime (10-50 hrs)</option>
          <option value="high">High Playtime (50+ hrs)</option>
        </select>
      </div>

      {/* Sort Controls */}
      <SortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
      />

      {/* Game List */}
      <div className="row">
        {filteredGames.map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
        {filteredGames.length === 0 && (
          <p className="text-center mt-4">No games found.</p>
        )}
      </div>
    </div>
  );
}
