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
    jar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jars",
    },
    read: Boolean,
  },
  { timestamps: true }
);

export const CookieModel = mongoose.model("cookies", cookieSchema);
