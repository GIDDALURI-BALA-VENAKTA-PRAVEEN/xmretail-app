import { useEffect, useState } from "react";

const SERVER_URL = import.meta.env.VITE_API_URL;
import Card from "./Card";
import axios from "axios";

interface CardType {
  _id: string;
  name: string;
  image: string;
  category: string;
  cashback: string;
}

interface CardAppProps {
  selectedCategory: string; // Prop for selected category
}

const CardApp: React.FC<CardAppProps> = ({ selectedCategory }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [visibleCount, setVisibleCount] = useState(10); // Show 10 cards initially

  useEffect(() => {
    axios.get(`${SERVER_URL}/api/cards`).then((res) => {
      setCards(res.data);
    });
  }, []);

  // Filter cards based on selected category
  const filteredCards = selectedCategory
    ? cards.filter((card) => card.category === selectedCategory)
    : cards;

  // Limit the number of visible cards
  const visibleCards = filteredCards.slice(0, visibleCount);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Most Popular Brands</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
        {visibleCards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < filteredCards.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleCount(filteredCards.length)} // Show all remaining cards
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default CardApp;
