import { Link } from "react-router-dom";

// Card component to display a single hotel in the list
function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Hotel Image Placeholder */}
      <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl">
        🏨
      </div>

      {/* Hotel Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
        <p className="text-sm text-gray-500 mt-1">📍 {hotel.location}</p>
        <p className="text-sm text-gray-500 mt-1">⭐ {hotel.rating || "N/A"}</p>
        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{hotel.description}</p>

        {/* View Details Button */}
        <Link
          to={`/hotels/${hotel.id}`}
          className="mt-3 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Rooms →
        </Link>
      </div>
    </div>
  );
}

export default HotelCard;
