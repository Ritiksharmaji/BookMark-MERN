import React from "react";

const ReadBookmark = ({ bookmarks }) => {
  return (
    <div className="bookmark-list">
      <h2>All Bookmarks</h2>
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bookmark-card">
            <h3>{bookmark.title}</h3>
            <p>{bookmark.description}</p>
            <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
              Visit
            </a>
            <p>{bookmark.category}</p>
          </div>
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
};

export default ReadBookmark;
