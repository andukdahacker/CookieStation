import express from "express";
import { getJars, createJar } from "../controllers/jars.js";

const router = express.Router();

router.get("/", getJars);
router.post("/", createJar);

export default router;
