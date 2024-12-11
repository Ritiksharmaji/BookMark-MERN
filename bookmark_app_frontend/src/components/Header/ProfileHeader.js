import React, { useState } from "react";
import Cookies from "js-cookie";
import "./ProfileHeader.css";
import { Link, useLocation } from "react-router-dom";

const ProfileHeader = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get current location

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


           {/* Conditionally render Home or Profile link */}
           {location.pathname === "/profile" ? (
            <li>
            <p className="nav-item welcome-message">
              Welcome, {user?.username || "User"}!
            </p>
          </li>
          ) : null}

          {/* Conditionally render Home or Profile link */}
          {location.pathname === "/profile" ? (
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/profile" className="nav-item">
                Profile
              </Link>
            </li>
          )}

          {/* Link to View All Bookmarks */}
          <li>
            <Link to="/bookmarks" className="nav-item bookmark-link">
              View Bookmarks
            </Link>
          </li>

          {/* Link to Add a New Bookmark */}
          <li>
            <Link to="/bookmark-add" className="nav-item add-link">
              Add Bookmark
            </Link>
          </li>

          {/* Logout Button */}
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
