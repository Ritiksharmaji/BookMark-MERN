import React from 'react';
import './index.css';
import Header from '../Header/Header';


function About() {

    return ( <
        >

        <
        Header / >
        <
        div className = "about-container" >
        <
        div className = "about-header" >
        <
        h1 > About BookmarkApp < /h1> <
        p > Your ultimate solution
        for managing your bookmarks effectively and efficiently. < /p> < /
        div >

        <
        div className = "about-content" >
        <
        div className = "about-card" >
        <
        h2 > Our Mission < /h2> <
        p >
        BookmarkApp is designed to simplify your digital life by organizing and managing your important links,
        whether
        for personal or professional use. <
        /p> < /
        div >

        <
        div className = "about-card" >
        <
        h2 > Why Use BookmarkApp ? < /h2> <
        p >
        With BookmarkApp, you can keep all your valuable resources, websites, and links in one place.Stay productive and access your bookmarks anytime, anywhere. <
        /p> < /
        div >

        <
        div className = "about-card" >
        <
        h2 > Features < /h2> <
        ul >
        <
        li > Easy to add, edit, and delete bookmarks. < /li> <
        li > Customizable categories and notes
        for each bookmark. < /li> <
        li > Secure login and personalized dashboard. < /li> <
        li > Responsive design
        for mobile and desktop. < /li> < /
        ul > <
        /div> < /
        div > <
        /div> < / >

    );
}

export default About;