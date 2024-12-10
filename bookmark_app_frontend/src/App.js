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
import BookmarkManager from './components/BookmarkManager/BookmarkManager';
import AddBookmark from './components/BookmarkManager/AddBookmark';
import UpdateBookmark from './components/BookmarkManager/UpdateBookmark';
import DeleteBookmark from './components/BookmarkManager/DeleteBookmark';
import DashboardLayout from './components/Layout/DashboardLayout';

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
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark-add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddBookmark />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark-list"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <BookmarkManager />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark-update"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <UpdateBookmark />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark-delete"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DeleteBookmark />
              </DashboardLayout>
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
