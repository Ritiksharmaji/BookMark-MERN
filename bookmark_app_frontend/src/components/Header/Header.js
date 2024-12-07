import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header() {
  return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/" className="logo">
          BookmarkApp
        </Link>
      </div>
      <nav className="nav-links">
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-item">Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-item">About</Link>
          </li>
          <li>
            <Link to="/login" className="nav-item login-btn">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
