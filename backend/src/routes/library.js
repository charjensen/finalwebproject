import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const userId = req.user.id;
        const { sortBy = 'playtime', order = 'desc', filter = 'all', platforms, showMultiplayer, showShortPlaytime } = req.query;

        // ✅ Base query
        let query = { userId };

        // ✅ Platform Filtering
        if (platforms) {
            const platformArray = platforms.split(',');
            query.platform = { $in: platformArray };
        }

        // ✅ Multiplayer Filtering
        if (showMultiplayer === 'false') {
            query.isMultiplayer = { $ne: true };
        }

        // ✅ Short Playtime Filtering (less than 1 hour)
        if (showShortPlaytime === 'true') {
            query.playtime = { $lte: 60 };
        }

        // ✅ Playtime-based Filtering
        if (filter === 'low') {
            query.playtime = { $lte: 10 * 60 };
        } else if (filter === 'medium') {
            query.playtime = { $gt: 10 * 60, $lte: 50 * 60 };
        } else if (filter === 'high') {
            query.playtime = { $gt: 50 * 60 };
        }

        // ✅ Sorting
        const sortOptions = {};
        if (sortBy === 'playtime') {
            sortOptions.playtime = order === 'asc' ? 1 : -1;
        } else if (sortBy === 'name') {
            sortOptions.name = order === 'asc' ? 1 : -1;
        }

        // ✅ Fetch and sort in MongoDB
        const games = await Game.find(query).sort(sortOptions).exec();

        res.json({ games });
    } catch (err) {
        console.error(`🚨 Failed to fetch games: ${err.message}`);
        res.status(500).json({ message: 'Failed to load games' });
    }
});

router.post('/complete/:appid', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const { appid } = req.params;

        // ✅ Ensure that the game exists for the user
        const game = await Game.findOne({ userId: req.user.id, appid });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // ✅ Check if game is already marked as complete
        if (game.completed) {
            return res.status(400).json({ message: 'Game already marked as complete' });
        }

        // ✅ Mark game as completed
        game.completed = true;
        await game.save();

        // ✅ Send a success response with status 200
        res.status(200).json({ message: 'Game marked as completed' });
    } catch (err) {
        console.error('Failed to mark game as completed:', err.message);
        res.status(500).json({ message: 'Failed to update game' });
    }
});



export default router;
