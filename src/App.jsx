import { useState, useEffect } from "react";
import "./App.css";
// Import client supabase yang sudah kita buat
import { supabase } from "./supabaseClient";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Buat fungsi async untuk mengambil data
    async function getCategories() {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    }

    // Panggil fungsinya
    getCategories();
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat komponen dimuat

  return (
    <div className="App">
      <h1>Aplikasi Bazar UMKM</h1>
      <h2>Tes Koneksi ke Supabase:</h2>
      <h3>Daftar Kategori Produk:</h3>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <p>Memuat kategori atau belum ada data...</p>
      )}
    </div>
  );
}

export default App;
