import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

import axios from "axios";

export default function FullWidthCarousel() {
  const [index, setIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  
  // Default for Desktop

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

  const nextSlide = () => {
    if (index + itemsPerSlide < images.length) {
      setIndex(index + itemsPerSlide);
    } else {
      setIndex(0);
    }
  };

  const prevSlide = () => {
    if (index - itemsPerSlide >= 0) {
      setIndex(index - itemsPerSlide);
    } else {
      setIndex(images.length - itemsPerSlide);
    }
  };

  return (

    <div className="relative overflow-hidden rounded-sm shadow-sm p-6">
    <div className="relative w-full overflow-hidden rounded-lg ">
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <button onClick={prevSlide} className="p-3 bg-gray-800 text-white rounded-full shadow-lg">
          <FaChevronLeft size={24} />
        </button>
      </div>

      <div className="flex transition-transform duration-700 ease-in-out mx-2 my-4"
        style={{ transform: `translateX(-${(index / itemsPerSlide) * 100}%)` }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:5000${img}`}
            alt={`Slide ${idx + 1}`}
            className={`w-[100%] sm:w-[50%] lg:w-[33.33%] flex-shrink-0 object-cover rounded-lg shadow-md mx-2`}
          />
        ))}
      </div>

      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
        <button onClick={nextSlide} className="p-3 bg-gray-800 text-white rounded-full shadow-lg">
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
    </div>
  );
}
