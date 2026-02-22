import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://192.168.56.5:5000/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Backend not reachable");
        }
        return res.text();
      })
      .then((data) => setMessage(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900">
      <Navbar />
      <HeroSection />
      <About />

      <div className="text-center mt-6">
        {message && (
          <h2 className="text-green-600 text-xl font-semibold">
            {message}
          </h2>
        )}

        {error && (
          <h2 className="text-red-600 text-xl font-semibold">
            {error}
          </h2>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;