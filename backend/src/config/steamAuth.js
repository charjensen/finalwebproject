import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import User from '../models/User.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/auth/steam/return',
    realm: 'http://localhost:5000/',
    apiKey: process.env.STEAM_API_KEY
}, async (identifier, profile, done) => {
    try {

        let user = await User.findOne({ steamId: profile.id });

        if (!user) {
            user = await User.create({
                steamId: profile.id,
                displayName: profile.displayName,
                // Use high-res photo if available, fallback to medium or small
                profileImage: profile.photos?.[2]?.value ||
                    profile.photos?.[1]?.value ||
                    profile.photos?.[0]?.value ||
                    '/placeholder-profile.png'
            });
        } else {
            user.displayName = profile.displayName;
            user.profileImage = profile.photos?.[2]?.value ||
                profile.photos?.[1]?.value ||
                profile.photos?.[0]?.value ||
                '/placeholder-profile.png';
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        console.error('Error saving user:', err);
        return done(err);
    }
}));

