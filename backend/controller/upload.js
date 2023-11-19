import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dsqx3hknt",
  api_key: "674583734234393",
  api_secret: "8M6u281j4BiOgm0MMFJMY1pLr9Y",
});

// Use memory storage for multer
const upload=multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("Unsupported file type!"), false);
        return;
      }
      cb(null, true);
    },
  });

// Create endpoint for image upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Check if a file was provided
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      // folder: "your_folder_name", // optional
    });

    // Log the Cloudinary link
    console.log(result.secure_url);

    res.status(200).json("Image uploaded successfully");
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json("Internal Server Error");
  }
});

export default router;
