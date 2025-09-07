import React from "react";
import { Outlet, Link } from "react-router-dom";

function CustomerLayout() {
  return (
    <div>
      {/* Header/Navigasi untuk Customer */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <Link
          to="/"
          style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}
        >
          GERAIKITA
        </Link>
        <nav>
          <Link to="/kategori" style={{ marginRight: "20px" }}>
            Kategori
          </Link>
          <Link to="/tentang" style={{ marginRight: "20px" }}>
            Tentang Kami
          </Link>
          <Link
            to="/login"
            style={{
              padding: "8px 15px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Untuk Penjual
          </Link>
        </nav>
      </header>

      {/* Konten Halaman akan dirender di sini */}
      <main>
        <Outlet />
      </main>

      {/* Kamu bisa menambahkan Footer di sini jika perlu */}
      <footer
        style={{
          marginTop: "40px",
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid #ddd",
        }}
      >
        <p>© 2025 GERAIKITA</p>
      </footer>
    </div>
  );
}

export default CustomerLayout;
