import React, { useState } from "react";
import AddBookmark from "./AddBookmark";
import UpdateBookmark from "./UpdateBookmark";
import ReadBookmark from "./ReadBookmark";
import DeleteBookmark from "./DeleteBookmark";
import ProfileHeader from "../Header/ProfileHeader";
import "./BookmarkManager.css";

const BookmarkManager = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [activeForm, setActiveForm] = useState("read");

  const addBookmark = (bookmark) => {
    setBookmarks([...bookmarks, { ...bookmark, id: Date.now().toString() }]);
  };

  const updateBookmark = (id, updatedData) => {
    setBookmarks(
      bookmarks.map((b) => (b.id === id ? { ...b, ...updatedData } : b))
    );
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  return (
    <>
      <ProfileHeader />
      <div className="bookmark-manager">
        <div className="left-panel">
          <ReadBookmark bookmarks={bookmarks} />
        </div>
        <div className="right-panel">
          <div className="nav-buttons">
            <button
              onClick={() => setActiveForm("add")}
              className={activeForm === "add" ? "active" : ""}
            >
              Add
            </button>
            <button
              onClick={() => setActiveForm("update")}
              className={activeForm === "update" ? "active" : ""}
            >
              Update
            </button>
            <button
              onClick={() => setActiveForm("delete")}
              className={activeForm === "delete" ? "active" : ""}
            >
              Delete
            </button>
          </div>
          {/* <div className="form-container">
            {activeForm === "add" && <AddBookmark addBookmark={addBookmark} />}
            {activeForm === "update" && (
              <UpdateBookmark
                bookmarks={bookmarks}
                updateBookmark={updateBookmark}
              />
            )}
            {activeForm === "delete" && (
              <DeleteBookmark
                bookmarks={bookmarks}
                deleteBookmark={deleteBookmark}
              />
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BookmarkManager;
