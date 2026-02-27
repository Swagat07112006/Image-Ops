import express from "express";
import upload from "../middleware/upload.js";
import { uploadImage, getAllImages, updateStatus, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteImage);

export default router;
