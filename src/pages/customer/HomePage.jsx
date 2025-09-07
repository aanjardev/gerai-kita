import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function HomePage() {
  const [nearbySellers, setNearbySellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findNearbySellers = () => {
      // 1. Minta izin lokasi dari browser
      if (!navigator.geolocation) {
        setError("Browser Anda tidak mendukung Geolocation.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // 2. Panggil fungsi 'nearby_sellers' dari Supabase
          try {
            const { data, error: rpcError } = await supabase.rpc(
              "nearby_sellers",
              {
                lat: latitude,
                long: longitude,
                radius_km: 10, // Mencari dalam radius 10 KM
              }
            );

            if (rpcError) throw rpcError;

            setNearbySellers(data);
          } catch (e) {
            setError(e.message);
          } finally {
            setLoading(false);
          }
        },
        (locationError) => {
          // Handle jika user menolak izin lokasi
          setError(
            "Gagal mendapatkan lokasi. Pastikan Anda mengizinkan akses lokasi."
          );
          setLoading(false);
        }
      );
    };

    findNearbySellers();
  }, []);

  if (loading) return <p>Mencari UMKM di sekitar Anda...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>UMKM Terdekat di Sekitar Anda</h1>
      {nearbySellers.length > 0 ? (
        <ul>
          {nearbySellers.map((seller) => (
            <li key={seller.id}>
              <h2>{seller.store_name}</h2>
              <p>Jarak: {seller.distance_km.toFixed(2)} km</p>
              <img src={seller.logo_url} alt={seller.store_name} width="100" />
              <p>{seller.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ditemukan UMKM dalam radius 10 KM dari lokasi Anda.</p>
      )}
    </div>
  );
}

export default HomePage;
