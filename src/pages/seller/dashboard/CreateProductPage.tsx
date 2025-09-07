import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import "../../seller/Auth.css"; // Kita pakai ulang style form

function CreateProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data kategori untuk dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 1. Insert data produk ke tabel 'products'
    const { data: productData, error: productError } = await supabase
      .from("products")
      .insert({
        name,
        description,
        price: Number(price),
        category_id: categoryId,
        seller_id: user.id,
      })
      .select()
      .single();

    if (productError) {
      alert("Error saat menyimpan produk: " + productError.message);
      setLoading(false);
      return;
    }

    // 2. Jika ada gambar, upload ke Storage dan simpan URL-nya
    if (images.length > 0) {
      const uploadPromises = Array.from(images).map(async (file, index) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}-${
          productData.id
        }-${Date.now()}-${index}.${fileExt}`;
        const filePath = `products/${fileName}`;

        await supabase.storage.from("store-assets").upload(filePath, file);
        const { data: publicURLData } = supabase.storage
          .from("store-assets")
          .getPublicUrl(filePath);

        return {
          product_id: productData.id,
          image_url: publicURLData.publicUrl,
          is_primary: index === 0, // Jadikan gambar pertama sebagai gambar utama
        };
      });

      const imageRecords = await Promise.all(uploadPromises);
      await supabase.from("product_images").insert(imageRecords);
    }

    alert("Produk berhasil ditambahkan!");
    navigate("/dashboard/produk");
    setLoading(false);
  };

  return (
    <div className="auth-container" style={{ maxWidth: "700px" }}>
      <h1 className="auth-header">Tambah Produk Baru</h1>
      <p className="auth-subheader">Isi detail produk yang ingin kamu jual.</p>

      <form
        onSubmit={handleSubmit}
        className="auth-form"
        style={{ textAlign: "left" }}
      >
        <label>Nama Produk</label>
        <input
          className="auth-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Deskripsi</label>
        <textarea
          className="auth-input"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Harga (Rp)</label>
        <input
          className="auth-input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Kategori</label>
        <select
          className="auth-input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="" disabled>
            Pilih Kategori
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label>Foto Produk (Maksimal 5)</label>
        <input
          className="auth-input"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
        />

        <button
          className="auth-button"
          type="submit"
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>
    </div>
  );
}

export default CreateProductPage;
