import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the new CSS file
import Header from '../Header/Header';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const payload = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed!');
            }

            setSuccess(true);
            alert(data.message); // Show success message
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="registration-container">
                <h2 className="registration-title">Create an Account</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Registration successful! Redirecting...</p>}
                <form onSubmit={handleRegistration} className="registration-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                </form>
                <p className="redirect-link">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </>
    );
};

export default Registration;
