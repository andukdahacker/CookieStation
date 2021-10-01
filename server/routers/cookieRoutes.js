import express from "express";
import { getCookieData } from "../controllers/cookies.js";

const router = express.Router();

// router.get("/", getCookies);
router.get("/:id", getCookieData);

export default router;
