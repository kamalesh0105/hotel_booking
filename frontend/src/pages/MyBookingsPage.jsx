import { useState, useEffect } from "react";
import api from "../api/api";

// My Bookings page - lists all bookings of the logged-in user
function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user bookings on page load
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/bookings/my");
        setBookings(response.data);
      } catch (err) {
        setError("Failed to load bookings. Please log in first.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Handle cancellation logic gracefully 
  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you totally sure you want to cancel this booking?")) return;
    
    try {
      await api.put(`/bookings/${id}/cancel`);
      // Optimistically push the new status straight into local window state 
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "CANCELLED" } : booking
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to successfully cancel booking.");
    }
  };

  // Helper to style the booking status badge
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {/* Loading / Error states */}
      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-gray-400">You have no bookings yet.</p>
      )}

      {/* Bookings List */}
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              {/* Booking Details */}
              <div>
                <p className="text-sm text-gray-500">Booking ID: <span className="font-mono text-xs">{booking.id}</span></p>
                <p className="text-sm text-gray-500 mt-1">Room ID: <span className="font-mono text-xs">{booking.roomId}</span></p>
                <div className="mt-2 flex gap-4 text-sm">
                  <span className="text-gray-600">📅 Check-in: <strong>{booking.checkInDate}</strong></span>
                  <span className="text-gray-600">📅 Check-out: <strong>{booking.checkOutDate}</strong></span>
                </div>
                {booking.totalPrice && (
                  <p className="text-sm text-gray-600 mt-1">💰 Total: <strong>₹{booking.totalPrice}</strong></p>
                )}
              </div>

              {/* Status Badge & Action Controls */}
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(booking.status)}`}>
                  {booking.status || "UNKNOWN"}
                </span>
                {booking.status === "CONFIRMED" && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded border border-red-200 transition font-medium"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookingsPage;
