// ===== Admin Dashboard =====
// SaaS-style admin panel: overview, analytics, tables, management tabs.

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaBox, FaFlag, FaShoppingBag, FaDollarSign,
  FaEye, FaTrash, FaBan, FaChartBar, FaClock, FaTachometerAlt,
  FaStore, FaBell, FaChevronRight, FaCheckCircle, FaTimesCircle,
  FaExclamationTriangle, FaArrowUp, FaArrowDown,
} from "react-icons/fa";
import { users } from "../../data/users";
import { products, categories } from "../../data/products";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Modal from "../../components/Modal/Modal";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [reportedProducts, setReportedProducts] = useState([
    { id: "r1", productId: "p7", reason: "Fake Item", reporter: "Sok Pisey", date: "2024-07-09", status: "Pending" },
    { id: "r2", productId: "p5", reason: "Wrong Category", reporter: "Chan Dara", date: "2024-07-08", status: "Pending" },
    { id: "r3", productId: "p17", reason: "Spam", reporter: "Ly Hour", date: "2024-07-07", status: "Reviewed" },
    { id: "r4", productId: "p21", reason: "Scam", reporter: "Kim Sreypich", date: "2024-07-06", status: "Pending" },
    { id: "r5", productId: "p29", reason: "Other", reporter: "Nget Visal", date: "2024-07-05", status: "Resolved" },
  ]);
  const [viewProduct, setViewProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const stats = [
    { icon: <FaUsers />, label: "Total Users", value: users.length, delta: "+2 this week", up: true, color: "primary" },
    { icon: <FaBox />, label: "Total Listings", value: products.length, delta: "+5 this week", up: true, color: "success" },
    { icon: <FaStore />, label: "Active Listings", value: products.filter(p => p.status === "Available").length, delta: "-1 today", up: false, color: "info" },
    { icon: <FaFlag />, label: "Pending Reports", value: reportedProducts.filter(r => r.status === "Pending").length, delta: "Needs review", up: false, color: "warning" },
    { icon: <FaShoppingBag />, label: "Sales", value: products.filter(p => p.status === "Sold").length, delta: "+3 this week", up: true, color: "primary" },
    { icon: <FaDollarSign />, label: "Commission", value: "$62.25", delta: "+$15 this week", up: true, color: "error" },
  ];

  const recentActivity = [
    { action: "New user registered", user: "Heng Mengly", time: "2h ago", icon: <FaUsers />, color: "primary" },
    { action: "Product sold", user: "Sok Pisey", time: "5h ago", icon: <FaShoppingBag />, color: "success" },
    { action: "New product listed", user: "Chan Dara", time: "8h ago", icon: <FaBox />, color: "info" },
    { action: "Report submitted", user: "Kim Sreypich", time: "1d ago", icon: <FaFlag />, color: "warning" },
    { action: "User suspended", user: "Unknown", time: "2d ago", icon: <FaBan />, color: "error" },
  ];

  // Chart data (CSS bars)
  const monthlySales = [
    { m: "Jan", v: 45 }, { m: "Feb", v: 62 }, { m: "Mar", v: 58 },
    { m: "Apr", v: 71 }, { m: "May", v: 89 }, { m: "Jun", v: 76 },
    { m: "Jul", v: 94 },
  ];
  const newUsers = [
    { m: "Jan", v: 12 }, { m: "Feb", v: 18 }, { m: "Mar", v: 15 },
    { m: "Apr", v: 22 }, { m: "May", v: 28 }, { m: "Jun", v: 24 },
    { m: "Jul", v: 31 },
  ];
  const maxSales = Math.max(...monthlySales.map(d => d.v));
  const maxUsers = Math.max(...newUsers.map(d => d.v));

  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
  })).sort((a, b) => b.count - a.count).slice(0, 8);
  const maxCat = Math.max(...categoryCounts.map(c => c.count));

  const recentProducts = products.slice(0, 6);
  const recentUsers = users.slice(0, 5);

  const sidebarItems = [
    { key: "overview", label: "Dashboard", icon: <FaTachometerAlt /> },
    { key: "products", label: "Products", icon: <FaBox /> },
    { key: "users", label: "Users", icon: <FaUsers /> },
    { key: "reports", label: "Reports", icon: <FaFlag /> },
    { key: "analytics", label: "Analytics", icon: <FaChartBar /> },
  ];

  const handleDelete = () => {
    setReportedProducts(reportedProducts.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const getProduct = (id) => products.find(p => p.id === id);

  return (
    <div className="admin page-fade">
      <div className="admin-shell">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <FaChartBar className="admin-sidebar-logo" />
            <span>Admin Panel</span>
          </div>
          <nav className="admin-sidebar-nav">
            {sidebarItems.map(item => (
              <button
                key={item.key}
                className={`admin-sidebar-link ${activeSection === item.key ? "active" : ""}`}
                onClick={() => setActiveSection(item.key)}
              >
                <span className="admin-sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.key === "reports" && reportedProducts.filter(r => r.status === "Pending").length > 0 && (
                  <span className="admin-sidebar-badge">
                    {reportedProducts.filter(r => r.status === "Pending").length}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <Link to="/" className="admin-sidebar-back">
            <FaChevronRight /> Back to Marketplace
          </Link>
        </aside>

        {/* Main */}
        <main className="admin-main">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Admin" }]} />

          <div className="admin-header">
            <div>
              <h1 className="admin-title">Admin Dashboard</h1>
              <p className="admin-subtitle">Manage users, products, and reports across the marketplace.</p>
            </div>
            <span className="admin-live">
              <span className="admin-live-dot" /> Live data
            </span>
          </div>

          {/* Overview */}
          {activeSection === "overview" && (
            <>
              <div className="admin-stats">
                {stats.map((stat, i) => (
                  <div key={i} className={`admin-stat-card admin-stat-${stat.color}`}>
                    <div className="admin-stat-icon">{stat.icon}</div>
                    <div className="admin-stat-info">
                      <span className="admin-stat-value">{stat.value}</span>
                      <span className="admin-stat-label">{stat.label}</span>
                      <span className={`admin-stat-delta ${stat.up ? "up" : "down"}`}>
                        {stat.up ? <FaArrowUp /> : <FaArrowDown />} {stat.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-charts">
                <div className="admin-chart-card">
                  <div className="admin-chart-head">
                    <h3>Monthly Sales</h3>
                    <span className="admin-chart-trend up"><FaArrowUp /> +18% vs last month</span>
                  </div>
                  <div className="admin-chart-bars">
                    {monthlySales.map((d, i) => (
                      <div key={i} className="admin-chart-bar" style={{ height: `${(d.v / maxSales) * 100}%` }}>
                        <span className="admin-chart-value">{d.v}</span>
                        <span className="admin-chart-label">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-chart-card">
                  <div className="admin-chart-head">
                    <h3>New Users</h3>
                    <span className="admin-chart-trend up"><FaArrowUp /> +29% vs last month</span>
                  </div>
                  <div className="admin-chart-bars admin-chart-bars-line">
                    {newUsers.map((d, i) => (
                      <div key={i} className="admin-chart-bar-line" style={{ height: `${(d.v / maxUsers) * 100}%` }}>
                        <span className="admin-chart-value">{d.v}</span>
                        <span className="admin-chart-label">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="admin-layout">
                <div className="admin-activity">
                  <h2 className="admin-section-title"><FaClock /> Recent Activity</h2>
                  <div className="admin-activity-list">
                    {recentActivity.map((a, i) => (
                      <div key={i} className="admin-activity-item">
                        <span className={`admin-activity-icon admin-activity-${a.color}`}>{a.icon}</span>
                        <div className="admin-activity-content">
                          <p className="admin-activity-action">{a.action}</p>
                          <span className="admin-activity-meta">{a.user} • {a.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-activity">
                  <h2 className="admin-section-title"><FaChartBar /> Top Categories</h2>
                  <div className="admin-cat-bars">
                    {categoryCounts.map((c, i) => (
                      <div key={i} className="admin-cat-bar">
                        <span className="admin-cat-name">{c.name}</span>
                        <div className="admin-cat-track">
                          <div className="admin-cat-fill" style={{ width: `${(c.count / maxCat) * 100}%` }} />
                        </div>
                        <span className="admin-cat-count">{c.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products */}
          {activeSection === "products" && (
            <div className="admin-table-card">
              <h2 className="admin-section-title"><FaBox /> Recent Products</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th><th>Price</th><th>Category</th><th>Condition</th><th>Status</th><th>Views</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="admin-table-product">
                            <img src={p.images[0]} alt={p.name} />
                            <span>{p.name}</span>
                          </div>
                        </td>
                        <td>${p.price}</td>
                        <td>{p.category}</td>
                        <td>{p.condition}</td>
                        <td><span className={`admin-status admin-status-${p.status.toLowerCase()}`}>{p.status}</span></td>
                        <td>{p.views}</td>
                        <td>
                          <div className="admin-table-actions">
                            <button className="admin-action-btn view" onClick={() => setViewProduct(p)} title="View"><FaEye /></button>
                            <button className="admin-action-btn delete" title="Delete"><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users */}
          {activeSection === "users" && (
            <div className="admin-table-card">
              <h2 className="admin-section-title"><FaUsers /> Recent Users</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>User</th><th>Student ID</th><th>University</th><th>Rating</th><th>Sold</th><th>Joined</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="admin-table-product">
                            <img src={u.avatar} alt={u.name} />
                            <span>{u.name}</span>
                          </div>
                        </td>
                        <td>{u.studentId}</td>
                        <td className="admin-uni-cell">{u.university}</td>
                        <td>{u.rating}</td>
                        <td>{u.productsSold}</td>
                        <td>{u.joinedDate}</td>
                        <td>
                          <div className="admin-table-actions">
                            <button className="admin-action-btn view" title="View"><FaEye /></button>
                            <button className="admin-action-btn suspend" title="Suspend"><FaBan /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports */}
          {activeSection === "reports" && (
            <div className="admin-table-card">
              <h2 className="admin-section-title"><FaFlag /> Reported Products</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>Product</th><th>Reason</th><th>Reporter</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {reportedProducts.length === 0 ? (
                      <tr><td colSpan={6} className="admin-empty-row">
                        <FaCheckCircle className="admin-empty-icon" />
                        <span>All reports resolved. Great work!</span>
                      </td></tr>
                    ) : (
                      reportedProducts.map(r => {
                        const p = getProduct(r.productId);
                        return (
                          <tr key={r.id}>
                            <td>
                              {p ? (
                                <div className="admin-table-product">
                                  <img src={p.images[0]} alt={p.name} />
                                  <span>{p.name}</span>
                                </div>
                              ) : <span>Unknown</span>}
                            </td>
                            <td><span className="admin-reason-badge">{r.reason}</span></td>
                            <td>{r.reporter}</td>
                            <td>{r.date}</td>
                            <td><span className={`admin-status admin-status-${r.status.toLowerCase()}`}>{r.status}</span></td>
                            <td>
                              <div className="admin-table-actions">
                                <button className="admin-action-btn view" onClick={() => setViewProduct(p)} title="View"><FaEye /></button>
                                <button className="admin-action-btn delete" onClick={() => setDeleteTarget(r)} title="Delete"><FaTrash /></button>
                                <button className="admin-action-btn suspend" title="Suspend User"><FaBan /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeSection === "analytics" && (
            <>
              <div className="admin-charts">
                <div className="admin-chart-card">
                  <div className="admin-chart-head"><h3>Monthly Sales</h3></div>
                  <div className="admin-chart-bars">
                    {monthlySales.map((d, i) => (
                      <div key={i} className="admin-chart-bar" style={{ height: `${(d.v / maxSales) * 100}%` }}>
                        <span className="admin-chart-value">{d.v}</span>
                        <span className="admin-chart-label">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="admin-chart-card">
                  <div className="admin-chart-head"><h3>New Users</h3></div>
                  <div className="admin-chart-bars admin-chart-bars-line">
                    {newUsers.map((d, i) => (
                      <div key={i} className="admin-chart-bar-line" style={{ height: `${(d.v / maxUsers) * 100}%` }}>
                        <span className="admin-chart-value">{d.v}</span>
                        <span className="admin-chart-label">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-table-card">
                <h2 className="admin-section-title"><FaChartBar /> Product Categories</h2>
                <div className="admin-cat-bars">
                  {categoryCounts.map((c, i) => (
                    <div key={i} className="admin-cat-bar">
                      <span className="admin-cat-name">{c.name}</span>
                      <div className="admin-cat-track">
                        <div className="admin-cat-fill" style={{ width: `${(c.count / maxCat) * 100}%` }} />
                      </div>
                      <span className="admin-cat-count">{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* View Product Modal */}
      <Modal isOpen={!!viewProduct} onClose={() => setViewProduct(null)} title="Product Details">
        {viewProduct && (
          <div className="admin-view-product">
            <img src={viewProduct.images[0]} alt={viewProduct.name} className="admin-view-image" />
            <h3>{viewProduct.name}</h3>
            <p className="admin-view-price">${viewProduct.price}</p>
            <p className="admin-view-desc">{viewProduct.description}</p>
            <div className="admin-view-meta">
              <span>Category: {viewProduct.category}</span>
              <span>Condition: {viewProduct.condition}</span>
              <span>Status: {viewProduct.status}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Report">
        <div className="admin-delete-confirm">
          <p>Are you sure you want to delete this report? This action cannot be undone.</p>
          <div className="admin-delete-actions">
            <button className="admin-delete-confirm-btn" onClick={handleDelete}>Yes, Delete</button>
            <button className="admin-delete-cancel-btn" onClick={() => setDeleteTarget(null)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminDashboard;