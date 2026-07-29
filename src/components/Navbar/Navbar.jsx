// ===== Navbar Component =====
// Floating glassmorphism navigation with search, notification dropdown, profile dropdown.

import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars, FaTimes, FaBell, FaUser, FaSignOutAlt, FaStore,
  FaSearch, FaHeart, FaComment, FaChevronDown, FaTag,
  FaCheck, FaCheckDouble,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import { notifications as dummyNotifications } from "../../data/notifications";
import { categories } from "../../data/products";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifs, setNotifs] = useState(dummyNotifications);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const { currentUser, logout, wishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifs.filter((n) => !n.read).length;
  const wishlistCount = wishlist.length;

  useEffect(() => {
    setProfileOpen(false);
    setMenuOpen(false);
    setCatOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case "message": return <FaComment />;
      case "favorite": return <FaHeart />;
      case "sold": return <FaCheck />;
      case "report": return <FaTag />;
      default: return <FaBell />;
    }
  };

  const formatNotifTime = (timeStr) => {
    const date = new Date(timeStr);
    const now = new Date();
    const diffH = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffH >= 24) return `${Math.floor(diffH / 24)}d`;
    if (diffH > 0) return `${diffH}h`;
    return "now";
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/marketplace", label: "Browse" },
    { to: "/sell", label: "Sell" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className={`nb ${scrolled ? "scrolled" : ""}`}>
      <div className="nb-bar">
        <div className="nb-inner">
          {/* Logo */}
          <Link to="/" className="nb-logo" aria-label="StudentMarket home">
            <FaStore className="nb-logo-icon" />
            <span className="nb-logo-text">StudentMarket</span>
          </Link>

          {/* Nav links */}
          <nav className="nb-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => isActive ? "nb-nav-link active" : "nb-nav-link"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <form className="nb-search" onSubmit={handleSearch} role="search">
            <FaSearch className="nb-search-icon" />
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nb-search-input"
              aria-label="Search products"
            />
          </form>

          {/* Right actions */}
          <div className="nb-right">
            {/* Categories trigger */}
            <button
              className="nb-cat-btn"
              onClick={() => setCatOpen(!catOpen)}
              aria-expanded={catOpen}
              aria-label="Browse categories"
            >
              <FaTag /> <span className="nb-hide-sm">Categories</span>
              <FaChevronDown className={`nb-cat-chevron ${catOpen ? "open" : ""}`} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="nb-icon-btn" aria-label={`Wishlist, ${wishlistCount} items`}>
              <FaHeart />
              {wishlistCount > 0 && <span className="nb-badge">{wishlistCount}</span>}
            </Link>

            {/* Notifications dropdown */}
            <div className="nb-notif" ref={notifRef}>
              <button
                className="nb-icon-btn"
                onClick={() => setNotifOpen(!notifOpen)}
                aria-expanded={notifOpen}
                aria-label={`Notifications, ${unreadCount} unread`}
              >
                <FaBell />
                {unreadCount > 0 && <span className="nb-badge">{unreadCount}</span>}
              </button>
              {notifOpen && (
                <div className="nb-notif-dropdown" role="menu">
                  <div className="nb-notif-header">
                    <span className="nb-notif-title">Notifications</span>
                    {unreadCount > 0 && (
                      <button className="nb-notif-mark" onClick={markAllRead}>
                        <FaCheckDouble /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="nb-notif-list">
                    {notifs.slice(0, 5).map((n) => (
                      <Link
                        to="/notifications"
                        key={n.id}
                        className={`nb-notif-item ${!n.read ? "unread" : ""}`}
                        onClick={() => setNotifOpen(false)}
                      >
                        <span className={`nb-notif-icon nb-notif-icon-${n.type}`}>
                          {getNotifIcon(n.type)}
                        </span>
                        <span className="nb-notif-body">
                          <span className="nb-notif-text">{n.text}</span>
                          <span className="nb-notif-time">{formatNotifTime(n.time)}</span>
                        </span>
                        {!n.read && <span className="nb-notif-dot" />}
                      </Link>
                    ))}
                  </div>
                  <Link to="/notifications" className="nb-notif-viewall" onClick={() => setNotifOpen(false)}>
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Chat */}
            <Link to="/chat" className="nb-icon-btn nb-hide-sm" aria-label="Chat">
              <FaComment />
            </Link>

            {/* Profile */}
            {currentUser ? (
              <div className="nb-profile" ref={profileRef}>
                <button
                  className="nb-profile-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-expanded={profileOpen}
                  aria-label="Profile menu"
                >
                  <img src={currentUser.avatar} alt={currentUser.name} className="nb-avatar" />
                  <FaChevronDown className={`nb-chevron ${profileOpen ? "open" : ""}`} />
                </button>
                {profileOpen && (
                  <div className="nb-dropdown" role="menu">
                    <div className="nb-dropdown-header">
                      <img src={currentUser.avatar} alt="" className="nb-dropdown-avatar" />
                      <div className="nb-dropdown-id">
                        <p className="nb-dropdown-name">{currentUser.name}</p>
                        <p className="nb-dropdown-email">{currentUser.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" className="nb-dropdown-item"><FaUser /> My Profile</Link>
                    <Link to="/my-products" className="nb-dropdown-item"><FaStore /> My Products</Link>
                    <Link to="/wishlist" className="nb-dropdown-item"><FaHeart /> Wishlist</Link>
                    <button className="nb-dropdown-item nb-dropdown-logout" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nb-login-btn">Sign In</Link>
            )}

            <button
              className="nb-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Category slide-down panel */}
      {catOpen && (
        <div className="nb-cat-panel" onMouseLeave={() => setCatOpen(false)}>
          <div className="nb-cat-panel-inner">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/marketplace?category=${encodeURIComponent(cat)}`}
                className="nb-cat-item"
                onClick={() => setCatOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nb-mobile-menu">
          <form className="nb-mobile-search" onSubmit={handleSearch}>
            <FaSearch className="nb-mobile-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
          </form>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => isActive ? "nb-mobile-link active" : "nb-mobile-link"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/wishlist" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Wishlist</Link>
          <Link to="/chat" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Chat</Link>
          <Link to="/notifications" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Notifications</Link>
          <Link to="/contact" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/faq" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Help Center</Link>
          <Link to="/admin" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Admin</Link>
          {!currentUser && (
            <Link to="/login" className="nb-mobile-link nb-mobile-signin" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;