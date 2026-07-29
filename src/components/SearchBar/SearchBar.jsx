// ===== SearchBar Component =====
// A reusable search input with an icon and optional search button.
// When the user types and presses Enter (or clicks Search), it navigates
// to the marketplace page with the search query as a URL parameter.
// Props:
//   - onSearch: optional callback function that receives the search term
//   - placeholder: custom placeholder text (default provided)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ onSearch, placeholder = "Search products, categories, universities..." }) {
  // State: the text the user types into the search field
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Handle form submission (Enter key or button click)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading
    if (onSearch) {
      // If a custom callback is provided, call it
      onSearch(query);
    } else {
      // Otherwise, navigate to the marketplace with the search query
      navigate(`/marketplace?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <FaSearch className="searchbar-icon" />
      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="searchbar-btn">Search</button>
    </form>
  );
}

export default SearchBar;