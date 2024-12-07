import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return ( <
        header className = "header-container" >
        <
        div className = "logo-container" >
        <
        Link to = "/"
        className = "logo" >
        BookmarkApp <
        /Link> < /
        div > <
        div className = "menu-icon"
        onClick = { toggleMenu } > { /* Hamburger icon */ } <
        span className = "menu-bar" > < /span> <
        span className = "menu-bar" > < /span> <
        span className = "menu-bar" > < /span> < /
        div > <
        nav className = { `nav-links ${menuOpen ? "open" : ""}` } >
        <
        ul className = "nav-list" >
        <
        li >
        <
        Link to = "/"
        className = "nav-item" >
        Home <
        /Link> < /
        li > <
        li >
        <
        Link to = "/about"
        className = "nav-item" >
        About <
        /Link> < /
        li > <
        li >
        <
        Link to = "/login"
        className = "nav-item login-btn" >
        Login <
        /Link> < /
        li > <
        /ul> < /
        nav > <
        /header>
    );
}

export default Header;