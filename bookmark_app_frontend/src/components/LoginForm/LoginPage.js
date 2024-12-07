import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

import Header from "../Header/Header";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const onSubmitSuccess = (jwtToken) => {
        Cookies.set("jwt_token", jwtToken, {
            expires: 30,
            path: "/",
        });
        navigate("/");
    };

    const onSubmitFailure = (error) => {
        setShowSubmitError(true);
        setErrorMsg(error);
    };

    const submitForm = async(event) => {
        event.preventDefault();
        const userDetails = { username, password };
        const url = "https://apis.ccbp.in/login";
        const options = {
            method: "POST",
            body: JSON.stringify(userDetails),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                onSubmitSuccess(data.jwt_token);
            } else {
                onSubmitFailure(data.error_msg);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setShowSubmitError(true);
            setErrorMsg("Something went wrong. Please try again later.");
        }
    };

    const renderUsernameField = () => ( <
        >
        <
        label className = "input-label"
        htmlFor = "username" >
        USERNAME <
        /label> <
        input type = "text"
        id = "username"
        className = "username-input-field"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value)
        }
        placeholder = "Username" /
        >
        <
        />
    );

    const renderPasswordField = () => ( <
        >
        <
        label className = "input-label"
        htmlFor = "password" >
        PASSWORD <
        /label> <
        input type = "password"
        id = "password"
        className = "password-input-field"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        placeholder = "Password" /
        >
        <
        />
    );

    // const jwtToken = Cookies.get("jwt_token");
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />;
    // }

    return ( <
        >

        <
        Header / >
        <
        div className = "login-form-container" >
        <
        img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className = "login-website-logo-mobile-image"
        alt = "website logo" /
        >
        <
        img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className = "login-image hide-image-mobile"
        alt = "website login" /
        >
        <
        form className = "form-container"
        onSubmit = { submitForm } >
        <
        img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className = "login-website-logo-desktop-image"
        alt = "website logo" /
        >
        <
        div className = "input-container" > { renderUsernameField() } < /div> <
        div className = "input-container" > { renderPasswordField() } < /div> <
        button type = "submit"
        className = "login-button" >
        Login <
        /button> {
        showSubmitError && < p className = "error-message" > * { errorMsg } < /p>} < /
        form > <
        /div> < / >
    );
};

export default LoginForm;