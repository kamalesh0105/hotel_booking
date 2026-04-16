import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";

// Booking page - form to select dates and submit a booking
function BookingPage() {
  const { roomId } = useParams(); // Get room ID from URL
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Today's date in YYYY-MM-DD format (for min date validation)
  const today = new Date().toISOString().split("T")[0];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (checkInDate >= checkOutDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/bookings", {
        roomId: roomId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Show success message after booking
  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <p className="text-4xl mb-4">✅</p>
          <h2 className="text-xl font-bold text-green-700">Booking Confirmed!</h2>
          <p className="text-gray-500 mt-2">Your room has been booked successfully.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link to="/bookings" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
              View My Bookings
            </Link>
            <Link to="/" className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 text-sm hover:underline">← Back to Hotels</Link>

      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-6">Book This Room</h1>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        {/* Room ID Display */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Room ID</label>
          <input
            type="text"
            value={roomId}
            disabled
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 text-gray-500"
          />
        </div>

        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            min={today}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            min={checkInDate || today}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default BookingPage;
