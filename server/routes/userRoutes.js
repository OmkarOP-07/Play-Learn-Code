import express from "express";
import { updateUserPoints } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a test route to verify the router is working
router.get("/test", (req, res) => {
  res.json({ message: "User routes are working" });
});

// Protected route for updating points
router.post('/updatePoints', updateUserPoints);


export default router;