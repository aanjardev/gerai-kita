import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import ProductItem from "../../../components/ProductItem"; // Komponen untuk satu item produk
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);

        // Ambil semua produk milik user ini
        const { data, error } = await supabase
          .from("products")
          .select("*") // Anda bisa tambahkan join ke product_images di sini nanti
          .eq("seller_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching products:", error);
        } else {
          setProducts(data);
        }
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Memuat produk...</div>;
  }

  return (
    <div className="products-page-container">
      <h1 className="products-header">Kelola Produk Saya</h1>

      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products-message">
          <p>Kamu belum memiliki produk.</p>
          <p>
            Klik tombol `+` di pojok kanan bawah untuk menambah produk
            pertamamu!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <Link to="/dashboard/produk/baru" className="fab">
        +
      </Link>
    </div>
  );
}

export default ProductsPage;
