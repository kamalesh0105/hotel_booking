import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import RoomCard from "../components/RoomCard";

// Hotel Details page - shows hotel info and its rooms
function HotelDetailsPage() {
  const { id } = useParams(); // Get hotel ID from URL
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch hotel details and its rooms
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch hotel info and rooms in parallel
        const [hotelRes, roomsRes] = await Promise.all([
          api.get(`/hotels/${id}`),
          api.get(`/hotels/${id}/rooms`),
        ]);
        setHotel(hotelRes.data);
        setRooms(roomsRes.data);
      } catch (err) {
        setError("Failed to load hotel details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!hotel) return <p className="text-center py-10 text-gray-400">Hotel not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link to="/" className="text-blue-600 text-sm hover:underline">← Back to Hotels</Link>

      {/* Hotel Header */}
      <div className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <p className="mt-1">📍 {hotel.location}</p>
        <p className="mt-1">⭐ Rating: {hotel.rating || "N/A"}</p>
        <p className="mt-2 text-sm text-blue-100">{hotel.description}</p>
      </div>

      {/* Rooms Section */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Available Rooms</h2>

      {rooms.length === 0 ? (
        <p className="text-gray-400">No rooms available for this hotel.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HotelDetailsPage;
