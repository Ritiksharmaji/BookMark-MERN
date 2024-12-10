import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
// import { isCookie } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Retrieve the token from cookies
  const token = Cookies.get("jwt_token");

  const handleLogout = () => {
    Cookies.remove("jwt_token"); // Clear the token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/" className="logo">
          BookmarkApp
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {/* Hamburger icon */}
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-item">
              About
            </Link>
          </li>
          <li>
          {token ? (
              <Link to="/profile" className="nav-item login-btn">
                Profile
              </Link>
            ) : null}
           
          </li>
          <li>
          {token ? (
              <button className="nav-item logout-btn" onClick={handleLogout}>
              Logout
            </button>
            ) : (
              <Link to="/login" className="nav-item login-btn">
                Login
              </Link>
            )}
           
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
