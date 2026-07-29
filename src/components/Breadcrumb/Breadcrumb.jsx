// ===== Breadcrumb Component =====
// Shows the navigation path (e.g., Home > Marketplace > Product Detail).
// Props:
//   - items: array of { label, to } objects. The last item is the current page.

import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import "./Breadcrumb.css";

function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          // The last item is the current page (not a link)
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="breadcrumb-item">
              {/* Show separator arrow before each item except the first */}
              {index > 0 && <FaChevronRight className="breadcrumb-separator" />}

              {isLast ? (
                // Current page: just text, no link
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                // Previous pages: clickable links
                <Link to={item.to} className="breadcrumb-link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;