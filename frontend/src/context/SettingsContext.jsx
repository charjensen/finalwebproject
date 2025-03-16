import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [defaultSort, setDefaultSort] = useState("playtime");
  const [showMultiplayer, setShowMultiplayer] = useState(true);
  const [showShortPlaytime, setShowShortPlaytime] = useState(false);
  const [platforms, setPlatforms] = useState(["steam"]);

  //  Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/settings", { withCredentials: true });
        if (res.data) {
          setDefaultSort(res.data.defaultSort);
          setShowMultiplayer(res.data.showMultiplayer);
          setShowShortPlaytime(res.data.showShortPlaytime);
          setPlatforms(res.data.platforms);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };

    fetchSettings();
  }, []);

  //  Save settings to backend
  const updateSettings = async (newSettings) => {
    try {
      await axios.post("/api/settings", newSettings, { withCredentials: true });
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        defaultSort,
        setDefaultSort: (value) => {
          setDefaultSort(value);
          updateSettings({
            defaultSort: value,
            showMultiplayer,
            showShortPlaytime,
            platforms,
          });
        },
        showMultiplayer,
        setShowMultiplayer: (value) => {
          setShowMultiplayer(value);
          updateSettings({
            defaultSort,
            showMultiplayer: value,
            showShortPlaytime,
            platforms,
          });
        },
        showShortPlaytime,
        setShowShortPlaytime: (value) => {
          setShowShortPlaytime(value);
          updateSettings({
            defaultSort,
            showMultiplayer,
            showShortPlaytime: value,
            platforms,
          });
        },
        platforms,
        setPlatforms: (value) => {
          setPlatforms(value);
          updateSettings({
            defaultSort,
            showMultiplayer,
            showShortPlaytime,
            platforms: value,
          });
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
