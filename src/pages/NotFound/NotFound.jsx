import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound page-fade">
      <div className="notfound-inner">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page not found</h1>
        <p className="notfound-text">
          The page you're looking for may have been moved, sold, or never listed.
          Let's get you back to browsing.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="notfound-btn-primary">
            <FaHome /> Back to Home
          </Link>
          <Link to="/marketplace" className="notfound-btn-secondary">
            <FaSearch /> Browse Marketplace
          </Link>
        </div>
        <Link to="/" className="notfound-back">
          <FaArrowLeft /> Return to safety
        </Link>
      </div>
    </div>
  );
}

export default NotFound;