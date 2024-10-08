import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AdminApplications from "./pages/Admin/AdminApplications";
import AdminCharities from "./pages/Admin/AdminCharities";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Beneficiaries from "./pages/Beneficiaries/Beneficiaries";
import BeneficiariesForm from "./pages/Beneficiaries/BeneficiariesForm";
import Home from "./pages/Home/Home";
import Charities from "./pages/Charities/Charities";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CharityApplicationForm from "./pages/Charities/CharityApplicationForm";
import SignUpForm from "./pages/Home/SignUpForm";
import LoginForm from "./pages/Home/Login";
import AdminLoginForm from "./pages/Admin/AdminLogin";
import AdminRegisterForm from "./pages/Admin/AdminRegister";
import AdminBeneficiaries from "./pages/Admin/AdminBeneficiaries";

function Layout() {
  const location = useLocation();
  
  // Routes where Navbar and Footer should not be displayed
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/admin_login';

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/admin_charities" element={<AdminCharities />} />
        <Route path="/applications" element={<AdminApplications />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/charities" element={<Charities />} />
        <Route path="/charities_form" element={<CharityApplicationForm />} />
        <Route path="/beneficiaries_form" element={<BeneficiariesForm />} />
        <Route path="/sign_up" element={<SignUpForm />} />
        <Route path="/admin_login" element={<AdminLoginForm />} />
        <Route path="/admin_register" element={<AdminRegisterForm />} />
        <Route path="/admin_beneficiaries" element={<AdminBeneficiaries />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
