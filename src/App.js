import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Ensure you have this for general styles
import AdminApplications from "./pages/Admin/AdminApplications";
import AdminCharities from "./pages/Admin/AdminCharities";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Beneficiaries from "./pages/Beneficiaries/Beneficiaries";
import Home from "./pages/Home/Home"
import Charities from "./pages/Charities/Charities"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CharityApplicationForm from "./pages/Charities/CharityApplicationForm";
import BeneficiariesForm from "./pages/Beneficiaries/BeneficiariesForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/admin_charities" element={<AdminCharities />} />
        <Route path="/applications" element={<AdminApplications />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/charities" element={<Charities />} />
        <Route path="/charities_form" element={<CharityApplicationForm />} />
        <Route path="/Beneficiaries_Form" element={<BeneficiariesForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
