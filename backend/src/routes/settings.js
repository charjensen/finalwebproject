import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// ✅ Get user settings
router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const user = await User.findOne({ steamId: req.user.steamId });

        if (user) {
            res.json(user.settings);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Failed to get user settings:', err.message);
        res.status(500).json({ message: 'Failed to load settings' });
    }
});

// ✅ Update user settings
router.post('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const { defaultSort, showMultiplayer, showShortPlaytime, platforms } = req.body;

        const user = await User.findOneAndUpdate(
            { steamId: req.user.steamId },
            {
                settings: {
                    defaultSort,
                    showMultiplayer,
                    showShortPlaytime,
                    platforms
                }
            },
            { new: true }
        );

        res.json(user.settings);
    } catch (err) {
        console.error('Failed to update settings:', err.message);
        res.status(500).json({ message: 'Failed to update settings' });
    }
});

export default router;
