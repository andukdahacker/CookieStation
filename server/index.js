import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import shelfRoutes from "./routers/shelfRoutes.js";
import cookieRoutes from "./routers/cookieRoutes.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors());
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
app.use("/cookies", cookieRoutes);
