import React, { useState } from 'react';
import BookmarkForm from './BookmarkForm';
import BookmarkList from './BookmarkForm';

const Dashboard = () => {
  const [showBookmarkForm, setShowBookmarkForm] = useState(false); // Manage visibility of BookmarkForm

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const createBookList = () => {
    setShowBookmarkForm(true); // Show the BookmarkForm
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={createBookList}>Create Booklist</button>
      <button onClick={handleLogout}>Logout</button>

      {/* Conditionally render BookmarkForm */}
      {showBookmarkForm && <BookmarkForm />}
    </div>
  );
};

export default Dashboard;
