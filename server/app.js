import Card from "./models/Card.js";
import adminRoute from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorMiddleware.js";
import express from "express";
import imageRoutes from "./routes/imageRoutes.js";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static images
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/admin", adminRoute);
app.use("/api", imageRoutes);
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/cards", cardRoutes);


//for card

app.get("/api/cards/:id", async (req, res) => {
  try {
    console.log(`API hit for card ID: ${req.params.id}`); // Debugging
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//app.use("/api/cards", cardRoutes);

// Error Middleware
app.use(errorHandler);


//login
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
