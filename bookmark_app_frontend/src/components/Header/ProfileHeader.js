import React, { useState } from "react";
import Cookies from "js-cookie";
import "./ProfileHeader.css";
import { Link } from "react-router-dom";

const ProfileHeader = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("jwt_token"); // Clear the token
    window.location.href = "/login"; // Redirect to login page
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header-container">
      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/" className="logo">
          BookmarkApp
        </Link>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li>
            <p className="nav-item welcome-message">
              Welcome, {user?.username || "User"}!
            </p>
          </li>
          <li>
            <Link to="/bookmark-list" className="nav-item bookmark-link">
              BookmarkApp
            </Link>
          </li>
          <li>
            <button className="nav-item logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ProfileHeader;
