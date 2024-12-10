import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./BookmarkDetails.css";
import ProfileHeader from "../Header/ProfileHeader";

const BookmarkDetails = () => {
  const { id } = useParams(); // Retrieve the bookmark ID from the URL
  const [bookmark, setBookmark] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookmarkDetails = async () => {
      try {
        const token = Cookies.get("jwt_token");

        const response = await fetch(
          `http://localhost:5000/api/bookmarks/bookmark/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch bookmark details");
        }

        setBookmark(data); // Assume `data.bookmark` contains the details.
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookmarkDetails();
  }, [id]);

  return (
    <>
      <ProfileHeader />
      <div className="bookmark-details-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : bookmark ? (
          <div className="bookmark-details">
            <h2>{bookmark.name}</h2>

            <ul className="details-list">
              {bookmark.description && (
                <li>
                  <strong>Description:</strong> {bookmark.description}
                </li>
              )}
              {bookmark.link && (
                <li>
                  <strong>Link:</strong>{" "}
                  <a
                    href={bookmark.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookmark.link}
                  </a>
                </li>
              )}
              {bookmark.category && bookmark.category.name && (
                <li>
                  <strong>Category:</strong> {bookmark.category.name}
                </li>
              )}
              {bookmark.purpose && (
                <li>
                  <strong>Purpose:</strong> {bookmark.purpose}
                </li>
              )}
              <li>
                <strong>Date Created:</strong>{" "}
                {new Date(bookmark.dateCreated).toLocaleString()}
              </li>
            </ul>

            {bookmark.dynamicFields && bookmark.dynamicFields.length > 0 && (
              <div>
                <h4>Additional Fields:</h4>
                <ul>
                  {bookmark.dynamicFields.map((field, index) => (
                    <li key={index}>
                      <strong>{field.fieldName}:</strong> {field.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="loading-message">Loading bookmark details...</p>
        )}
      </div>
    </>
  );
};

export default BookmarkDetails;
