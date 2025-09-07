import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader"; 
import "./SellerLayout.css";

function SellerLayout() {
  return (
    <div className="seller-layout">
      <Sidebar />
      <MobileHeader /> {/* <-- 2. TAMBAHKAN DI SINI */}
      <div className="seller-content">
        <Outlet />
      </div>
      <BottomNavBar />
    </div>
  );
}

export default SellerLayout;
