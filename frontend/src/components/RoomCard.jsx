import { Link } from "react-router-dom";

// Card component to display a single room
function RoomCard({ room }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
      {/* Room Info */}
      <div>
        <h4 className="font-semibold text-gray-800">{room.roomType}</h4>
        <p className="text-sm text-gray-500 mt-1">👥 Capacity: {room.capacity}</p>
        <p className="text-sm text-gray-500">🛏️ Available: {room.availableRooms} / {room.totalRooms}</p>
      </div>

      {/* Price and Book Button */}
      <div className="text-right">
        <p className="text-lg font-bold text-blue-600">₹{room.pricePerNight}<span className="text-xs text-gray-400">/night</span></p>
        {room.availableRooms > 0 ? (
          <Link
            to={`/book/${room.id}`}
            className="mt-2 inline-block bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Book Now
          </Link>
        ) : (
          <span className="mt-2 inline-block bg-gray-300 text-gray-600 text-sm px-4 py-2 rounded cursor-not-allowed">
            Sold Out
          </span>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
