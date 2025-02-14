import { useEffect, useState } from "react";

import Card from "./Card";
import axios from "axios";

interface CardType {
  _id: string;
  name: string;
  image: string;
  category: string;
  cashback: string;
}

const CardApp = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cards").then((res) => setCards(res.data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Most Popular Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardApp;
