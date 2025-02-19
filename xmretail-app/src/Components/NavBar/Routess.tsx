import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLogin from "../Admin/AdminLogin";
import App from "../../App";
import CardDetails from "../Cards/CardDetails";
import DashBoard from "../Admin/DashBoard";

function Routess() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/card/:id" element={<CardDetails />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default Routess;
