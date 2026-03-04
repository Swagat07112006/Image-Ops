import { useState, useEffect } from "react";
import { getImages, updateImageStatus, deleteImage } from "../services/api";
import ImageCard from "../components/ImageCard";

function AdminPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchImages() {
    setLoading(true);
    getImages()
      .then(function (response) {
        setImages(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        alert("Failed to load images. Make sure server and MongoDB are running.");
        setLoading(false);
      });
  }

  useEffect(function () {
    fetchImages();
  }, []);

  function handleStatus(id, status, reason) {
    updateImageStatus(id, status, reason)
      .then(function () {
        fetchImages();
      })
      .catch(function () {
        alert("Failed to update status");
      });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this image?")) return;
    deleteImage(id)
      .then(function () {
        fetchImages();
      })
      .catch(function () {
        alert("Failed to delete");
      });
  }

  const pendingImages = images.filter(function (img) {
    return img.status === "pending";
  });
  const acceptedImages = images.filter(function (img) {
    return img.status === "accepted";
  });
  const rejectedImages = images.filter(function (img) {
    return img.status === "rejected";
  });

  if (loading) {
    return <p className="text-gray-500 mt-10">Loading images...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="mb-8 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-3 text-yellow-700">
          Pending Review ({pendingImages.length})
        </h3>
        {pendingImages.length === 0 && <p className="text-gray-400">No pending images.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingImages.map(function (img) {
            return (
              <ImageCard
                key={img._id}
                image={img}
                onStatus={handleStatus}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>

      <div className="mb-8 bg-green-50 border border-green-300 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-3 text-green-700">
          Accepted ({acceptedImages.length})
        </h3>
        {acceptedImages.length === 0 && <p className="text-gray-400">No accepted images.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {acceptedImages.map(function (img) {
            return (
              <ImageCard
                key={img._id}
                image={img}
                onStatus={handleStatus}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>

      <div className="mb-8 bg-red-50 border border-red-300 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-3 text-red-700">
          Rejected ({rejectedImages.length})
        </h3>
        {rejectedImages.length === 0 && <p className="text-gray-400">No rejected images.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rejectedImages.map(function (img) {
            return (
              <ImageCard
                key={img._id}
                image={img}
                onStatus={handleStatus}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
