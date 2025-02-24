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
// export const createCard = async (req, res) => {
//   try {
//     const { name, cashback, category, details } = req.body;
//     const image = req.file ? req.file.filename : null; // Get uploaded file

//     const newCard = new Card({ name, cashback, category, details, image });
//     await newCard.save();

//     res.json({ message: "Card added successfully", card: newCard });
//   } catch (error) {
//     console.error("Error saving card:", error);
//     res.status(500).json({ error: "Failed to add card" });
//   }
// };


export const createCard = async (req, res) => {
  try {
    const { name, cashback, category, details, validityMonths, amounts } = req.body;

    if (!validityMonths) {
      return res.status(400).json({ message: "Validity (months) is required." });
    }

    const newCard = new Card({
      name,
      cashback,
      category,
      details,
      validityMonths,
      amounts: amounts.split(",").map(a => a.trim()), // Convert to array
      image: req.file ? req.file.filename : null,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: "Server error" });
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


// Fetch cards by category
export const getCardsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const cards = await Card.find({ category });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cards by category", error: error.message });
  }
};
// //import Card from "../models/Card.js";

// // Get single card by ID
// export const fetchCardById = async (req, res) => {
//   try {
//     const card = await Card.findById(req.params.cardId);
//     if (!card) return res.status(404).json({ message: "Card not found" });
//     res.json(card);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create new card
// export const addNewCard = async (req, res) => {
//   try {
//     const { name, category, cashback } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const newCard = new Card({ name, image, category, cashback });
//     await newCard.save();
//     res.status(201).json(newCard);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete card by ID
// export const removeCard = async (req, res) => {
//   try {
//     const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
//     if (!deletedCard) return res.status(404).json({ message: "Card not found" });
//     res.json({ message: "Card removed successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
