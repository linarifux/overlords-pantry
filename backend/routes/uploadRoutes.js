import express from 'express';
import multer from 'multer';
import { configDotenv } from 'dotenv';
configDotenv()
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// ==========================================
// 1. CONFIGURATION
// ==========================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// 2. STORAGE ENGINE
// ==========================================
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'overlords-pantry',
    allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
    // Optional: Add a public_id property to control the filename
    // public_id: (req, file) => file.fieldname + '-' + Date.now(),
  },
});

// Initialize Multer
const upload = multer({ storage });

// ==========================================
// 3. ROUTE HANDLING
// ==========================================
router.post('/', (req, res) => {
  // We wrap the upload middleware in a function to catch errors manually
  const uploadSingle = upload.single('image');

  uploadSingle(req, res, function (err) {
    if (err) {
        console.log('Error: ', err);
        
      // 1. Handle Multer Errors (e.g., File too large, wrong type)
      return res.status(400).send({ 
        message: err.message || 'Image upload failed' 
      });
    }

    // 2. Handle Case where no file was sent
    if (!req.file) {
      return res.status(400).send({ message: 'No image file provided' });
    }

    // 3. Success Response
    res.status(200).send({
      message: 'Image Uploaded',
      image: req.file.path, // Cloudinary URL
    });
  });
});

export default router;