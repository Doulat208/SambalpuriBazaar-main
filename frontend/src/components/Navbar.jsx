import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // we store user JSON in localStorage
  const user = JSON.parse(localStorage.getItem("user")); 
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#f5f5f5",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
          Sambalpuri Bazaar
        </Link>
      </div>

      <div style={{ display: "flex", gap: "30px", fontSize: "18px" }}>
        <Link to="/men" style={{ textDecoration: "none", color: "black" }}>Men</Link>
        <Link to="/women" style={{ textDecoration: "none", color: "black" }}>Women</Link>
        <Link to="/kids" style={{ textDecoration: "none", color: "black" }}>Kids</Link>
        <Link to="/custom" style={{ textDecoration: "none", color: "black" }}>Custom</Link>

        {/* 🔥 Show Admin Panel ONLY if role is ADMIN */}
        {user?.role === "ADMIN" && (
          <Link to="/admin" style={{ textDecoration: "none", color: "black" }}>
            Admin Panel
          </Link>
        )}
      </div>

      <div>
        {!isLoggedIn ? (
          // 🔥 When NOT logged in → show Login + Signup
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>Login</Link>
            <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>Signup</Link>
          </div>
        ) : (
          // 🔥 When logged in → show Logout
          <button 
            onClick={handleLogout}
            style={{
              padding: "6px 15px",
              border: "1px solid black",
              background: "white",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
