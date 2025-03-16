import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import compression from 'compression';

import connectDB from "./config/database.js";
connectDB();

import "./config/steamAuth.js";

import authRoutes from "./routes/auth.js";
import steamRoutes from "./routes/steam.js";
import recommendationRoute from './routes/recommendation.js';
import settingsRoutes from './routes/settings.js';
import libraryRoutes from './routes/library.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/steam", steamRoutes);
app.use('/api/recommendation', recommendationRoute);
app.use('/api/settings', settingsRoutes);
app.use('/api/steam/library', libraryRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.get("/profile", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
