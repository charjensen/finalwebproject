import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Lower timeout to 5 seconds
            socketTimeoutMS: 45000, // Keep socket open for 45 seconds
            connectTimeoutMS: 10000 // Increase connection timeout to 10 seconds
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
