import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/admin-data",
  protect,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

export default router;