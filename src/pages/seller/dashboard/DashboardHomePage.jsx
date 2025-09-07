import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import "./Dashboard.css"; // Import CSS baru

function DashboardHomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [stats, setStats] = useState({ productCount: 0 });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        // Mengambil data secara paralel untuk efisiensi
        const [profileData, productCountData, recentProductsData] =
          await Promise.all([
            // 1. Ambil nama toko
            supabase
              .from("sellers")
              .select("store_name")
              .eq("id", session.user.id)
              .single(),
            // 2. Hitung jumlah produk
            supabase
              .from("products")
              .select("*", { count: "exact", head: true })
              .eq("seller_id", session.user.id),
            // 3. Ambil 3 produk terbaru (perlu tabel product_images untuk gambar)
            supabase
              .from("products")
              .select("id, name")
              .eq("seller_id", session.user.id)
              .order("created_at", { ascending: false })
              .limit(3),
          ]);

        if (profileData.data) {
          setStoreName(profileData.data.store_name);
        }
        if (productCountData.count !== null) {
          setStats((prevStats) => ({
            ...prevStats,
            productCount: productCountData.count,
          }));
        }
        if (recentProductsData.data) {
          setRecentProducts(recentProductsData.data);
        }
      } else if (sessionError) {
        console.error("Session error:", sessionError);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Memuat dashboard...</div>;
  }

  return (
    <div>
      <div className="dashboard-grid">
        {/* Kartu Sambutan */}
        <div className="dashboard-card dashboard-welcome">
          <h2 className="welcome-text">
            Selamat Datang, {storeName || "Penjual"}!
          </h2>
          <p>Ini adalah ringkasan performa tokomu hari ini.</p>
        </div>

        {/* Kartu Statistik */}
        <div className="dashboard-card stat-card">
          <h3>Jumlah Produk Aktif</h3>
          <p className="stat-number">{stats.productCount}</p>
        </div>

        <div className="dashboard-card stat-card">
          <h3>Status Akun</h3>
          <p
            className="stat-number"
            style={{ fontSize: "28px", color: "var(--primary-green)" }}
          >
            Gratis
          </p>
        </div>

        {/* Pintasan Cepat */}
        <div className="dashboard-card quick-actions">
          <Link to="/dashboard/produk/baru" className="action-button">
            + Tambah Produk Baru
          </Link>
          <Link to="/dashboard/profil" className="action-button">
            Kelola Profil Toko
          </Link>
          <Link to="/toko/saya" className="action-button">
            Lihat Toko Publik
          </Link>
        </div>

        {/* Produk Terbaru */}
        <div className="dashboard-card">
          <h3>Produk Terbaru</h3>
          {recentProducts.length > 0 ? (
            <ul className="recent-products-list">
              {recentProducts.map((product) => (
                <li key={product.id}>
                  {/* Ganti dengan gambar produk jika ada */}
                  <div
                    className="product-list-img"
                    style={{ backgroundColor: "#eee" }}
                  ></div>
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Kamu belum menambahkan produk.</p>
          )}
        </div>

        {/* Widget Promosi */}
        <div className="dashboard-card">
          <h3>Tingkatkan Penjualanmu!</h3>
          <p>
            Pasang iklan atau pesan desain logo profesional untuk menarik lebih
            banyak pelanggan.
          </p>
          <Link
            to="/dashboard/promosi"
            className="action-button"
            style={{ flexGrow: 0 }}
          >
            Lihat Layanan Promosi
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHomePage;
