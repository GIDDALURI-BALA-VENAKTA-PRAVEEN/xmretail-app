import React, { useState } from "react";

import Login from "../Login/Login";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-4">
        <h1 className="text-xl font-bold">Home</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Login
        </button>
      </div>

      

      <Login isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
