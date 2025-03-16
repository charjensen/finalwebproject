import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appid: { type: Number, required: true },
    name: String,
    playtime: Number,
    logoUrl: String,
    isMultiplayer: Boolean,
    completed: { type: Boolean, default: false } //  New field
});

export default mongoose.model('Game', gameSchema);
