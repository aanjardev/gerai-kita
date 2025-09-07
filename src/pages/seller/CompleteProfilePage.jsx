import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./Auth.css"; // Kita pakai style yang sama

function CompleteProfilePage() {
  const [storeName, setStoreName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!user) {
      alert("Anda harus login terlebih dahulu.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("sellers")
        .update({
          store_name: storeName,
          whatsapp_number: whatsappNumber,
          description: description,
          // Tambahkan field lain jika ada, seperti alamat
        })
        .eq("id", user.id); // Update profil milik user yang login

      if (error) throw error;

      alert("Profil berhasil disimpan!");
      navigate("/dashboard"); // Arahkan ke dashboard utama setelah profil lengkap
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: "600px" }}>
      <h1 className="auth-header">Lengkapi Profil Toko Anda</h1>
      <p className="auth-subheader">
        Satu langkah lagi untuk mulai berjualan. Informasi ini akan ditampilkan
        kepada pelanggan.
      </p>

      <form onSubmit={handleProfileUpdate} className="auth-form">
        <input
          className="auth-input"
          type="text"
          placeholder="Nama Toko / Gerai Anda"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="tel"
          placeholder="Nomor WhatsApp (Contoh: 628123456789)"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          required
        />
        <textarea
          className="auth-input"
          placeholder="Deskripsi singkat tentang toko Anda"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Profil & Lanjutkan"}
        </button>
      </form>
    </div>
  );
}

export default CompleteProfilePage;
