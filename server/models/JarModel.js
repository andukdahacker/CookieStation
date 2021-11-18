import mongoose from "mongoose";

const jarSchema = new mongoose.Schema(
  {
    jarName: {
      type: String,
      required: true,
    },
    cookies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cookies",
      },
    ],
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

export const JarModel = mongoose.model("jars", jarSchema);
