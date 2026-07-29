// ===== Footer Component =====
// The footer appears at the bottom of every page.
// Contains: logo, quick links, contact info, social media icons, and copyright.

import { Link } from "react-router-dom";
import { FaStore, FaFacebookF, FaInstagram, FaTelegram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  // Get current year for the copyright text
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ===== Column 1: Brand & Description ===== */}
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <FaStore className="footer-logo-icon" />
            <span>Student<span className="footer-logo-accent">Market</span></span>
          </Link>
          <p className="footer-description">
            A safe marketplace for university students to buy and sell
            school supplies and second-hand products. Verified students only.
          </p>
          {/* Social media icons */}
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="footer-social-link" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="footer-social-link" aria-label="Telegram"><FaTelegram /></a>
          </div>
        </div>

        {/* ===== Column 2: Quick Links ===== */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/sell">Sell Product</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/my-products">My Products</Link></li>
          </ul>
        </div>

        {/* ===== Column 3: Information ===== */}
        <div className="footer-section">
          <h4 className="footer-title">Information</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">Help Center</Link></li>
            <li><Link to="/terms">Terms & Rules</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* ===== Column 4: Contact Info ===== */}
        <div className="footer-section">
          <h4 className="footer-title">Contact Us</h4>
          <ul className="footer-contact">
            <li><FaMapMarkerAlt /> Phnom Penh, Cambodia</li>
            <li><FaPhone /> +855 12 345 678</li>
            <li><FaEnvelope /> info@studentmarket.edu.kh</li>
          </ul>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Student Marketplace. All rights reserved. Built for students, by students.</p>
      </div>
    </footer>
  );
}

export default Footer;