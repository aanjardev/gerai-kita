import React from "react";
import "./PromotionsPage.css";

// Ikon placeholder
const BannerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="promo-card-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h16.5v11.25c0 1.242-.99 2.25-2.25 2.25h-1.5M3.75 3L3 3m0 0l.75.75M3 3l-.75.75m19.5 0l-.75-.75M21 3l.75.75M12 9l3 3m0 0l-3 3m3-3h-6m1.5-6V3"
    />
  </svg>
);
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="promo-card-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);
const DesignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="promo-card-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456l1.178.398-1.178.398a3.375 3.375 0 00-2.456 2.456z"
    />
  </svg>
);

function PromotionsPage() {
  const handleRequest = (service) => {
    alert(`Fitur "Ajukan ${service}" akan segera hadir!`);
  };

  return (
    <div>
      <h1>Layanan & Promosi</h1>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Tingkatkan visibilitas dan penampilan tokomu dengan layanan eksklusif
        dari kami.
      </p>

      <div className="promotions-grid">
        <div className="promo-card">
          <BannerIcon />
          <h3>Iklan Banner Utama</h3>
          <p>
            Tampilkan produkmu di slider utama halaman depan agar dilihat ribuan
            pengunjung setiap hari.
          </p>
          <button
            className="btn-promo"
            onClick={() => handleRequest("Iklan Banner")}
          >
            Pelajari Lebih Lanjut
          </button>
        </div>

        <div className="promo-card">
          <StarIcon />
          <h3>Sorot Produk (Highlight)</h3>
          <p>
            Jadikan produkmu pilihan utama yang akan tampil di bagian atas
            halaman kategori.
          </p>
          <button
            className="btn-promo"
            onClick={() => handleRequest("Sorot Produk")}
          >
            Pelajari Lebih Lanjut
          </button>
        </div>

        <div className="promo-card">
          <DesignIcon />
          <h3>Jasa Desain Logo Profesional</h3>
          <p>
            Tim kreatif kami siap membantumu membuat logo yang menarik dan tak
            terlupakan.
          </p>
          <button
            className="btn-promo"
            onClick={() => handleRequest("Desain Logo")}
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromotionsPage;
