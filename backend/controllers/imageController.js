import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";

function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Please select an image" });
  }

  var newImage = new Image({
    originalName: req.file.originalname,
    imageUrl: req.file.path,
    cloudinaryId: req.file.filename,
  });

  newImage
    .save()
    .then(function (savedImage) {
      res
        .status(201)
        .json({ message: "Image uploaded! Pending review.", image: savedImage });
    })
    .catch(function (err) {
      console.log("Upload error:", err);
      res.status(500).json({ message: "Upload failed" });
    });
}

function getAllImages(req, res) {
  Image.find()
    .sort({ createdAt: -1 })
    .then(function (images) {
      res.json(images);
    })
    .catch(function (err) {
      console.log("Fetch error:", err);
      res.status(500).json({ message: "Could not get images" });
    });
}

function updateStatus(req, res) {
  var status = req.body.status;
  var rejectionReason = req.body.rejectionReason || "";

  if (status !== "pending" && status !== "accepted" && status !== "rejected") {
    return res.status(400).json({ message: "Invalid status" });
  }

  var updateData = { status: status };
  if (status === "rejected") {
    updateData.rejectionReason = rejectionReason;
  } else {
    updateData.rejectionReason = "";
  }

  Image.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then(function (updatedImage) {
      if (!updatedImage) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.json({ message: "Status updated to " + status, image: updatedImage });
    })
    .catch(function (err) {
      console.log("Update error:", err);
      res.status(500).json({ message: "Could not update status" });
    });
}

function deleteImage(req, res) {
  Image.findById(req.params.id)
    .then(function (image) {
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }

      cloudinary.uploader.destroy(image.cloudinaryId).then(function () {
        Image.findByIdAndDelete(req.params.id).then(function () {
          res.json({ message: "Image deleted" });
        });
      });
    })
    .catch(function (err) {
      console.log("Delete error:", err);
      res.status(500).json({ message: "Could not delete image" });
    });
}

export { uploadImage, getAllImages, updateStatus, deleteImage };
