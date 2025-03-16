import { useEffect, useState } from "react";
import axios from "axios";
import { useLibrary } from "../context/LibraryContext";
import GameCard from "../components/GameCard";
import SortControls from "../components/SortControls";
import { useSettings } from "../context/SettingsContext";
import { useCallback } from "react"; //

export default function Library() {
  const { games, setGames, loading } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  //  Load default settings from context
  const {
    defaultSort,
    setDefaultSort,
    showMultiplayer,
    showShortPlaytime,
    platforms,
  } = useSettings();

  //  Allow temporary override of sorting without resetting default
  const [sortBy, setSortBy] = useState(defaultSort);
  const [sortOrder, setSortOrder] = useState("desc");

  const handleGameCompleted = useCallback(
    (appid) => {
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.appid === appid ? { ...game, completed: true } : game
        )
      );
    },
    [setGames]
  );

  //  Fetch games from backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const params = {
          sortBy,
          order: sortOrder,
          filter,
          platforms: platforms.join(","),
          showMultiplayer,
          showShortPlaytime,
        };

        const res = await axios.get("http://localhost:5000/api/steam/library", {
          params,
          withCredentials: true,
        });

        setGames(res.data?.games || []);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    };

    fetchGames();
  }, [
    sortBy,
    sortOrder,
    filter,
    showMultiplayer,
    showShortPlaytime,
    platforms,
  ]);

  //  Handle sorting locally (if necessary)
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

  //  Handle search locally
  const searchedGames = sortedGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Handle additional frontend-based filtering (optional)
  const filteredGames = searchedGames.filter((game) => {
    //  Platform Filtering (in case backend filtering fails)
    if (!platforms.includes("steam")) return false;

    //  Multiplayer Filtering
    if (!showMultiplayer && game.isMultiplayer) return false;

    //  Short Playtime Filtering
    if (showShortPlaytime && game.playtime > 60) return false;

    //  Playtime-based Filtering
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

  //  Sync sorting with settings context (without forcing it)
  useEffect(() => {
    setSortBy(defaultSort);
  }, [defaultSort]);

  if (loading) return <p>Loading games...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Steam Library</h1>

      {/*  Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/*  Filter Options */}
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

      {/*  Sort Controls */}
      <SortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={(value) => {
          setSortBy(value);
          setDefaultSort(value);
        }}
        onSortOrderChange={setSortOrder}
      />

      {/*  Game List */}
      <div className="row justify-content-center">
        {filteredGames.map((game) => (
          <GameCard
            key={game.appid}
            game={game}
            onComplete={handleGameCompleted}
          />
        ))}
        {filteredGames.length === 0 && (
          <p className="text-center mt-4">No games found.</p>
        )}
      </div>
    </div>
  );
}
