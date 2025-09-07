import React from "react";
import { Link } from "react-router-dom"; // Untuk tombol Edit nanti
import "./ProductItem.css";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.033C6.91 2.75 6 3.664 6 4.834v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);


// Gambar placeholder jika produk belum punya gambar
const placeholderImg = "https://via.placeholder.com/300x200.png?text=GeraiKita";

// Ganti seluruh fungsi ProductItem dengan yang ini
function ProductItem({ product, onDelete }) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price);

  const imageUrl = (product.product_images && product.product_images.length > 0)
    ? product.product_images[0].image_url
    : "https://via.placeholder.com/150?text=GeraiKita"; // Placeholder disesuaikan

  return (
    <div className="product-item-card">
      <img
        src={imageUrl}
        alt={product.name}
        className="product-item-image"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=Error"; }}
      />
      
      <div className="product-item-info">
        <div className="product-item-details">
          <h3 className="product-item-name">{product.name}</h3>
          <p className="product-item-price">{formattedPrice}</p>
        </div>

        <div className="product-item-actions">
          {/* Tombol Edit menggunakan Link dan ikon */}
          <Link to={`/dashboard/produk/edit/${product.id}`} className="icon-btn btn-edit" title="Edit Produk">
            <EditIcon />
          </Link>
          
          {/* Tombol Hapus menggunakan button dan ikon */}
          <button className="icon-btn btn-delete" onClick={() => onDelete(product.id)} title="Hapus Produk">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
