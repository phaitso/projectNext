// ===== Marketplace Page =====
// Modern browsing: filter chips, floating sort, premium grid.

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaSlidersH, FaTimes, FaSort, FaChevronDown } from "react-icons/fa";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { products, categories, conditions, universities } from "../../data/products";
import "./Marketplace.css";

function Marketplace() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: "",
    maxPrice: "",
    condition: "",
    university: "",
    sort: searchParams.get("sort") || "newest",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  // Brief skeleton feedback so filtering doesn't feel like an instant swap —
  // pure presentation, doesn't touch the filtering logic below.
  const [isRefreshing, setIsRefreshing] = useState(false);

  const productsPerPage = 12;

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      sort: searchParams.get("sort") || "newest",
    }));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.university.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
      );
    }
    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.condition) result = result.filter((p) => p.condition === filters.condition);
    if (filters.university) result = result.filter((p) => p.university === filters.university);

    switch (filters.sort) {
      case "newest": result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case "oldest": result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      default: break;
    }
    return result;
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  useEffect(() => { setCurrentPage(1); }, [filters]);

  useEffect(() => {
    setIsRefreshing(true);
    const t = setTimeout(() => setIsRefreshing(false), 300);
    return () => clearTimeout(t);
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleReset = () => {
    setFilters({ search: "", category: "", minPrice: "", maxPrice: "", condition: "", university: "", sort: "newest" });
  };

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];
  const currentSortLabel = sortOptions.find((s) => s.value === filters.sort)?.label || "Sort";

  const activeChips = [];
  if (filters.category) activeChips.push({ key: "category", label: filters.category });
  if (filters.condition) activeChips.push({ key: "condition", label: filters.condition });
  if (filters.university) activeChips.push({ key: "university", label: filters.university });
  if (filters.minPrice) activeChips.push({ key: "minPrice", label: `Min $${filters.minPrice}` });
  if (filters.maxPrice) activeChips.push({ key: "maxPrice", label: `Max $${filters.maxPrice}` });

  return (
    <div className="marketplace page-fade">
      <div className="marketplace-container">
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Marketplace" }]} />

        <div className="marketplace-header">
          <h1 className="marketplace-title">Marketplace</h1>
          <p className="marketplace-subtitle">{filteredProducts.length} products from verified students</p>
        </div>

        {/* Search */}
        <div className="marketplace-search">
          <SearchBar
            onSearch={(query) => setFilters({ ...filters, search: query })}
            placeholder="Search by product name, category, university..."
          />
        </div>

        {/* Filter chips row */}
        <div className="marketplace-chips">
          <button className="marketplace-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <FaSlidersH /> Filters
          </button>
          <div className="marketplace-chip-scroll">
            <button
              className={`marketplace-chip ${!filters.category ? "active" : ""}`}
              onClick={() => updateFilter("category", "")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`marketplace-chip ${filters.category === cat ? "active" : ""}`}
                onClick={() => updateFilter("category", cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Sort dropdown */}
          <div className="marketplace-sort-wrap">
            <button className="marketplace-sort-btn" onClick={() => setSortOpen(!sortOpen)}>
              <FaSort /> {currentSortLabel} <FaChevronDown className={`marketplace-sort-chevron ${sortOpen ? "open" : ""}`} />
            </button>
            {sortOpen && (
              <div className="marketplace-sort-menu">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`marketplace-sort-option ${filters.sort === opt.value ? "active" : ""}`}
                    onClick={() => { updateFilter("sort", opt.value); setSortOpen(false); }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="marketplace-active-chips">
            {activeChips.map((chip) => (
              <button key={chip.key} className="marketplace-active-chip" onClick={() => updateFilter(chip.key, "")}>
                {chip.label} <FaTimes />
              </button>
            ))}
            <button className="marketplace-clear-all" onClick={handleReset}>Clear All</button>
          </div>
        )}

        {/* Filter panel (collapsible) */}
        {showFilters && (
          <div className="marketplace-filter-panel">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Grid */}
        {isRefreshing ? (
          <div className="marketplace-grid" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="pc-skel" key={i}>
                <div className="skeleton pc-skel-img" />
                <div className="pc-skel-body">
                  <div className="skeleton pc-skel-line" style={{ width: "35%" }} />
                  <div className="skeleton pc-skel-line" style={{ width: "80%" }} />
                  <div className="skeleton pc-skel-line" style={{ width: "45%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : currentProducts.length > 0 ? (
          <div className="marketplace-grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="marketplace-empty">
            <FaSearch className="marketplace-empty-icon" />
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms.</p>
            <button className="marketplace-empty-btn" onClick={handleReset}>Clear Filters</button>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Marketplace;