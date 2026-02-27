import axios from "axios";

function uploadImage(formData) {
  return axios.post("/api/images/upload", formData);
}

function getImages() {
  return axios.get("/api/images");
}

function updateImageStatus(id, status, rejectionReason) {
  return axios.patch("/api/images/" + id + "/status", {
    status: status,
    rejectionReason: rejectionReason || "",
  });
}

function deleteImage(id) {
  return axios.delete("/api/images/" + id);
}

export { uploadImage, getImages, updateImageStatus, deleteImage };
