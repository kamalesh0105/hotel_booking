import { Link } from "react-router-dom";

// Navbar shown on all pages
function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* App Logo/Name */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        🏨 HotelBook
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-200 transition">
          Home
        </Link>
        <Link to="/bookings" className="hover:text-blue-200 transition">
          My Bookings
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
