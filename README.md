# 🎮 Game Library Manager

A web-based app that consolidates a user's Steam library into one place, providing a centralized platform for managing and accessing games.

---

## 🚀 **Features**

✅ **Steam Login Integration** – Log in using your Steam account via OpenID.  
✅ **Game Display** – View your entire Steam library with playtime, cover art, and details fetched from SteamGridDB.  
✅ **Sorting and Filtering** – Sort by playtime, name, or completion status and filter by playtime range or multiplayer status.  
✅ **Game Completion Tracking** – Mark games as completed to remove them from future recommendations.  
✅ **Game Recommendations** – Uses the IGDB API to recommend the next shortest game to play based on playtime.  
✅ **Settings Page** – Customize sorting options, playtime filtering, multiplayer visibility, and more.  
✅ **Responsive and Fast** – Utilizes `React.memo`, `useCallback`, and backend-side filtering for high performance.

---

## 🛠️ **Tech Stack**

| Technology          | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| **React**           | Frontend framework                             |
| **Node.js**         | Backend runtime                                |
| **Express**         | Backend framework                              |
| **MongoDB**         | Database for storing user and game data        |
| **Passport.js**     | User authentication with Steam                 |
| **SteamGridDB API** | Fetching high-resolution game covers and logos |
| **IGDB API**        | Fetching game details and playtime estimates   |
| **Axios**           | Handling API requests                          |
| **Vite**            | Fast development environment                   |
| **Docker**          | Containerized development environment          |

---

## 🔥 **Getting Started**

### 1. **Clone the repository**

```sh
git clone https://github.com/your-username/game-library-manager.git
cd game-library-manager
```

### 2. **Set up environment variables**

Create a `.env` file in the root of the project:

```plaintext
# Backend
PORT=5000
MONGO_URI=mongodb://localhost:27017/game_library
SESSION_SECRET=your_session_secret

# Steam API
STEAM_API_KEY=your_steam_api_key
STEAM_RETURN_URL=http://localhost:5000/auth/steam/return

# IGDB API
IGDB_CLIENT_ID=your_igdb_client_id
IGDB_CLIENT_SECRET=your_igdb_client_secret

# SteamGridDB API
STEAMGRIDDB_API_KEY=your_steamgriddb_api_key
```

---

### 3. **Install dependencies**

#### Backend:

```sh
cd backend
npm install
```

#### Frontend:

```sh
cd frontend
npm install
```

---

### 4. **Start the development server**

#### Start the backend:

```sh
cd backend
npm run dev
```

#### Start the frontend:

```sh
cd frontend
npm run dev
```

---

## ✅ **Usage**

1. Open [http://localhost:5173](http://localhost:5173)
2. Log in with your Steam account
3. Browse your library and filter/sort games
4. Mark games as completed
5. View recommendations for the next game to play

---
