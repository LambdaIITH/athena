import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./pages/auth/providers/AuthContext.tsx";
import { ThemeProvider } from "./layout/ThemeToggle/theme-provider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID_WEB}>
        <AuthProvider>
            <App />
            <Toaster />
        </AuthProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
