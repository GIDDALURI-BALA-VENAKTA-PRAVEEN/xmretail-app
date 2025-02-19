import { useEffect, useState } from "react";

import { Link } from "react-router-dom"; // Import Link for navigation
import Logo from "./assets/Group 1.png";
import axios from "axios";

interface CardType {
  _id: string;
  name: string;
  image: string;
  category: string;
  cashback: string;
}

function Nav() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cards").then((res) => {
      setCards(res.data);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCards([]);
      setShowDropdown(false);
    } else {
      const filtered = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(filtered);
      setShowDropdown(true);
    }
  }, [searchTerm, cards]);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={Logo} className="h-8 w-20 md:w-auto transition-all duration-300" alt="XM RETAIL" />
          <span className="text-lg font-semibold dark:text-white hidden md:block">XM RETAIL</span>
        </a>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Search brands..."
          />
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            🔍
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50">
              {filteredCards.length > 0 ? (
                <div>
                  {filteredCards.map((card) => (
                    <Link
                      to={`/card/${card._id}`} // Navigates to CardDetails
                      key={card._id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <img src={`http://localhost:5000/uploads/${card.image}`} alt={card.name} className="w-8 h-8 rounded-full" />
                        <span className="font-medium">{card.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{card.cashback}%</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Login/Signup Button */}
        <button
          type="button"
          className="text-white bg-[#ff6726] hover:bg-[#FFB74D] focus:ring-2 focus:outline-none focus:ring-[#ff8080] rounded-md text-sm px-4 py-3 dark:bg-[#FF9800] dark:hover:bg-[#FB8C00] dark:focus:ring-[#F57C00] font-semibold"
        >
          Login/Sign up
        </button>
      </div>
    </nav>
  );
}

export default Nav;
