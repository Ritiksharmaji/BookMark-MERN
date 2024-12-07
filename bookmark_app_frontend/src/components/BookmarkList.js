

import React, { useState, useEffect } from "react";
import axios from "axios";

const BookmarkList = ({ selectedCategory }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Fetch bookmarks from the backend
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookmarks");
        setBookmarks(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };
    fetchBookmarks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark._id !== id));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const filteredBookmarks = selectedCategory
    ? bookmarks.filter((bookmark) => bookmark.category === selectedCategory)
    : bookmarks;

  return (
    <div>
      <h3>Bookmarks</h3>
      {filteredBookmarks.length > 0 ? (
        <ul>
          {filteredBookmarks.map((bookmark) => (
            <li key={bookmark._id}>
              <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
                {bookmark.title}
              </a>
              <p>{bookmark.description}</p>
              <button onClick={() => handleDelete(bookmark._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
};

export default BookmarkList;
