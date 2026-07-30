// ===== Wishlist Page =====
// Shows products the user has saved to their wishlist (stored in LocalStorage).
// Each product can be removed from the wishlist or viewed in detail.

import Link from "next/link";
import { FaHeart, FaTrash, FaEye } from "react-icons/fa";
import { useApp } from "../src/context/AppContext";
import { getProductById } from "../src/data/products";
import { getUserById } from "../src/data/users";
import Breadcrumb from "../src/components/Breadcrumb/Breadcrumb";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useApp();

  const wishlistProducts = wishlist
    .map((id) => getProductById(id))
    .filter((p) => p !== null);

  return (
    <div className="wishlist page-fade">
      <div className="wishlist-container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Wishlist" },
          ]}
        />

        {/* Header */}
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">
            {wishlistProducts.length} saved {wishlistProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Products grid or empty state */}
        {wishlistProducts.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistProducts.map((product) => {
              const seller = getUserById(product.sellerId);
              return (
                <div key={product.id} className="wishlist-card">
                  {/* Image */}
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="wishlist-card-image"
                    />
                  </Link>

                  {/* Info */}
                  <div className="wishlist-card-body">
                    <span className="wishlist-card-category">{product.category}</span>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="wishlist-card-name">{product.name}</h3>
                    </Link>
                    <p className="wishlist-card-price">${product.price}</p>
                    <div className="wishlist-card-meta">
                      <span>{product.condition}</span>
                      <span>•</span>
                      <span>{product.university}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="wishlist-card-actions">
                    <Link href={`/product/${product.id}`} className="wishlist-card-view-btn">
                      <FaEye /> View
                    </Link>
                    <button
                      className="wishlist-card-remove-btn"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="wishlist-empty">
            <FaHeart className="wishlist-empty-icon" />
            <h3>Your wishlist is empty</h3>
            <p>Save products you're interested in by clicking the heart icon.</p>
            <Link href="/marketplace" className="wishlist-empty-btn">
              Browse Marketplace
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
