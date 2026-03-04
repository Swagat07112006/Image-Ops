import { useState, useEffect } from "react";
import { getImages, updateImageStatus, deleteImage } from "../services/api";
import ImageCard from "../components/ImageCard";

function AdminPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  function fetchImages() {
    setLoading(true);
    getImages()
      .then(function (response) {
        setImages(response.data);
        setLoading(false);
      })
      .catch(function () {
        alert("Failed to load images. Make sure server and MongoDB are running.");
        setLoading(false);
      });
  }

  useEffect(function () {
    fetchImages();
  }, []);

  function handleStatus(id, status, reason) {
    updateImageStatus(id, status, reason)
      .then(function () { fetchImages(); })
      .catch(function () { alert("Failed to update status"); });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this image?")) return;
    deleteImage(id)
      .then(function () { fetchImages(); })
      .catch(function () { alert("Failed to delete"); });
  }

  var counts = {
    pending: images.filter(function (i) { return i.status === "pending"; }).length,
    accepted: images.filter(function (i) { return i.status === "accepted"; }).length,
    rejected: images.filter(function (i) { return i.status === "rejected"; }).length,
  };

  var filtered = images.filter(function (i) { return i.status === activeTab; });

  var tabs = [
    { key: "pending", label: "Pending", color: "amber", icon: "⏳" },
    { key: "accepted", label: "Accepted", color: "emerald", icon: "✅" },
    { key: "rejected", label: "Rejected", color: "rose", icon: "❌" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-pulse">🖼️</div>
          <p className="text-gray-400 text-sm">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-500 mt-1">{images.length} total images</p>
      </div>

      <div className="flex gap-2 mb-6 bg-gray-100 p-1.5 rounded-xl w-fit">
        {tabs.map(function (tab) {
          var isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={function () { setActiveTab(tab.key); }}
              className={
                "px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer " +
                (isActive
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700")
              }
            >
              {tab.icon} {tab.label}
              <span className={
                "ml-1.5 text-xs px-1.5 py-0.5 rounded-full " +
                (isActive ? "bg-" + tab.color + "-100 text-" + tab.color + "-600" : "bg-gray-200 text-gray-500")
              }>
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-gray-400">No {activeTab} images right now</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(function (img) {
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
      )}
    </div>
  );
}

export default AdminPage;
