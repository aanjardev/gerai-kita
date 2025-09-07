import React from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams(); // Untuk mengambil ID produk dari URL

  return (
    <div>
      <h1>Halaman Detail Produk</h1>
      <p>Menampilkan detail untuk produk dengan ID: {id}</p>
    </div>
  );
}

export default ProductDetailPage;
