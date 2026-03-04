import { useState, useRef } from "react";
import { uploadImage } from "../services/api";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function pickFile(selected) {
    if (!selected) return;

    if (selected.size > 5 * 1024 * 1024) {
      setMessage("File too big! Max 5MB allowed.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  }

  function handleFileChange(e) {
    pickFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    pickFile(e.dataTransfer.files[0]);
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
      .then(function () {
        setMessage("Image uploaded successfully! It's now pending review.");
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
      })
      .catch(function (error) {
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

  function clearSelection() {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  var isError = message.includes("Error") || message.includes("failed") || message.includes("too big");

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Upload an Image</h2>
        <p className="text-gray-500 mt-2">
          JPG, PNG, GIF, or WEBP — max 5MB. It'll go to admin for review.
        </p>
      </div>

      <form onSubmit={handleUpload}>
        <div
          onDragOver={function (e) { e.preventDefault(); setDragOver(true); }}
          onDragLeave={function () { setDragOver(false); }}
          onDrop={handleDrop}
          onClick={function () { inputRef.current.click(); }}
          className={
            "relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 " +
            (dragOver
              ? "border-indigo-400 bg-indigo-50"
              : preview
                ? "border-gray-200 bg-white"
                : "border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/50")
          }
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-56 rounded-lg object-contain shadow-sm"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                type="button"
                onClick={function (e) { e.stopPropagation(); clearSelection(); }}
                className="text-xs text-gray-400 hover:text-red-500 underline transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-5xl">📁</div>
              <p className="text-gray-600 font-medium">Drop your image here or click to browse</p>
              <p className="text-xs text-gray-400">Supports JPG, PNG, GIF, WEBP</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className={
            "w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 cursor-pointer " +
            (uploading || !file
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-sm")
          }
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {message && (
          <div className={
            "mt-4 px-4 py-3 rounded-xl text-sm font-medium " +
            (isError ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200")
          }>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadPage;
