import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    appid: Number,
    name: String,
    playtime: { type: Number, default: 0 },
    logoUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
