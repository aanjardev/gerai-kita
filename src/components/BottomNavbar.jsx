import React from "react";
import { NavLink } from "react-router-dom";
import "./BottomNavBar.css";

// --- KUMPULAN IKON SVG SEBAGAI KOMPONEN REACT ---

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"
    />
  </svg>
);

const ProductIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    />
  </svg>
);

const PromotionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5h.008v.008h-.008v-.008z"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 21v-7.875zM12.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v12c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-12zM8.25 15c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v6c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 018.25 21v-6z"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

// --- KOMPONEN UTAMA ---

function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" end className="nav-link">
        <HomeIcon />
        <span>Beranda</span>
      </NavLink>
      <NavLink to="/dashboard/produk" className="nav-link">
        <ProductIcon />
        <span>Produk</span>
      </NavLink>
      <NavLink to="/dashboard/promosi" className="nav-link">
        <PromotionIcon />
        <span>Promosi</span>
      </NavLink>
      <NavLink to="/dashboard/analitik" className="nav-link">
        <AnalyticsIcon />
        <span>Analitik</span>
      </NavLink>
      <NavLink to="/dashboard/profil" className="nav-link">
        <ProfileIcon />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavBar;
