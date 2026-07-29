// ===== My Products Page =====
// Shows the current user's products organized in tabs:
// Selling (Available), Sold, Reserved, and Draft.
// Each product has Edit, Delete, and View buttons.

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit, FaTrash, FaEye, FaStore, FaPlus,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import { products as allProducts, getProductById } from "../../data/products";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Modal from "../../components/Modal/Modal";
import "./MyProducts.css";

function MyProducts() {
  const { currentUser } = useApp();

  // State: which tab is active
  const [activeTab, setActiveTab] = useState("selling");
  // State: product to delete (for confirmation modal)
  const [deleteTarget, setDeleteTarget] = useState(null);

  // If not logged in, show prompt
  if (!currentUser) {
    return (
      <div className="myproducts page-fade">
        <div className="myproducts-container">
          <div className="myproducts-not-logged-in">
            <h2>Please log in to view your products</h2>
            <Link to="/login" className="myproducts-login-btn">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  // Get the current user's products from dummy data
  // In a real app, this would come from the backend
  const myProducts = allProducts.filter((p) => p.sellerId === currentUser.id);

  // Filter products by the active tab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case "selling":
        return myProducts.filter((p) => p.status === "Available");
      case "sold":
        return myProducts.filter((p) => p.status === "Sold");
      case "reserved":
        return myProducts.filter((p) => p.status === "Reserved");
      case "draft":
        return []; // No drafts in dummy data
      default:
        return myProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  // Tab configuration
  const tabs = [
    { key: "selling", label: "Selling", count: myProducts.filter((p) => p.status === "Available").length },
    { key: "sold", label: "Sold", count: myProducts.filter((p) => p.status === "Sold").length },
    { key: "reserved", label: "Reserved", count: myProducts.filter((p) => p.status === "Reserved").length },
    { key: "draft", label: "Draft", count: 0 },
  ];

  return (
    <div className="myproducts page-fade">
      <div className="myproducts-container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "My Products" },
          ]}
        />

        {/* Header */}
        <div className="myproducts-header">
          <div>
            <h1 className="myproducts-title">My Products</h1>
            <p className="myproducts-subtitle">Manage your listings</p>
          </div>
          <Link to="/sell" className="myproducts-add-btn">
            <FaPlus /> Sell New Product
          </Link>
        </div>

        {/* Tabs */}
        <div className="myproducts-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`myproducts-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              <span className="myproducts-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Products list or empty state */}
        {filteredProducts.length > 0 ? (
          <div className="myproducts-list">
            {filteredProducts.map((product) => (
              <div key={product.id} className="myproducts-item">
                {/* Product image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="myproducts-item-image"
                />
                {/* Product info */}
                <div className="myproducts-item-info">
                  <h3 className="myproducts-item-name">{product.name}</h3>
                  <p className="myproducts-item-price">${product.price}</p>
                  <div className="myproducts-item-meta">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span>{product.condition}</span>
                    <span>•</span>
                    <span className={`myproducts-item-status myproducts-status-${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="myproducts-item-actions">
                  <Link to={`/product/${product.id}`} className="myproducts-action-btn view">
                    <FaEye /> View
                  </Link>
                  <button className="myproducts-action-btn edit">
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="myproducts-action-btn delete"
                    onClick={() => setDeleteTarget(product)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="myproducts-empty">
            <FaStore className="myproducts-empty-icon" />
            <h3>No products here</h3>
            <p>You don't have any products in this category yet.</p>
            <Link to="/sell" className="myproducts-empty-btn">
              <FaPlus /> Sell a Product
            </Link>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Product?"
      >
        <div className="myproducts-delete-confirm">
          <p>Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.</p>
          <div className="myproducts-delete-actions">
            <button
              className="myproducts-delete-confirm-btn"
              onClick={() => setDeleteTarget(null)}
            >
              Yes, Delete
            </button>
            <button
              className="myproducts-delete-cancel-btn"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MyProducts;