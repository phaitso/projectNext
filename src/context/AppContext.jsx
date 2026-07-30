// ===== AppContext - Global State Management =====
// This file creates a React Context that manages global state using React Hooks.
// It handles: user authentication (login/register/logout), wishlist, and recently viewed products.
// All data is persisted in LocalStorage so it survives page reloads.

import { createContext, useState, useEffect, useContext } from "react";
import { users as dummyUsers } from "../data/users";

// Create a Context object - this allows us to share state across components
// without having to pass props manually at every level.
const AppContext = createContext();

// Custom hook: useApp() - any component can call this to access the global state
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// AppProvider component - wraps the entire app so all components can access the context
export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState(dummyUsers);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on the client side only (avoids SSR crash)
  useEffect(() => {
    const savedUser = localStorage.getItem("sm_currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedWishlist = localStorage.getItem("sm_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const savedRecent = localStorage.getItem("sm_recentlyViewed");
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));

    const savedUsers = localStorage.getItem("sm_users");
    if (savedUsers) setRegisteredUsers(JSON.parse(savedUsers));

    setHydrated(true);
  }, []);

  // ===== useEffect: Persist state to LocalStorage whenever it changes =====
  // These effects run automatically whenever the state values change.
  // This is how we keep LocalStorage in sync with React state.

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("sm_currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("sm_currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("sm_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("sm_recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("sm_users", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // ===== Auth Functions =====

  // Login: check if email and password match a registered user
  const login = (email, password) => {
    // In a real app, you'd verify with a backend. Here we just check LocalStorage.
    const user = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: "Invalid email or password" };
  };

  // Register: create a new user and add to registered users
  const register = (userData) => {
    // Check if email already exists
    const exists = registeredUsers.find((u) => u.email === userData.email);
    if (exists) {
      return { success: false, message: "Email already registered" };
    }
    // Create new user object with default values
    const newUser = {
      ...userData,
      id: `u${Date.now()}`,
      rating: 5.0,
      productsListed: 0,
      productsSold: 0,
      productsBought: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      verified: true,
    };
    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Logout: clear the current user
  const logout = () => {
    setCurrentUser(null);
  };

  // Update profile: modify current user's data
  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    // Also update in registered users list
    setRegisteredUsers(
      registeredUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  // ===== Wishlist Functions =====

  // Toggle a product in/out of wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId) => wishlist.includes(productId);

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((id) => id !== productId));
  };

  // ===== Recently Viewed Functions =====

  // Add a product to recently viewed (most recent first, max 10, no duplicates)
  const addToRecentlyViewed = (productId) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  // ===== Value object: everything that gets shared with components =====
  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    wishlist,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    recentlyViewed,
    addToRecentlyViewed,
    registeredUsers,
    hydrated,
  };

  // Return the Provider with the value and render children inside
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;