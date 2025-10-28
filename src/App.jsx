import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";

const App = () => {
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        try {
          const response = await axios.get(url);
          const exactLocation = response.data.address;
          setLocation(exactLocation);
          setOpenDropdown(false);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
