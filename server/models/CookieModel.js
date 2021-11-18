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
    cookieImage: {
      type: String,
    },
    cookieImage_id: {
      type: String,
    },
    jarID: {
      type: String,
    },
    read: Boolean,
  },
  { timestamps: true }
);

export const CookieModel = mongoose.model("cookies", cookieSchema);
