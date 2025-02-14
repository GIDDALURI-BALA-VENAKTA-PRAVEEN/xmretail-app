import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import icon1 from "./assets/Pharmacy.png";
import { useRef } from "react";

interface Category {
  name: string;
  icon: string;
}

const categories: Category[] = [
  { name: "TOP SALES", icon: icon1 },
  { name: "BANKING", icon: icon1 },
  { name: "EDUCATION", icon: icon1 },
  { name: "FOOD & GROCERY", icon: icon1},
  { name: "HOSTING", icon: "./assets/Group 1.png" },
  { name: "DEPARTMENTAL", icon: "./assets/Group 1.png" },
  { name: "PHARMACY", icon: icon1 },
  { name: "HOME & KITCHEN", icon: "./assets/Group 1.png" },
  { name: "EDUCATION", icon: "./assets/Group 1.png" },
  { name: "FOOD & GROCERY", icon: "./assets/Group 1.png" },
  { name: "HOSTING", icon: "./assets/Group 1.png" },
  { name: "DEPARTMENTAL", icon: "./assets/Group 1.png" },
];

export default function Category() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full  py-6 px-4">
      <h2 className="text-xl font-semibold mb-4">TOP CATEGORIES</h2>
      <div className="relative w-full">
        {/* Left Button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={scrollLeft}
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Category Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-hidden scrollbar-hide gap-4 p-2 scroll-smooth"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow-md px-6 py-4 min-w-[200px]"
            >
              <img src={category.icon} alt={category.name} className="w-20 h-15 mb-2" />
              <p className="text-sm font-medium">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={scrollRight}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
