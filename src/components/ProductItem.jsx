import React from "react";
import "./ProductItem.css";

// Gambar placeholder jika produk belum punya gambar
const placeholderImg =
  "https://via.placeholder.com/300x200.png?text=Belum+Ada+Gambar";

function ProductItem({ product }) {
  // Format harga menjadi Rupiah
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="product-item-card">
      <img
        src={placeholderImg}
        alt={product.name}
        className="product-item-image"
      />
      <div className="product-item-info">
        <h3 className="product-item-name">{product.name}</h3>
        <p className="product-item-price">{formattedPrice}</p>
        <div className="product-item-actions">
          <button className="btn btn-edit">Edit</button>
          <button className="btn btn-delete">Hapus</button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
