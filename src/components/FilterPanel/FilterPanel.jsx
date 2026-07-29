// ===== FilterPanel Component =====
// A panel with filter controls for the Marketplace page.
// Allows filtering by: category, price range, condition, university, and sort order.
// Props:
//   - filters: current filter state object
//   - onFilterChange: callback called when any filter value changes
//   - onReset: callback to clear all filters

import { categories, conditions, universities } from "../../data/products";
import { FaFilter, FaTimes } from "react-icons/fa";
import "./FilterPanel.css";

function FilterPanel({ filters, onFilterChange, onReset }) {
  // Helper: update a single filter field
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="filterpanel">
      {/* Header with title and reset button */}
      <div className="filterpanel-header">
        <h3 className="filterpanel-title">
          <FaFilter /> Filters
        </h3>
        <button className="filterpanel-reset" onClick={onReset}>
          <FaTimes /> Clear All
        </button>
      </div>

      {/* Category filter */}
      <div className="filterpanel-group">
        <label className="filterpanel-label">Category</label>
        <select
          className="filterpanel-select"
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price range filter */}
      <div className="filterpanel-group">
        <label className="filterpanel-label">Price Range</label>
        <div className="filterpanel-price-row">
          <input
            type="number"
            className="filterpanel-input"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
          <span className="filterpanel-price-sep">—</span>
          <input
            type="number"
            className="filterpanel-input"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Condition filter */}
      <div className="filterpanel-group">
        <label className="filterpanel-label">Condition</label>
        <select
          className="filterpanel-select"
          value={filters.condition}
          onChange={(e) => handleChange("condition", e.target.value)}
        >
          <option value="">All Conditions</option>
          {conditions.map((cond) => (
            <option key={cond} value={cond}>{cond}</option>
          ))}
        </select>
      </div>

      {/* University filter */}
      <div className="filterpanel-group">
        <label className="filterpanel-label">University</label>
        <select
          className="filterpanel-select"
          value={filters.university}
          onChange={(e) => handleChange("university", e.target.value)}
        >
          <option value="">All Universities</option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>{uni}</option>
          ))}
        </select>
      </div>

      {/* Sort order filter */}
      <div className="filterpanel-group">
        <label className="filterpanel-label">Sort By</label>
        <select
          className="filterpanel-select"
          value={filters.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;