import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppProvider } from "../src/context/AppContext";
import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";

import "../src/index.css";
import "../src/App.css";

import "../src/components/Breadcrumb/Breadcrumb.css";
import "../src/components/CategoryCard/CategoryCard.css";
import "../src/components/ChatPreview/ChatPreview.css";
import "../src/components/FilterPanel/FilterPanel.css";
import "../src/components/Footer/Footer.css";
import "../src/components/Hero/Hero.css";
import "../src/components/LoadingSpinner/LoadingSpinner.css";
import "../src/components/Modal/Modal.css";
import "../src/components/Navbar/Navbar.css";
import "../src/components/NotificationBell/NotificationBell.css";
import "../src/components/Pagination/Pagination.css";
import "../src/components/ProductCard/ProductCard.css";
import "../src/components/SearchBar/SearchBar.css";
import "../src/components/Sidebar/Sidebar.css";

import "../src/pages/About/About.css";
import "../src/pages/AdminDashboard/AdminDashboard.css";
import "../src/pages/Chat/Chat.css";
import "../src/pages/Contact/Contact.css";
import "../src/pages/EditProfile/EditProfile.css";
import "../src/pages/FAQ/FAQ.css";
import "../src/pages/Home/Home.css";
import "../src/pages/Login/Login.css";
import "../src/pages/Marketplace/Marketplace.css";
import "../src/pages/MyProducts/MyProducts.css";
import "../src/pages/NotFound/NotFound.css";
import "../src/pages/Notifications/Notifications.css";
import "../src/pages/ProductDetail/ProductDetail.css";
import "../src/pages/Profile/Profile.css";
import "../src/pages/Register/Register.css";
import "../src/pages/SellProduct/SellProduct.css";
import "../src/pages/Terms/Terms.css";
import "../src/pages/Wishlist/Wishlist.css";

function ScrollToTop() {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => window.scrollTo(0, 0);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);
  return null;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
