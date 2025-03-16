import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/steam/library", {
          withCredentials: true,
        });
        setGames(res.data.games || []);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      } finally {
        setLoading(false);
      }
    };

    if (games.length === 0) {
      fetchGames(); //  Only fetch if not already cached
    }
  }, []);

  return (
    <LibraryContext.Provider value={{ games, setGames, loading }}>
      {children}
    </LibraryContext.Provider>
  );
};
