import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import SellerLayout from "./layouts/SellerLayout";

// Import Halaman
import HomePage from "./pages/customer/HomePage";
import ProductDetailPage from "./pages/customer/ProductDetailPage";
import LoginPage from "./pages/seller/LoginPage";
import RegisterPage from "./pages/seller/RegisterPage";
import DashboardPage from "./pages/seller/DashboardPage";
import CompleteProfilePage from './pages/seller/CompleteProfilePage'; 


function App() {
  return (
    <Routes>
      {/* Rute TANPA Layout (Login & Register) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Grup Rute dengan Layout CUSTOMER */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/produk/:id" element={<ProductDetailPage />} />
        <Route
          path="/kategori"
          element={
            <div>
              <h1>Halaman Kategori</h1>
            </div>
          }
        />
        <Route
          path="/tentang"
          element={
            <div>
              <h1>Halaman Tentang Kami</h1>
            </div>
          }
        />
      </Route>

      {/* Grup Rute dengan Layout SELLER (Dashboard) */}
      <Route element={<SellerLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/melengkapi-profil" element={<CompleteProfilePage />} />
        <Route
          path="/dashboard/produk"
          element={
            <div>
              <h1>Halaman Kelola Produk</h1>
            </div>
          }
        />
        <Route
          path="/dashboard/profil"
          element={
            <div>
              <h1>Halaman Kelola Profil Toko</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
