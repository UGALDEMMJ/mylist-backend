import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/mylist/posts", postRoutes);
app.use("/mylist/categories", categoryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(4000, () =>{
    console.log(`Server running in port ${PORT}`);  
});
