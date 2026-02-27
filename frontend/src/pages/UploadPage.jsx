import { useState } from "react";
import { uploadImage } from "../services/api";

function UploadPage() {
  var [file, setFile] = useState(null);
  var [preview, setPreview] = useState(null);
  var [uploading, setUploading] = useState(false);
  var [message, setMessage] = useState("");

  function handleFileChange(e) {
    var selected = e.target.files[0];
    if (!selected) return;

    if (selected.size > 5 * 1024 * 1024) {
      setMessage("File too big! Max 5MB allowed.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  }

  function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an image first!");
      return;
    }

    setUploading(true);
    setMessage("");

    var formData = new FormData();
    formData.append("image", file);

    uploadImage(formData)
      .then(function (response) {
        setMessage("Image uploaded successfully! It is pending review.");
        setFile(null);
        setPreview(null);
        document.getElementById("fileInput").value = "";
      })
      .catch(function (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          setMessage("Error: " + error.response.data.message);
        } else {
          setMessage("Upload failed. Make sure the server is running.");
        }
      })
      .finally(function () {
        setUploading(false);
      });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Upload Image</h2>
      <p className="text-gray-500 mb-6">
        Choose an image (JPG, PNG, GIF, WEBP — max 5MB) to upload for admin review.
      </p>

      <form onSubmit={handleUpload} className="bg-white border rounded-lg p-6 max-w-md">
        <label className="block mb-2 font-medium">Choose Image:</label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full mb-4 border p-2 rounded"
        />

        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-48 object-cover border rounded"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !file}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {message && (
          <p className={
            message.includes("Error") || message.includes("failed") || message.includes("too big")
              ? "mt-4 text-red-600"
              : "mt-4 text-green-600"
          }>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default UploadPage;
