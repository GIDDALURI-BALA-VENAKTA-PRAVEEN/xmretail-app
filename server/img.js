import cors from "cors";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 5000;
const UPLOADS_DIR = path.join(path.resolve(), "uploads");

// ✅ Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

app.use(cors());
app.use(express.json());

// ✅ Serve images statically
app.use("/uploads", express.static(UPLOADS_DIR));

// ✅ Connect MongoDB
mongoose.connect("mongodb://localhost:27017/carouselDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  url: String,
});

const Image = mongoose.model("Image", imageSchema);

// ✅ Multer storage configuration
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Upload Image API
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`; // ✅ Corrected URL
    const newImage = new Image({ url: imageUrl });
    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully", url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// ✅ Get Images API
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images.map((img) => img.url)); // ✅ Returns full image path
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// ✅ Delete Image API
app.delete("/api/delete", async (req, res) => {
  try {
    const { url } = req.body;
    const imagePath = path.join(UPLOADS_DIR, path.basename(url)); // ✅ Corrected deletion logic

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Image.deleteOne({ url });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
