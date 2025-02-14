import adminRoute from "./routes/adminRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware.js";
import express from "express";
import imageRoutes from "./routes/imageRoutes.js";
import path from "path";

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

// Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
