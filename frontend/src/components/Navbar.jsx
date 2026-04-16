import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Navbar shown on all pages
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md relative z-50">
      {/* App Logo/Name */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        🏨 HotelBook
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-200 transition">
          Home
        </Link>
        
        {user ? (
          <>
            <Link to="/bookings" className="hover:text-blue-200 transition">
              My Bookings
            </Link>

            {/* Profile Context & Dropdown */}
            <div className="relative ml-4 pl-4 border-l border-blue-500" ref={dropdownRef}>
              
              {/* Profile Icon/Badge Toggle */}
              <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition select-none" 
                title="Your Profile"
              >
                <div className="w-6 h-6 rounded-full bg-blue-300 text-blue-900 flex items-center justify-center text-xs font-bold shadow-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="hidden sm:inline">{user.name || "User"}</span>
                <span className="text-xs ml-1">▼</span>
              </div>
              
              {/* Profile Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-md shadow-xl py-2 text-gray-800 border border-gray-100 origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-md">
                    <p className="text-sm font-semibold text-gray-900">{user.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate mt-1" title={user.email}>{user.email}</p>
                  </div>
                  
                  <div className="px-4 py-3 text-sm border-b border-gray-100 space-y-2">
                    {user.phone && (
                      <p className="flex justify-between">
                        <span className="text-gray-500">Phone:</span>
                        <span className="font-medium text-gray-700">{user.phone}</span>
                      </p>
                    )}
                    <p className="flex justify-between">
                      <span className="text-gray-500">Role:</span>
                      <span className="font-medium text-blue-600 uppercase text-xs bg-blue-50 px-2 py-0.5 rounded">{user.role || "USER"}</span>
                    </p>
                    {/* Add more fields mapping from /auth/me payload here if needed */}
                  </div>
                  
                  <div className="px-2 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left bg-red-50 hover:bg-red-500 hover:text-white text-red-600 px-3 py-2 rounded transition text-sm font-semibold flex items-center gap-2"
                    >
                      <span className="text-lg">🚪</span> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Guest Links */}
            <Link to="/login" className="hover:text-blue-200 transition">
              Login
            </Link>
            <Link to="/register" className="bg-white text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-200 px-4 py-1.5 rounded transition font-bold text-xs uppercase tracking-wider">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
