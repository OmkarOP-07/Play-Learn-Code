import User from "../models/User.js";

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user points
export const updateUserPoints = async (req, res) => {
  const { userId, points } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.points = points; // or: user.points += points; if you want to accumulate
    await user.save();

    res.status(200).json({ message: "Points updated", points: user.points });
  } catch (err) {
    console.error("Error updating points:", err);
    res.status(500).json({ message: "Server error" });
  }
};
