// ===== Footer Component =====
// The footer appears at the bottom of every page.
// Contains: logo, quick links, contact info, social media icons, and copyright.

import Link from "next/link";
import { FaStore, FaFacebookF, FaInstagram, FaTelegram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ===== Column 1: Brand & Description ===== */}
        <div className="footer-section">
          <Link href="/" className="footer-logo">
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
            <li><Link href="/marketplace">Marketplace</Link></li>
            <li><Link href="/sell">Sell Product</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/chat">Chat</Link></li>
            <li><Link href="/my-products">My Products</Link></li>
          </ul>
        </div>

        {/* ===== Column 3: Information ===== */}
        <div className="footer-section">
          <h4 className="footer-title">Information</h4>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/faq">Help Center</Link></li>
            <li><Link href="/terms">Terms & Rules</Link></li>
            <li><Link href="/admin">Admin Dashboard</Link></li>
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
