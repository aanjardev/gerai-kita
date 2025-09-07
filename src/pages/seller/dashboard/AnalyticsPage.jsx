import React from "react";
import "./AnalyticsPage.css";

function AnalyticsPage() {
  return (
    <div>
      <h1>Analitik Toko</h1>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Pahami performa tokomu untuk mengambil keputusan yang lebih baik.
      </p>

      <div className="analytics-grid">
        <div className="stat-card">
          <h3>Pengunjung Toko (30 Hari)</h3>
          <p className="stat-number">1,250</p>
        </div>
        <div className="stat-card">
          <h3>Total Produk Dilihat</h3>
          <p className="stat-number">4,832</p>
        </div>
        <div className="stat-card">
          <h3>Klik Tombol WhatsApp</h3>
          <p className="stat-number">89</p>
        </div>
        <div className="stat-card">
          <h3>Produk Terlaris</h3>
          <p className="stat-number" style={{ fontSize: "18px" }}>
            Kue Putu Congkir
          </p>
        </div>

        <div className="chart-placeholder">
          <div>
            <h3>Grafik Pertumbuhan Pengunjung</h3>
            <p>(Fitur Grafik Akan Segera Hadir)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
