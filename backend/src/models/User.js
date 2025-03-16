import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    steamId: { type: String, unique: true },
    displayName: String,
    profileImage: { type: String, default: '/placeholder-profile.png' } // Fallback for missing image
});

const User = mongoose.model('User', userSchema);

export default User;
