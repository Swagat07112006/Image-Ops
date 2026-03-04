import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(filePath) {
  return cloudinary.uploader.upload(filePath, { folder: "image-review-app" });
}

function deleteFromCloudinary(publicId) {
  return cloudinary.uploader.destroy(publicId);
}

export { uploadToCloudinary as uploadFile, deleteFromCloudinary as deleteFile };
                                          