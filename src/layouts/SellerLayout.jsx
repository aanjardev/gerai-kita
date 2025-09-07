import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar"; // Import menu bawah
import Sidebar from "../components/Sidebar"; // Import sidebar
import "./SellerLayout.css"; // CSS untuk layout utama

function SellerLayout() {
  return (
    <div className="seller-layout">
      <Sidebar /> {/* Sidebar untuk Desktop */}
      <div className="seller-content">
        <Outlet /> {/* Konten halaman akan dirender di sini */}
      </div>
      <BottomNavBar /> {/* Menu Bawah untuk Mobile */}
    </div>
  );
}

export default SellerLayout;
