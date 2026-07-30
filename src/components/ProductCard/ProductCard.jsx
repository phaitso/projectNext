// ===== ProductCard Component =====
// Editorial card: large image, clean typography, seller trust row.

import Link from "next/link";
import { FaHeart, FaMapMarkerAlt, FaStar, FaRegEye, FaUniversity, FaCheckCircle } from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import { getUserById } from "../../data/users";

function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useApp();
  const seller = getUserById(product.sellerId);
  const conditionClass = product.condition.toLowerCase().replace(/\s/g, "-");
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="pc">
      <div className="pc-img-wrap">
        <Link href={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} className="pc-img" loading="lazy" />
        </Link>
        {product.discount > 0 && (
          <span className="pc-discount">-{product.discount}%</span>
        )}
        {product.status !== "Available" && (
          <span className={`pc-status pc-status-${product.status.toLowerCase()}`}>
            {product.status}
          </span>
        )}
        <button
          className={`pc-heart ${inWishlist ? "active" : ""}`}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          aria-label="Toggle wishlist"
        >
          <FaHeart />
        </button>
        <Link href={`/product/${product.id}`} className="pc-quickview" aria-label="Quick view">
          <FaRegEye /> View Details
        </Link>
      </div>

      <div className="pc-body">
        <div className="pc-meta-top">
          <span className="pc-cat">{product.category}</span>
          <span className={`pc-condition pc-cond-${conditionClass}`}>{product.condition}</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="pc-name">{product.name}</h3>
        </Link>

        <div className="pc-rating">
          <FaStar className="pc-star" />
          <span className="pc-rating-num">{product.rating || "5.0"}</span>
          <span className="pc-rating-sep">·</span>
          <span className="pc-reviews">{product.reviewCount}</span>
        </div>

        <div className="pc-price-row">
          <span className="pc-price">${product.price}</span>
          {product.oldPrice && <span className="pc-oldprice">${product.oldPrice}</span>}
        </div>

        {seller && (
          <div className="pc-seller">
            <img src={seller.avatar} alt={seller.name} className="pc-seller-avatar" loading="lazy" />
            <div className="pc-seller-info">
              <span className="pc-seller-name">
                {seller.name}
                {seller.verified && <FaCheckCircle className="pc-seller-verified" />}
              </span>
              <span className="pc-seller-uni">
                <FaUniversity className="pc-seller-uni-icon" />
                {product.university}
              </span>
            </div>
          </div>
        )}

        <div className="pc-location">
          <FaMapMarkerAlt /> {product.location}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
