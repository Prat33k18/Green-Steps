
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import GlassNavigation from "@/components/GlassNavigation";
import Dashboard from "./Dashboard";
import AccountSettings from "./AccountSettings";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();
  
  // Check for system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
    }
  }, []);
  
  // Apply theme change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  
  // Handle auth success
  const handleAuthSuccess = (user: { name: string; email: string }) => {
    setIsAuthenticated(true);
    setUserData(user);
    navigate("/", { replace: true });
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData({ name: "", email: "" });
  };
  
  // Effect to handle navigation
  useEffect(() => {
    const path = window.location.pathname;
    
    if (path.includes("account")) {
      setCurrentPage("account");
    } else {
      setCurrentPage("dashboard");
    }
  }, [navigate]);
  
  // If not authenticated, show auth form
  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 transition-colors duration-300">
      <GlassNavigation 
        userData={userData} 
        theme={theme}
        setTheme={setTheme}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "account" && <AccountSettings userData={userData} />}
      </main>
    </div>
  );
};

export default Index;
