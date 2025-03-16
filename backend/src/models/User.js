import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    steamId: { type: String, required: true, unique: true },
    displayName: String,
    avatar: String,
    settings: {
        defaultSort: { type: String, default: 'playtime' },
        showMultiplayer: { type: Boolean, default: true },
        showShortPlaytime: { type: Boolean, default: false },
        platforms: { type: [String], default: ['steam'] }
    }
});

export default mongoose.model('User', userSchema);
