import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

import axios from "axios";

export default function FullWidthCarousel() {
  const [index, setIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3); // Default for Desktop
  const [images, setImages] = useState<string[]>([]);
  const SERVER_URL = import.meta.env.VITE_API_URL;

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/images`);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [SERVER_URL]);

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet
      } else {
        setItemsPerSlide(3); // Desktop
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // Navigate to the next slide
  const nextSlide = () => {
    if (index + itemsPerSlide < images.length) {
      setIndex(index + itemsPerSlide);
    } else {
      setIndex(0); // Loop back to the first slide
    }
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    if (index - itemsPerSlide >= 0) {
      setIndex(index - itemsPerSlide);
    } else {
      setIndex(images.length - itemsPerSlide); // Loop to the last slide
    }
  };

  return (
    <div className="relative  overflow-hidden mt-4 rounded-lg  p-2 sm:p-4 mx-2 sm:mx-4 lg:mx-6">
      <h2>hiii</h2>
      {/* Previous Button */}
      <div className="absolute top-1/2 left-1 transform -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="p-1 sm:p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
        >
          <FaChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${(index / itemsPerSlide) * 100}%)` }}>
          <h2>Hello</h2>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-full ${
              itemsPerSlide === 1 ? "sm:w-full" : itemsPerSlide === 2 ? "sm:w-1/2" : "sm:w-1/3"
            } p-1`}
          >
            <img
              src={`${SERVER_URL}${img}`}
              alt={`Slide ${idx + 1}`}
              className="w-full h-42 sm:h-56 md:h-48 lg:h-56 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="absolute top-1/2 right-1 transform -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="p-1 sm:p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
        >
          <FaChevronRight size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}