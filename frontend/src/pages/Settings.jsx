import { useSettings } from "../context/SettingsContext";

export default function Settings() {
  const {
    darkMode,
    setDarkMode,
    defaultSort,
    setDefaultSort,
    showMultiplayer,
    setShowMultiplayer,
    showShortPlaytime,
    setShowShortPlaytime,
    platforms,
    setPlatforms,
  } = useSettings();

  const handlePlatformToggle = (platform) => {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="container mt-4">
      <h1>Settings</h1>

      {/* ✅ Dark Mode */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <label className="form-check-label">Enable Dark Mode</label>
      </div>

      {/* ✅ Multiplayer */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={showMultiplayer}
          onChange={() => setShowMultiplayer(!showMultiplayer)}
        />
        <label className="form-check-label">Show Multiplayer Games</label>
      </div>

      {/* ✅ Short Playtime */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={showShortPlaytime}
          onChange={() => setShowShortPlaytime(!showShortPlaytime)}
        />
        <label className="form-check-label">
          Show Games with &lt; 1 hr Playtime
        </label>
      </div>
    </div>
  );
}
