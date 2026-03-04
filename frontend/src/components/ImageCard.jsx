import { useState } from "react";

function ImageCard({ image, onStatus, onDelete }) {
  const [reason, setReason] = useState("");
  const [showReason, setShowReason] = useState(false);

  function handleReject() {
    if (!showReason) {
      setShowReason(true);
      return;
    }
    onStatus(image._id, "rejected", reason);
    setShowReason(false);
    setReason("");
  }

  const statusColors = {
    pending: "bg-amber-100 text-amber-700",
    accepted: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img
          src={image.imageUrl}
          alt={image.originalName}
          className="w-full h-44 object-cover"
        />
        <span className={"absolute top-2 right-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full " + statusColors[image.status]}>
          {image.status}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="font-medium text-sm text-gray-800 truncate">{image.originalName}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(image.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {image.status === "rejected" && image.rejectionReason && (
          <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
            <p className="text-xs text-rose-600">{image.rejectionReason}</p>
          </div>
        )}

        {showReason && (
          <input
            type="text"
            placeholder="Reason for rejection (optional)"
            value={reason}
            onChange={function (e) { setReason(e.target.value); }}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
          />
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {image.status !== "accepted" && (
            <button
              onClick={function () { onStatus(image._id, "accepted"); }}
              className="text-xs font-medium bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition cursor-pointer"
            >
              ✓ Accept
            </button>
          )}

          {image.status !== "rejected" && (
            <button
              onClick={handleReject}
              className="text-xs font-medium bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition cursor-pointer"
            >
              {showReason ? "Confirm" : "✕ Reject"}
            </button>
          )}

          {image.status !== "pending" && (
            <button
              onClick={function () { onStatus(image._id, "pending"); }}
              className="text-xs font-medium bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition cursor-pointer"
            >
              ↻ Pending
            </button>
          )}

          <button
            onClick={function () { onDelete(image._id); }}
            className="text-xs font-medium bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition ml-auto cursor-pointer"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
