import mongoose from "mongoose";

const jarSchema = new mongoose.Schema(
  {
    jarName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const JarModel = mongoose.model("Jars", jarSchema);
