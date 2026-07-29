// ===== main.jsx - Application Entry Point =====
// This is the first file that runs when the app loads in the browser.
// It wraps the App in the AppProvider (for global state) and BrowserRouter (for routing).

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./index.css";

// Render the app into the #root div in index.html
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter enables client-side routing (no page reloads) */}
    <BrowserRouter>
      {/* AppProvider gives all components access to global state via Context */}
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);