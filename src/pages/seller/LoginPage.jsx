import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./Auth.css";

// SVG untuk ikon mata (lebih baik dari emoji atau gambar eksternal)
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="password-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="password-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243"
    />
  </svg>
);

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

      if (authError) throw authError;

      // Jika login berhasil, ambil data profil dari tabel 'sellers'
      const { data: profileData, error: profileError } = await supabase
        .from("sellers")
        .select("store_name")
        .eq("id", authData.user.id)
        .single(); // .single() untuk mengambil satu baris data

      if (profileError) throw profileError;

      // Cek apakah nama toko masih default atau tidak
      if (profileData && profileData.store_name === "Toko Baru") {
        // Jika ya, arahkan ke halaman melengkapi profil
        navigate("/melengkapi-profil");
      } else {
        // Jika tidak, arahkan ke dashboard utama
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-header">Login Khusus Penjual</h1>
      <p className="auth-subheader">
        Selamat datang kembali! Silakan masuk untuk mengelola gerai Anda.
      </p>

      <form onSubmit={handleLogin} className="auth-form">
        <input
          className="auth-input"
          type="email"
          placeholder="Alamat Email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-wrapper">
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>

        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? "Memuat..." : "Login"}
        </button>
      </form>

      <p className="auth-footer-text">
        Belum punya akun?{" "}
        <Link to="/register" className="auth-link">
          Daftar sebagai Penjual di sini
        </Link>
      </p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/" className="auth-link">
          « Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
