import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js"
import { connectDB } from "./config/db.js";
import path from 'path';
const PORT = process.env.PORT || 3000;
     
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/todos/", todoRoutes);

const __dirname = path.resolve(); // ✅ Corrected from _dirnane

if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Fallback route to serve index.html for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(3000, () => {
    connectDB();
    console.log("server started at http://localhost:3000");
});