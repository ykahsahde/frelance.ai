import express from "express";
import {registerUser,LoginUser, getUserprofile} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",LoginUser);
router.get("/profile",protect,getUserprofile)
router.get("/test", (req,res)=>{
  res.send("API working");
});

export default router;