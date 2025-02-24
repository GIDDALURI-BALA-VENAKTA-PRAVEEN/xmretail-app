import { User } from "../models/User.js";

// ✅ Update Profile
export const updateProfile = async (req, res) => {
  const { email, name, phone } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, phone },
      { new: true, upsert: true } // Returns updated document; creates one if not found
    );

    if (!user) {
      return res.status(500).json({ message: "Failed to update or create user" });
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

// ✅ Fetch User Profile

export const getProfile = async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
  }
};