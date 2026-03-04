import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  originalName: String,
  imageUrl: String,
  cloudId: String,
  status: {
    type: String,
    default: "pending",
  },
  rejectionReason: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
