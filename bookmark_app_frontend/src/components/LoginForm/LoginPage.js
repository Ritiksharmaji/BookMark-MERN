import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Header from "../Header/Header";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const BaseUrl = 'https://book-mark-mern.vercel.app/'
    const onSubmitSuccess = (jwtToken) => {
        Cookies.set("jwt_token", jwtToken, {
            expires: 30,
            // path: ["/", "/bookmark-add"] 
            path:'/',
           
             
        });
        console.log("JWT Token Set: ", jwtToken); // Add this for debugging
        navigate("/profile");
    };

    const onSubmitFailure = (error) => {
        setShowSubmitError(true);
        setErrorMsg(error);
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const userDetails = { email, password };
        const url = `${BaseUrl}api/auth/login`;
        // const url = "http://localhost:5000/api/auth/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(`data after login:`, data);

            if (response.ok) {
                onSubmitSuccess(data.token);
            } else {
                onSubmitFailure(data.error_msg || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setShowSubmitError(true);
            setErrorMsg("Something went wrong. Please try again later.");
        }
    };

    const renderUsernameField = () => (
        <div>
            <label className="input-label" htmlFor="username">
                USERNAME
            </label>
            <input
                type="email"
                id="username"
                className="username-input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
            />
            {email}
        </div>
    );

    const renderPasswordField = () => (
        <div>
            <label className="input-label" htmlFor="password">
                PASSWORD
            </label>
            <input
                type="password"
                id="password"
                className="password-input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {password}
        </div>
    );

    return (
        <>
            <Header />
            <div className="login-form-container">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    className="login-website-logo-mobile-image"
                    alt="website logo"
                />
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                    className="login-image hide-image-mobile"
                    alt="website login"
                />
                <form className="form-container" onSubmit={submitForm}>
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                        className="login-website-logo-desktop-image"
                        alt="website logo"
                    />
                    <div className="input-container">{renderUsernameField()}</div>
                    <div className="input-container">{renderPasswordField()}</div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                    {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                </form>
            </div>
        </>
    );
};

export default LoginForm;
