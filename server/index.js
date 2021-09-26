import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import shelfRoutes from "./routers/shelfRoutes.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://anduc:ducdeptraino4@cluster0.o29zt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors());

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
