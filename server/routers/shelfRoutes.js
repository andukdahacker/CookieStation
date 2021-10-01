import express from "express";
import {
  getJars,
  createJar,
  getJarData,
  createCookie,
} from "../controllers/jars.js";

const router = express.Router();

router.get("/", getJars);
router.post("/", createJar);
router.get("/:id", getJarData);
router.post("/:id", createCookie);

export default router;
