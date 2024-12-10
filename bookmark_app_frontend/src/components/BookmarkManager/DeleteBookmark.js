import React from "react";

const DeleteBookmark = ({ bookmarks, deleteBookmark }) => {
  return (
    <div className="delete-container">
      <h2>Delete Bookmark</h2>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="delete-card">
          <h3>{bookmark.title}</h3>
          <button onClick={() => deleteBookmark(bookmark.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeleteBookmark;
