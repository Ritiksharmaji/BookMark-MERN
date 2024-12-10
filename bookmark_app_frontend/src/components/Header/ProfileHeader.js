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
          {/* Link to Update a Bookmark */}
          <li>
            <Link to="/bookmark-update" className="nav-item update-link">
              Update Bookmark
            </Link>
          </li>
          {/* Link to Delete a Bookmark */}
          <li>
            <Link to="/bookmark-delete" className="nav-item delete-link">
              Delete Bookmark
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
