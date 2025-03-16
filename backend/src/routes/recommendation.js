import express from 'express';
import Game from '../models/Game.js';
import { getTopRecommendedGames } from '../utils/recommendation.js';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const userGames = await Game.find({ userId: req.user.id });

        if (!userGames || userGames.length === 0) {
            return res.status(404).json({ message: 'No games found' });
        }

        const recommendations = await getTopRecommendedGames(userGames);

        if (recommendations.length > 0) {
            res.json(recommendations);
        } else {
            res.status(404).json({ message: 'No suitable recommendations found' });
        }
    } catch (err) {
        console.error(`Failed to get recommendations: ${err.message}`);
        res.status(500).json({ message: 'Failed to get recommendations' });
    }
});

export default router;
