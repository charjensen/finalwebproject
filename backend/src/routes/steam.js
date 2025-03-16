import express from 'express';
import axios from 'axios';
import Game from '../models/Game.js';
import { getGameLogoFromSteamGridDB } from '../utils/steamGridDB.js';

const router = express.Router();

router.get('/library', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        // First try to load from MongoDB
        const games = await Game.find({ userId: req.user.id });

        if (games.length > 0) {
            return res.json({ games });
        }

        // If no data → Fetch from Steam API
        const steamId = req.user.steamId;
        const response = await axios.get(
            `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=1&format=json`
        );

        const gameData = response.data.response.games || [];

        // Save to MongoDB with SteamGridDB logo if available
        const newGames = await Promise.all(gameData.map(async (game) => {
            const gridLogo = await getGameLogoFromSteamGridDB(game.appid, game.name);

            return {
                appid: game.appid,
                name: game.name,
                playtime: game.playtime_forever || 0,
                logoUrl: gridLogo || // Try SteamGridDB logo first
                    `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`, // Fallback to Steam icon
                userId: req.user.id
            };
        }));

        await Game.insertMany(newGames);

        res.json({ games: newGames });
    } catch (err) {
        console.error('Failed to fetch game library:', err.message);
        res.status(500).json({ message: 'Failed to fetch game library' });
    }
});

export default router;
