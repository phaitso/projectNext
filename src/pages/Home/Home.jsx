// ===== Home Page =====
// Marketplace homepage — no hero. Pure browsing experience.
// Quick search → Categories → Trending → Deals strip → Recommended
// → Books → Electronics → Recently Posted → Safety tips → Stats → Footer

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook, FaLaptop, FaMobileAlt, FaTabletAlt, FaCalculator, FaPencilAlt,
  FaPenNib, FaShoppingBag, FaTshirt, FaBolt, FaChair, FaGem,
  FaPrint, FaDesktop, FaKeyboard, FaMouse, FaHeadphones, FaEllipsisH,
  FaSearch, FaArrowRight, FaShieldAlt, FaUsers, FaBoxOpen, FaStar,
  FaTag, FaFireAlt, FaClock, FaGraduationCap,
} from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { useApp } from "../../context/AppContext";
import { getProductById } from "../../data/products";
import {
  getFeaturedProducts, getLatestProducts, products, categories,
  getProductsByCategory, getProductsByCategories,
} from "../../data/products";
import "./Home.css";

function Home() {
  const { recentlyViewed } = useApp();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/marketplace?search=${encodeURIComponent(query)}`);
    else navigate("/marketplace");
  };

  const trending = getFeaturedProducts().slice(0, 10);
  const latest = getLatestProducts().slice(0, 5);
  const books = getProductsByCategory("Books", 10);
  const electronics = getProductsByCategories(["Laptop", "Phone", "Tablet", "Headphone", "Monitor"], 10);
  const deals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 5);

  const recentlyViewedProducts = recentlyViewed
    .map((id) => getProductById(id))
    .filter(Boolean)
    .slice(0, 10);

  const categoryIcons = {
    Books: <FaBook />, Laptop: <FaLaptop />, Phone: <FaMobileAlt />,
    Tablet: <FaTabletAlt />, Calculator: <FaCalculator />, Notebook: <FaPencilAlt />,
    Stationery: <FaPenNib />, Bag: <FaShoppingBag />, Uniform: <FaTshirt />,
    Electronics: <FaBolt />, Furniture: <FaChair />, Accessories: <FaGem />,
    Printer: <FaPrint />, Monitor: <FaDesktop />, Keyboard: <FaKeyboard />,
    Mouse: <FaMouse />, Headphone: <FaHeadphones />, Other: <FaEllipsisH />,
  };

  const getCategoryCount = (cat) => products.filter((p) => p.category === cat).length;

  const stats = [
    { icon: <FaBoxOpen />, value: `${products.length}+`, label: "Active Listings" },
    { icon: <FaUsers />, value: "1,200+", label: "Verified Students" },
    { icon: <FaGraduationCap />, value: "5", label: "Universities" },
    { icon: <FaStar />, value: "4.8", label: "Avg Rating" },
  ];

  const safetyTips = [
    { title: "Meet on Campus", desc: "Always meet in public university areas during daylight hours." },
    { title: "Verify Student ID", desc: "Check the seller's verified badge before making any payment." },
    { title: "Use In-App Chat", desc: "Keep all communication within the platform for your safety." },
  ];

  return (
    <div className="home page-fade">
      {/* ===== Quick Search Bar ===== */}
      <section className="home-search-section">
        <div className="container">
          <form className="home-search-bar" onSubmit={handleSearch}>
            <FaSearch className="home-search-icon" />
            <input
              type="text"
              placeholder="Search for textbooks, laptops, calculators..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="home-search-btn">Search</button>
          </form>
          <div className="home-search-cats">
            <span>Popular:</span>
            {categories.slice(0, 5).map((cat) => (
              <button key={cat} onClick={() => navigate(`/marketplace?category=${encodeURIComponent(cat)}`)}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="home-section">
        <div className="container">
          <div className="home-sec-head">
            <div>
              <h2 className="section-title">Browse Categories</h2>
              <p className="section-subtitle">{categories.length} categories to explore</p>
            </div>
            <Link to="/marketplace" className="home-link">All Products <FaArrowRight /></Link>
          </div>
          <div className="home-cat-scroll">
            {categories.map((cat) => (
              <CategoryCard key={cat} category={cat} icon={categoryIcons[cat]} count={getCategoryCount(cat)} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Trending (horizontal scroll) ===== */}
      <section className="home-section home-section-muted">
        <div className="container">
          <div className="home-sec-head">
            <div>
              <h2 className="section-title"><FaFireAlt className="home-sec-icon" /> Trending Now</h2>
              <p className="section-subtitle">Most viewed items this week</p>
            </div>
            <Link to="/marketplace" className="home-link">View All <FaArrowRight /></Link>
          </div>
          <div className="hscroll home-hscroll">
            {trending.map((product) => (
              <div key={product.id} className="hscroll-item home-hscroll-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Student Deals (grid) ===== */}
      <section className="home-section">
        <div className="container">
          <div className="home-sec-head">
            <div>
              <h2 className="section-title"><FaTag className="home-sec-icon" /> Student Deals</h2>
              <p className="section-subtitle">Highest discounts across all categories</p>
            </div>
            <Link to="/marketplace" className="home-link">View All <FaArrowRight /></Link>
          </div>
          <div className="home-prod-grid">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Books (horizontal scroll) ===== */}
      <section className="home-section home-section-muted">
        <div className="container">
          <div className="home-sec-head">
            <div>
              <h2 className="section-title">Books & Textbooks</h2>
              <p className="section-subtitle">Save on course materials</p>
            </div>
            <Link to="/marketplace?category=Books" className="home-link">View All <FaArrowRight /></Link>
          </div>
          <div className="hscroll home-hscroll">
            {books.map((product) => (
              <div key={product.id} className="hscroll-item home-hscroll-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Electronics (grid) ===== */}
      <section className="home-section">
        <div className="container">
          <div className="home-sec-head">
            <div>
              <h2 className="section-title">Electronics</h2>
              <p className="section-subtitle">Laptops, phones, tablets and more</p>
            </div>
            <Link to="/marketplace?category=Laptop" className="home-link">View All <FaArrowRight /></Link>
          </div>
          <div className="home-prod-grid">
            {electronics.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Recently Posted (grid) ===== */}
      <section className="home-section home-section-muted">
        <div className="container">
          <div className="home-sec-head">
            <div>
              <h2 className="section-title"><FaClock className="home-sec-icon" /> Recently Posted</h2>
              <p className="section-subtitle">Newest additions to the marketplace</p>
            </div>
            <Link to="/marketplace?sort=newest" className="home-link">View All <FaArrowRight /></Link>
          </div>
          <div className="home-prod-grid">
            {latest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Recently Viewed ===== */}
      {recentlyViewedProducts.length > 0 && (
        <section className="home-section">
          <div className="container">
            <div className="home-sec-head">
              <div>
                <h2 className="section-title">Recently Viewed</h2>
                <p className="section-subtitle">Pick up where you left off</p>
              </div>
            </div>
            <div className="hscroll home-hscroll">
              {recentlyViewedProducts.map((product) => (
                <div key={product.id} className="hscroll-item home-hscroll-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Safety Tips ===== */}
      <section className="home-section home-section-muted">
        <div className="container">
          <div className="home-sec-head">
            <div>
              <h2 className="section-title"><FaShieldAlt className="home-sec-icon" /> Safety Tips</h2>
              <p className="section-subtitle">Trade safely on campus</p>
            </div>
          </div>
          <div className="home-safety">
            {safetyTips.map((tip, i) => (
              <div key={i} className="home-safety-card">
                <div className="home-safety-num">{i + 1}</div>
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="home-stats">
        <div className="container">
          <div className="home-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="home-stat">
                <span className="home-stat-icon">{stat.icon}</span>
                <span className="home-stat-value">{stat.value}</span>
                <span className="home-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;