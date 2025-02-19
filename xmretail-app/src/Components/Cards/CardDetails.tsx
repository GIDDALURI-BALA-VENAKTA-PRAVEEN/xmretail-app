import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

interface CardDetailsType {
  _id: string;
  name: string;
  image: string;
  category: string;
  cashback: string;
  price: number;
  amounts: number[];
  discountedPrice: number;
  validityMonths: number;
}

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState<CardDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAmount(event.target.value);
  };

  useEffect(() => {
    if (!id) {
      setError("Invalid card ID");
      setLoading(false);
      return;
    }

    const fetchCard = async () => {
      try {
        console.log(`Fetching card: http://localhost:5000/api/cards/${id}`);
        const response = await axios.get(`http://localhost:5000/api/cards/${id}`);
        console.log("Card data:", response.data);
        setCard(response.data);
      } catch (err) {
        console.error("Error fetching card:", err);
        setError("Failed to fetch card details");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!card) return <p className="text-center text-gray-500 mt-10">No card found.</p>;

  const discountedAmount = (Number(selectedAmount) * (100 - Number(card.cashback))) / 100;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="text-sm text-gray-500 flex items-center mb-4">
        <span className="text-orange-500"><Link to="/">Home &gt;</Link></span>
        <span className="text-orange-500 font-semibold ml-2">{card.name} Gift Card</span>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <img src={`http://localhost:5000/uploads/${card.image}`} alt={card.name} className="w-full h-auto object-contain rounded shadow-md" />
          <div className="mt-4 text-center sm:text-left">
            <p className="text-gray-500 text-xs">dealzy</p>
            <p className="text-gray-500 text-xs">Valid for up to {card.validityMonths} months</p>
          </div>
          <div className="mt-4 flex justify-center sm:justify-start space-x-2">
            <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition duration-300">How To Redeem</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition duration-300">Points to Note</button>
          </div>
        </div>
        <div className="w-full sm:w-1/2 text-center sm:text-right">
          <p className="text-lg text-gray-700 font-semibold mb-2">{card.name}</p>
          <p className="text-red-500 text-xl font-bold mb-4">{card.cashback}% Off</p>
          <p className="text-gray-700 text-2xl font-bold mb-4">₹ {card.price}</p>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Select Amount to Avail Cashback:</h3>
            <select
              value={selectedAmount}
              onChange={handleAmountChange}
              className="w-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select an amount</option>
              {card.amounts.map((amount, index) => (
                <option key={index} value={amount}>
                  ₹{amount}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">You pay only</p>
            <p className="text-gray-700 text-2xl font-bold">₹ {discountedAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;