import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function SellerLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // Arahkan ke homepage setelah logout
  };

  return (
    <div>
      {/* Header/Navigasi Khusus untuk Dashboard Seller */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Link
          to="/dashboard"
          style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}
        >
          Dashboard Penjual
        </Link>
        <nav>
          <Link to="/dashboard/produk" style={{ marginRight: "20px" }}>
            Produk Saya
          </Link>
          <Link to="/dashboard/profil" style={{ marginRight: "20px" }}>
            Profil Toko
          </Link>
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "transparent",
              color: "red",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Konten Halaman Dashboard (misal: daftar produk) akan dirender di sini */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default SellerLayout;
