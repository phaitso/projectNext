// ===== App.jsx - Main App Component with Routing =====
// This component defines all the routes for the application.
// Each route maps a URL path to a specific page component.

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// ===== Layout Components =====
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// ===== Page Components =====
import Home from "./pages/Home/Home";
import Marketplace from "./pages/Marketplace/Marketplace";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import SellProduct from "./pages/SellProduct/SellProduct";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import MyProducts from "./pages/MyProducts/MyProducts";
import Wishlist from "./pages/Wishlist/Wishlist";
import Notifications from "./pages/Notifications/Notifications";
import Chat from "./pages/Chat/Chat";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Terms from "./pages/Terms/Terms";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import NotFound from "./pages/NotFound/NotFound";
import FAQ from "./pages/FAQ/FAQ";

import "./App.css";

// ScrollToTop: helper component that scrolls to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="app">
      {/* ScrollToTop runs on every navigation */}
      <ScrollToTop />

      {/* Navbar is sticky and visible on all pages */}
      <Navbar />

      {/* Main content area - page transitions happen here */}
      <main className="app-main">
        <Routes>
          {/* Home page - the landing page with hero, categories, featured products */}
          <Route path="/" element={<Home />} />

          {/* Marketplace - browse all products with filters */}
          <Route path="/marketplace" element={<Marketplace />} />

          {/* Product detail - view a single product by its ID */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Sell a new product - form to list an item */}
          <Route path="/sell" element={<SellProduct />} />

          {/* Authentication pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User profile pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />

          {/* User's own products - manage listings */}
          <Route path="/my-products" element={<MyProducts />} />

          {/* Wishlist - saved/favorited products */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Notifications - alerts and updates */}
          <Route path="/notifications" element={<Notifications />} />

          {/* Chat - messaging interface */}
          <Route path="/chat" element={<Chat />} />

          {/* Static info pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />

          {/* Admin dashboard - manage users and products */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* FAQ - help center */}
          <Route path="/faq" element={<FAQ />} />

          {/* 404 - catch all unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer is visible on all pages */}
      <Footer />
    </div>
  );
}

export default App;