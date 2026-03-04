import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import adminRoute from "./routes/adminRoute.js";
import authRoute from "./routes/login.js";




dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((error)=>{
    console.log("Error:" + error)
})
app.use(express.json());
app.use(cors({
  origin: "https://frelance-ai.vercel.app"
}));
// Routes
app.use("/api/auth",authRoutes);
app.use("/api/projects",projectRoutes)
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);

app.get("/",(req,res)=>{
    res.send("API is running......")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
 
