import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import shelfRoutes from "./routers/shelfRoutes.js";
import authRoutes from "./routers/authRoutes.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    preflightContinue: true,
    credentials: true,
  })
);
const PORT = process.env.PORT;
const URI = process.env.URI;

mongoose
  .connect(URI, { useNewURLParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.use("/shelf", shelfRoutes);
app.use("/auth", authRoutes);
