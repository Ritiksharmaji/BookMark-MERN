import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginPage';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Dashboard';
import BookmarkForm from './components/BookmarkForm';
import NotFound from './components/NotFound/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import About from './components/About/About';
import Profile from './components/Profile/Profile';
import BookmarkManager from './components/BookmarkManager/BookmarkManager'

import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-book-list"
                    element={
                        <ProtectedRoute>
                            <BookmarkForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bookmark-list"
                    element={
                        <ProtectedRoute>
                            <BookmarkManager />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback for Invalid Routes */}
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
        </Router>
    );
};

export default App;
