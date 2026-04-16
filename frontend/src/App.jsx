import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes so it shows on every page */}
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels/:id" element={<HotelDetailsPage />} />
          <Route path="/book/:roomId" element={<BookingPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
