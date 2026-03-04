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

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <img
        src={image.imageUrl}
        alt={image.originalName}
        className="w-full h-40 object-cover"
      />

      <div className="p-3">
        <p className="font-medium text-sm truncate">{image.originalName}</p>
        <p className="text-xs text-gray-400">
          {new Date(image.createdAt).toLocaleDateString()}
        </p>

        {image.status === "rejected" && image.rejectionReason && (
          <p className="text-xs text-red-500 mt-1">
            Reason: {image.rejectionReason}
          </p>
        )}

        {showReason && (
          <input
            type="text"
            placeholder="Reason (optional)"
            value={reason}
            onChange={function (e) {
              setReason(e.target.value);
            }}
            className="w-full text-sm border rounded px-2 py-1 mt-2"
          />
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {image.status !== "accepted" && (
            <button
              onClick={function () {
                onStatus(image._id, "accepted");
              }}
              className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
            >
              Accept
            </button>
          )}

          {image.status !== "rejected" && (
            <button
              onClick={handleReject}
              className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
            >
              {showReason ? "Confirm Reject" : "Reject"}
            </button>
          )}

          {image.status !== "pending" && (
            <button
              onClick={function () {
                onStatus(image._id, "pending");
              }}
              className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
            >
              Pending
            </button>
          )}

          <button
            onClick={function () {
              onDelete(image._id);
            }}
            className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
