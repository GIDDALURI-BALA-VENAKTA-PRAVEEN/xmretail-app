import Card from "../models/Card.js";
import fs from "fs";
import path from "path";

// @desc Get all cards
export const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

// @desc Create a new card
export const createCard = async (req, res) => {
  try {
    const { name, cashback, category, details } = req.body;
    const image = req.file ? req.file.filename : null; // Get uploaded file

    const newCard = new Card({ name, cashback, category, details, image });
    await newCard.save();

    res.json({ message: "Card added successfully", card: newCard });
  } catch (error) {
    console.error("Error saving card:", error);
    res.status(500).json({ error: "Failed to add card" });
  }
};

// @desc Update a card
export const updateCard = async (req, res) => {
  try {
    const { name, cashback, category, details } = req.body;
    const cardId = req.params.id;

    const existingCard = await Card.findById(cardId);
    if (!existingCard) {
      return res.status(404).json({ error: "Card not found" });
    }

    let updatedImage = existingCard.image;
    
    // Check if a new image is uploaded
    if (req.file) {
      // Delete the old image if exists
      if (existingCard.image) {
        const oldImagePath = path.join("uploads", existingCard.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedImage = req.file.filename; // Set new image
    }

    // Update the card
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { name, cashback, category, details, image: updatedImage },
      { new: true }
    );

    res.json({ message: "Card updated successfully", card: updatedCard });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card" });
  }
};

// @desc Delete a card
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    // Delete the image file
    if (card.image) {
      const imagePath = path.join("uploads", card.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete card" });
  }
};
