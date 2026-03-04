import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((err) => {
      console.log("MongoDB connection failed:", err.message);
    });
}

export default connectDB;
