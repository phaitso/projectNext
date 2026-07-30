// ===== Product Detail Page =====
// Gallery + sticky info panel, rating, old price, related products, recently viewed.

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHeart, FaComment, FaShare, FaFlag, FaMapMarkerAlt, FaStar,
  FaCheckCircle, FaClock, FaTimesCircle, FaArrowLeft, FaEye,
  FaShieldAlt, FaArrowRight,
} from "react-icons/fa";
import Breadcrumb from "../../src/components/Breadcrumb/Breadcrumb";
import Modal from "../../src/components/Modal/Modal";
import ProductCard from "../../src/components/ProductCard/ProductCard";
import { getProductById, getRelatedProducts } from "../../src/data/products";
import { getUserById } from "../../src/data/users";
import { useApp } from "../../src/context/AppContext";

function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isInWishlist, toggleWishlist, addToRecentlyViewed, recentlyViewed } = useApp();

  const [selectedImage, setSelectedImage] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const product = id ? getProductById(id) : null;
  const seller = product ? getUserById(product.sellerId) : null;
  const relatedProducts = product ? getRelatedProducts(product.id, 5) : [];

  const recentlyViewedProducts = recentlyViewed
    .filter((rid) => rid !== id)
    .map((rid) => getProductById(rid))
    .filter(Boolean)
    .slice(0, 10);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
      setSelectedImage(0);
    }
  }, [id]);

  const handleReportSubmit = () => {
    if (!reportReason) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportOpen(false);
      setReportSubmitted(false);
      setReportReason("");
    }, 3000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (!router.isReady || !product) {
    return (
      <div className="productdetail page-fade">
        <div className="container">
          <div className="productdetail-notfound">
            <h2>Product not found</h2>
            <p>This product may have been removed or doesn't exist.</p>
            <Link href="/marketplace" className="productdetail-back-btn">
              <FaArrowLeft /> Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = {
    Available: { icon: <FaCheckCircle />, class: "available" },
    Reserved: { icon: <FaClock />, class: "reserved" },
    Sold: { icon: <FaTimesCircle />, class: "sold" },
  };
  const statusInfo = statusConfig[product.status];

  return (
    <div className="productdetail page-fade">
      <div className="container">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Marketplace", to: "/marketplace" },
            { label: product.name },
          ]}
        />

        {/* Main layout: gallery + sticky info */}
        <div className="productdetail-main">
          {/* ===== Left: Image Gallery ===== */}
          <div className="productdetail-gallery">
            <div className="productdetail-main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              <span className={`productdetail-status ${statusInfo.class}`}>
                {statusInfo.icon} {product.status}
              </span>
              {product.discount > 0 && (
                <span className="productdetail-discount">-{product.discount}%</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="productdetail-thumbnails">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`productdetail-thumb ${index === selectedImage ? "active" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`View ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== Right: Sticky Product Info ===== */}
          <div className="productdetail-info">
            <div className="productdetail-info-sticky">
              <span className="productdetail-category">{product.category}</span>
              <h1 className="productdetail-name">{product.name}</h1>

              {/* Rating */}
              <div className="productdetail-rating">
                <div className="productdetail-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating || 5) ? "filled" : ""} />
                  ))}
                </div>
                <span className="productdetail-rating-text">
                  {product.rating || "5.0"} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="productdetail-price-row">
                <span className="productdetail-price">${product.price}</span>
                {product.oldPrice && (
                  <span className="productdetail-oldprice">${product.oldPrice}</span>
                )}
                {product.discount > 0 && (
                  <span className="productdetail-discount-badge">{product.discount}% OFF</span>
                )}
              </div>

              {/* Quick info */}
              <div className="productdetail-quickinfo">
                <div className="productdetail-quickinfo-item">
                  <span className="productdetail-quickinfo-label">Condition</span>
                  <span className="productdetail-quickinfo-value">{product.condition}</span>
                </div>
                <div className="productdetail-quickinfo-item">
                  <span className="productdetail-quickinfo-label">Location</span>
                  <span className="productdetail-quickinfo-value">
                    <FaMapMarkerAlt /> {product.location}
                  </span>
                </div>
                <div className="productdetail-quickinfo-item">
                  <span className="productdetail-quickinfo-label">Views</span>
                  <span className="productdetail-quickinfo-value">
                    <FaEye /> {product.views}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="productdetail-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Actions */}
              <div className="productdetail-actions">
                <Link href="/chat" className="productdetail-btn-chat">
                  <FaComment /> Chat Seller
                </Link>
                <button
                  className={`productdetail-btn-wishlist ${isInWishlist(product.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <FaHeart /> {isInWishlist(product.id) ? "Saved" : "Save"}
                </button>
                <button className="productdetail-btn-share" onClick={handleShare}>
                  <FaShare /> Share
                </button>
                <button className="productdetail-btn-report" onClick={() => setReportOpen(true)}>
                  <FaFlag /> Report
                </button>
              </div>

              {/* Trust */}
              <div className="productdetail-trust">
                <FaShieldAlt /> Verified student seller • Safe campus meetup
              </div>
            </div>
          </div>
        </div>

        {/* ===== Seller Card ===== */}
        {seller && (
          <div className="productdetail-seller">
            <h3 className="productdetail-sec-title">Seller Information</h3>
            <div className="productdetail-seller-card">
              <img src={seller.avatar} alt={seller.name} className="productdetail-seller-avatar" />
              <div className="productdetail-seller-info">
                <div className="productdetail-seller-name-row">
                  <h4>{seller.name}</h4>
                  {seller.verified && (
                    <span className="productdetail-verified"><FaCheckCircle /> Verified</span>
                  )}
                </div>
                <p className="productdetail-seller-uni">{seller.university}</p>
                <div className="productdetail-seller-rating">
                  <div className="productdetail-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(seller.rating) ? "filled" : ""} />
                    ))}
                  </div>
                  <span>{seller.rating} / 5.0</span>
                </div>
                <div className="productdetail-seller-stats">
                  <span>{seller.productsListed} Listed</span>
                  <span>{seller.productsSold} Sold</span>
                  <span>{seller.productsBought} Bought</span>
                </div>
              </div>
              <Link href="/chat" className="productdetail-seller-contact">
                <FaComment /> Contact
              </Link>
            </div>
          </div>
        )}

        {/* ===== Product Reviews ===== */}
        <div className="productdetail-reviews">
          <h3 className="productdetail-sec-title">Product Reviews ({product.reviewCount})</h3>
          <div className="productdetail-reviews-list">
            {(product.reviews || []).map((review, index) => (
              <div key={index} className="productdetail-review">
                <div className="productdetail-review-header">
                  <strong>{review.name}</strong>
                  <div className="productdetail-stars">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} className="filled" />
                    ))}
                  </div>
                </div>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Related Products (horizontal scroll) ===== */}
        {relatedProducts.length > 0 && (
          <div className="productdetail-related">
            <div className="productdetail-sec-head">
              <h3 className="productdetail-sec-title">Related Products</h3>
              <Link href={`/marketplace?category=${encodeURIComponent(product.category)}`} className="productdetail-sec-link">
                View All <FaArrowRight />
              </Link>
            </div>
            <div className="hscroll">
              {relatedProducts.map((rp) => (
                <div key={rp.id} className="hscroll-item productdetail-hscroll-item">
                  <ProductCard product={rp} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Recently Viewed (horizontal scroll) ===== */}
        {recentlyViewedProducts.length > 0 && (
          <div className="productdetail-recently">
            <h3 className="productdetail-sec-title">Recently Viewed</h3>
            <div className="hscroll">
              {recentlyViewedProducts.map((rp) => (
                <div key={rp.id} className="hscroll-item productdetail-hscroll-item">
                  <ProductCard product={rp} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== Report Modal ===== */}
      <Modal
        isOpen={reportOpen}
        onClose={() => { setReportOpen(false); setReportSubmitted(false); setReportReason(""); }}
        title="Report Product"
      >
        {reportSubmitted ? (
          <div className="productdetail-report-success">
            <FaCheckCircle className="productdetail-report-success-icon" />
            <h3>Report Submitted</h3>
            <p>Thank you. Our admin team will review this report shortly.</p>
          </div>
        ) : (
          <div className="productdetail-report-form">
            <p className="productdetail-report-text">
              Why are you reporting this product? Please select a reason:
            </p>
            <div className="productdetail-report-reasons">
              {["Spam", "Scam", "Wrong Category", "Fake Item", "Other"].map((reason) => (
                <label key={reason} className="productdetail-report-reason">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            <button
              className="productdetail-report-submit"
              onClick={handleReportSubmit}
              disabled={!reportReason}
            >
              Submit Report
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProductDetail;
