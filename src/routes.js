import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import LoginForm from "./components/authentication/login/LoginForm";
import Navbar from "./components/Nav_bar/nav_bar";
import Footer from "./components/Footer/footer";
import ProductLayout from "./pages/ManageProducts/ProductLayout";
import CartPage from "./pages/ManageStore/CartPage";
import PaymentConfirmed from "./pages/ManageStore/Payment_Success";
import MyProfile from "./pages/ManageProfile/MyProfile";
import { Box } from "@mui/material";

const MyAppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/Products" element={<ProductLayout />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-success" element={<PaymentConfirmed />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyAppRoutes;
