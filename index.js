import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import personRoutes from "./routes/personRoutes.js";

dotenv.config()
const app = express()
const PORT= process.env.PORT || 8080
const DATABASE_URI = process.env.DATABASE_URI

app.use(express.json())
app.use("/api/person", personRoutes);

mongoose.connect(DATABASE_URI)
.then(()=>{console.log("Mongoose connected successfully")})
.catch((error)=>console.error("Mongoose connection failed:", error));

app.listen(PORT, ()=>{
    console.log(`Server is currently running on http://localhost:${PORT}`);
    
})