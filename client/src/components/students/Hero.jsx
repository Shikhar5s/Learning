import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`bg-gray-900 w-full px-12 py-12 text-center transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Hero section"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white leading-tight max-w-5xl mx-auto">
        <span className="bg-yellow-400 px-4 py-2 rounded-md text-gray-900 inline-block">
          Empower Your Learning Journey
        </span>
      </h1>
      <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
        Discover, organize, and track your courses with our intuitive Learning Management System designed to help you achieve your goals efficiently and effectively.
      </p>
      <div className="mt-8 flex justify-center gap-8">
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-md font-semibold shadow-lg shadow-blue-700/50">
          Get Started
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 transition text-white px-8 py-4 rounded-md font-semibold shadow-lg shadow-gray-700/50">
          Watch Demo
        </button>
      </div>
      <div className="mt-8">
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;