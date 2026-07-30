// ===== CategoryCard Component =====
// Circular icon category card — minimal, clean.
// Props: category, icon, count

import { useRouter } from "next/router";

function CategoryCard({ category, icon, count }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/marketplace?category=${encodeURIComponent(category)}`);
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
