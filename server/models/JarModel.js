import mongoose from "mongoose";
import { cookieSchema } from "./CookieModel.js";

const jarSchema = new mongoose.Schema(
  {
    jarName: {
      type: String,
      required: true,
    },
    cookies: [cookieSchema],
  },
  { timestamps: true }
);

export const JarModel = mongoose.model("Jars", jarSchema);
