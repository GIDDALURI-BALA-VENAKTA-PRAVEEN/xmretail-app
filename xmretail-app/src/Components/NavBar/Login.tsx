import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // Use React Router navigation

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", { email });
      if (response.status === 200) {
        alert("OTP sent to your email!");
        setStep(2);
      }
    } catch (error) {
      console.error("Error sending OTP", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      if (response.status === 200) {
        alert("OTP verified successfully!");
        navigate("/welcome"); // Redirect to Welcome Page
      }
    } catch (error) {
      console.error("Invalid OTP", error);
      alert("Invalid or expired OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {step === 1 && (
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />
          <button onClick={handleEmailSubmit} className="bg-blue-500 text-white p-2 rounded w-full">
            Send OTP
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />
          <button onClick={handleOtpSubmit} className="bg-blue-500 text-white p-2 rounded w-full">
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
