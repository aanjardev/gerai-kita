import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import SellerLayout from "./layouts/SellerLayout";

// Import Halaman
import HomePage from "./pages/customer/HomePage";
import ProductDetailPage from "./pages/customer/ProductDetailPage";
import LoginPage from "./pages/seller/LoginPage";
import RegisterPage from "./pages/seller/RegisterPage";
import DashboardHomePage from "./pages/seller/dashboard/DashboardHomePage";
import ProfilePage from "./pages/seller/dashboard/ProfilePage";
import CompleteProfilePage from './pages/seller/CompleteProfilePage'; 
import ProductsPage from "./pages/seller/dashboard/ProductsPage";
import CreateProductPage from "./pages/seller/dashboard/CreateProductPage";
import PromotionsPage from "./pages/seller/dashboard/PromotionsPage";
import AnalyticsPage from "./pages/seller/dashboard/AnalyticsPage";


function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
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

      <Route element={<SellerLayout />}>
        {/* Rute utama dashboard sekarang mengarah ke DashboardHomePage */}
        <Route path="/dashboard" element={<DashboardHomePage />} />

        {/* Rute profil mengarah ke ProfilePage */}
        <Route path="/dashboard/profil" element={<ProfilePage />} />

        <Route path="/melengkapi-profil" element={<CompleteProfilePage />} />
        <Route path="/dashboard/produk" element={<ProductsPage />} />
        <Route path="/dashboard/produk/baru" element={<CreateProductPage />} />
        <Route path="/dashboard/promosi" element={<PromotionsPage />} />
        <Route path="/dashboard/analitik" element={<AnalyticsPage />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
