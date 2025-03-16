import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/steam', passport.authenticate('steam'));

router.get('/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173'); // Redirect to frontend after login
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('http://localhost:5173');
    });
});

export default router;
