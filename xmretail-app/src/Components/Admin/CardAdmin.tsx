import { useEffect, useState } from "react";

import { FiPlus } from "react-icons/fi";
import axios from "axios";

const CardAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
    cashback: "",
    category: "",
    details: "",
  });

  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Fetch all cards
  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cards");
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCard) {
        // Updating an existing card
        const updatedData = {
          name: formData.name,
          cashback: formData.cashback,
          category: formData.category,
          details: formData.details,
        };

        if (formData.image) {
          // If a new image is selected, send form-data
          const data = new FormData();
          data.append("name", formData.name);
          data.append("cashback", formData.cashback);
          data.append("category", formData.category);
          data.append("details", formData.details);
          data.append("image", formData.image);

          const response = await axios.put(`http://localhost:5000/api/cards/${editingCard}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          console.log("Update Response:", response.data);
        } else {
          // If no image is changed, send JSON
          const response = await axios.put(`http://localhost:5000/api/cards/${editingCard}`, updatedData);
          console.log("Update Response:", response.data);
        }

        alert(`Card "${formData.name}" updated successfully!`);
      } else {
        // Adding a new card
        const data = new FormData();
        data.append("name", formData.name);
        data.append("cashback", formData.cashback);
        data.append("category", formData.category);
        data.append("details", formData.details);
        if (formData.image) data.append("image", formData.image);

        const response = await axios.post("http://localhost:5000/api/cards", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Create Response:", response.data);
        alert(`Card "${formData.name}" added successfully!`);
      }

      // Reset Form
      setFormData({ name: "", image: null, cashback: "", category: "", details: "" });
      setEditingCard(null);
      setShowForm(false); // Hide the form after submission
      fetchCards();
    } catch (error) {
      console.error("Error saving card:", error);
      alert("Failed to save card!");
    }
  };

  // Handle delete card
  const handleDelete = async (id: string, name: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cards/${id}`);
      alert(`Card "${name}" deleted!`);
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete card!");
    }
  };

  // Handle Edit button click
  const handleEdit = (card: any) => {
    setEditingCard(card._id);
    setFormData({
      name: card.name,
      image: null,
      cashback: card.cashback,
      category: card.category,
      details: card.details,
    });
    setShowForm(true); // Show the form when editing
  };

  return (
    <div className="p-5 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cards Dashboard</h2>

        {/* Add Item Button */}
        



        <div className="top-30 left-50 space-y-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-blue-600"
            >
              <FiPlus /> <span> {showForm ? "Hide Form" : "Add Item"}</span>
            </button>
        
          </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg mt-5 shadow-md mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Brand Name"
                className="border p-2 w-full rounded"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                type="file"
                name="image"
                className="border p-2 w-full rounded"
                onChange={handleFileChange}
              />
              <input
                type="text"
                name="cashback"
                placeholder="Cashback %"
                className="border p-2 w-full rounded"
                onChange={handleChange}
                value={formData.cashback}
              />
              {/* <input
                type="text"
                name="category"
                placeholder="Category (e.g., Online Shopping, Food, etc.)"
                className="border p-2 w-full rounded"
                onChange={handleChange}
                value={formData.category}
              /> */}

<select
  name="category"
  onChange={handleChange}
  value={formData.category}
  className="border p-2 w-full rounded"
>
  <option value="" disabled selected>Select a category</option>
  <option value="BIGGEST SALES">BIGGEST SALES</option>
  <option value="BANKING">BANKING</option>
  <option value="HOTELS & FLIGHTS">HOTELS & FLIGHTS</option>
  <option value="ELECTRONICS">ELECTRONICS</option>
  <option value="MOBILES">MOBILES</option>
  <option value="FASHION">FASHION</option>
  <option value="BEAUTY & GROOMING">BEAUTY & GROOMING</option>
  <option value="HEALTH & WELLNESS">HEALTH & WELLNESS</option>
  <option value="PHARMACY">PHARMACY</option>
  <option value="HOME & KITCHEN">HOME & KITCHEN</option>
  <option value="EDUCATION">EDUCATION</option>
  <option value="FOOD & GROCERY">FOOD & GROCERY</option>
  <option value="HOSTING">HOSTING</option>
  <option value="DEPARTMENTAL">DEPARTMENTAL</option>
</select>

              
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
                {editingCard ? "Update Card" : "Add Card"}
              </button>
            </form>
          </div>
        )}

        {/* Cards List */}
        <h3 className="text-xl font-bold mt-8 text-gray-800">Cards List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          {cards.map((card) => (
            <div key={card._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={`http://localhost:5000/uploads/${card.image}`}
                alt={card.name}
                className="w-full h-32 object-cover rounded-md"
              />
              <h4 className="font-bold mt-2">{card.name}</h4>
              <p className="text-sm text-gray-600">Category: {card.category}</p>
              <p className="text-sm text-gray-600">Cashback: {card.cashback}%</p>
              <div className="flex justify-between mt-3">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => handleDelete(card._id, card.name)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => handleEdit(card)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;