import express from "express";
import {
  getJars,
  createJar,
  getJarData,
  createCookie,
  updateCookieToRead,
  deleteCookie,
  deleteJar,
  getCookieData,
} from "../controllers/jars.js";
import { upload } from "../utils/multer.js";
import { requireAuth, checkAuthor } from "../utils/authMiddleware.js";
const router = express.Router();

router.get("/", requireAuth, getJars);
router.post("/", requireAuth, createJar);
router.get("/:id", checkAuthor, getJarData);
router.post("/:id", upload.single("cookieImage"), createCookie);
router.put("/cookies/update/:id", requireAuth, updateCookieToRead);
router.delete("/cookies/delete/:id", requireAuth, deleteCookie);
router.delete("/:id", requireAuth, deleteJar);
router.get("/cookies/:id", requireAuth, getCookieData);
export default router;
