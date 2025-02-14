import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cashback: { type: String, required: true },
  category: { type: String, required: true },
  details: { type: String },
  image: { type: String }, // Store filename
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
