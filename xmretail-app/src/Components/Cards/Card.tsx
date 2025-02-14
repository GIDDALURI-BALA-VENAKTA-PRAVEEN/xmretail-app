interface CardProps {
  card: {
    name: string;
    image: string;
    category: string;
    cashback: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="border p-4 rounded-xl shadow-lg bg-white flex flex-col items-center w-64 h-56 transition-all hover:shadow-2xl">
      <img src={`http://localhost:5000/uploads/${card.image}`} alt={card.name} className="w-24 h-24 object-contain mb-2" />
      <p className="text-sm text-gray-500">{card.category}</p>
      <h2 className="text-lg font-semibold text-center text-blue-900">{card.name}</h2>
      <p className="text-green-600 font-bold mt-1">{card.cashback} Off</p>
    </div>
  );
};

export default Card;
