// ParentComponent.js
import React, { useState } from "react";
import BookmarkForm from "./BookmarkForm";

const ParentComponent = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmarkAdded = (newBookmark) => {
    setBookmarks([...bookmarks, newBookmark]); // Add the new bookmark to the state
  };

  return (
    <div>
      <h1>My Bookmarks</h1>
      <BookmarkForm onBookmarkAdded={handleBookmarkAdded} />
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index}>{bookmark.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;
