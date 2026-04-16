import { useState, useEffect } from "react";
import api from "../api/api";
import HotelCard from "../components/HotelCard";

// Home page - shows all hotels with search filters
function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [capacity, setCapacity] = useState("");

  // Fetch all hotels on page load
  useEffect(() => {
    fetchHotels();
  }, []);

  // Fetch hotels from API (all or filtered)
  const fetchHotels = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/hotels");
      setHotels(response.data);
    } catch (err) {
      setError("Failed to load hotels. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search hotels using filters
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (location) params.location = location;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (capacity) params.capacity = capacity;

      const response = await api.get("/hotels/search", { params });
      setHotels(response.data);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters and reload all hotels
  const handleClear = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setCapacity("");
    fetchHotels();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Find Your Perfect Stay</h1>
        <p className="text-gray-500 mt-2">Search hotels by location, price, and capacity</p>
      </div>

      {/* Search Filters */}
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow p-4 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Guests"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition flex-1">
            Search
          </button>
          <button type="button" onClick={handleClear} className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition">
            Clear
          </button>
        </div>
      </form>

      {/* Loading / Error / Results */}
      {loading && <p className="text-center text-gray-500">Loading hotels...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && hotels.length === 0 && (
        <p className="text-center text-gray-400">No hotels found. Try different filters.</p>
      )}

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
