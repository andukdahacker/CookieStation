import express from "express";
import {
  getJars,
  createJar,
  getJarData,
  createCookie,
  updateCookieToRead,
  deleteCookie,
  deleteJar,
} from "../controllers/jars.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.get("/", getJars);
router.post("/", createJar);
router.get("/:id", getJarData);
router.post("/:id", upload.single("cookieImage"), createCookie);
router.put("/cookies/update/:id", updateCookieToRead);
router.delete("/cookies/delete/:id", deleteCookie);
router.delete("/:id", deleteJar);

export default router;
