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
export const updateUserPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if(user.points >= 170){
      return res.status(400).json({ message: "User already has 170 points" });
    } else {
      user.points = points;
      await user.save();
      res.status(200).json({ message: "Points updated successfully", points });
    }
   
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ message: "Server error" });
  }
};
