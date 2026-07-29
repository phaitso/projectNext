// ===== CategoryCard Component =====
// Circular icon category card — minimal, clean.
// Props: category, icon, count

import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({ category, icon, count }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/marketplace?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="categorycard" onClick={handleClick}>
      <div className="categorycard-circle">
        {icon}
      </div>
      <span className="categorycard-name">{category}</span>
      {count !== undefined && (
        <span className="categorycard-count">{count} items</span>
      )}
    </div>
  );
}

export default CategoryCard;