import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import ProductItem from "../../../components/ProductItem"; // Komponen kartu produk
import toast from "react-hot-toast"; // Untuk notifikasi
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect untuk mengambil data produk saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Dapatkan sesi user yang sedang login
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // Ambil semua produk milik user ini beserta gambar utamanya
        const { data, error } = await supabase
          .from("products")
          .select(
            `
            id,
            name,
            price,
            product_images (
              image_url
            )
          `
          )
          .eq("seller_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching products:", error);
          toast.error("Gagal memuat produk.");
        } else {
          setProducts(data);
        }
      }
      setLoading(false);
    };

    fetchProducts();
  }, []); // Array kosong berarti efek ini hanya berjalan sekali

  // Fungsi untuk menangani penghapusan produk
  const handleDelete = async (productId) => {
    // Tampilkan dialog konfirmasi sebelum menghapus
    if (
      window.confirm(
        "Apakah kamu yakin ingin menghapus produk ini secara permanen?"
      )
    ) {
      try {
        // Hapus data dari Supabase
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", productId);
        if (error) throw error;

        // Update tampilan di frontend tanpa perlu refresh halaman
        setProducts((currentProducts) =>
          currentProducts.filter((p) => p.id !== productId)
        );
        toast.success("Produk berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Gagal menghapus produk: " + error.message);
      }
    }
  };

  if (loading) {
    return <div>Memuat produk...</div>;
  }

  return (
    <div className="products-page-container">
      <h1 className="products-header">Kelola Produk Saya</h1>

      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={handleDelete} // Kirim fungsi delete sebagai prop
            />
          ))}
        </div>
      ) : (
        <div className="no-products-message">
          <h3>Kamu Belum Punya Produk</h3>
          <p>
            Sepertinya tokomu masih kosong. Yuk, tambahkan produk pertamamu!
          </p>
          <Link
            to="/dashboard/produk/baru"
            className="action-button"
            style={{ marginTop: "20px" }}
          >
            + Tambah Produk
          </Link>
        </div>
      )}

      {/* Tombol Tambah Produk yang Melayang */}
      <Link
        to="/dashboard/produk/baru"
        className="fab"
        title="Tambah Produk Baru"
      >
        +
      </Link>
    </div>
  );
}

export default ProductsPage;
