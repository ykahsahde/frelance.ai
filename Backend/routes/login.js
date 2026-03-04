import express from "express";
import User from "../models/loginUser.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Google Login
router.post("/google-login", async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    // If not exists, create new user
    if (!user) {
      user = await User.create({
        name,
        email,
        photo,
        password: "google-auth"  // dummy password
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;