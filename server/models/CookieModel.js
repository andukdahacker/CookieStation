import mongoose from "mongoose";

export const cookieSchema = new mongoose.Schema(
  {
    cookieTitle: {
      type: String,
      required: true,
    },
    cookieContent: {
      type: String,
      required: true,
    },
    jar: { type: mongoose.Schema.Types.ObjectId, ref: "Jars" },
  },
  { timestamps: true }
);

export const CookieModel = mongoose.model("Cookies", cookieSchema);
