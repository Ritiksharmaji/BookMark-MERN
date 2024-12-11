import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProfileHeader from "../Header/ProfileHeader";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = Cookies.get("jwt_token");

        const userResponse = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
          throw new Error(userData.error || "Failed to fetch user data");
        }

        setUser(userData.user);

        const bookmarksResponse = await fetch("http://localhost:5000/api/user/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const bookmarksData = await bookmarksResponse.json();

        if (!bookmarksResponse.ok) {
          throw new Error(bookmarksData.error || "Failed to fetch bookmarks");
        }

        const sortedBookmarks = bookmarksData.bookmarks.sort((a, b) =>
          new Date(b.dateCreated) - new Date(a.dateCreated)
        );

        setBookmarks(sortedBookmarks);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <ProfileHeader user={user} />
      
      <div className="profile-container">
        <div className="recent-bookmarks">
          <h3 className="recent-title">Recent Bookmarks</h3>
         
          {/* // In the recent-bookmarks section: */}
          <ul>
            {bookmarks.slice(0, 5).map((bookmark) => (
              <li key={bookmark._id} className="bookmark-item">
                <Link to={`/bookmark/${bookmark._id}`}>
                  {bookmark.name}
                </Link>
                <p>{bookmark.description}</p>
                <p>
                  <small>{new Date(bookmark.dateCreated).toLocaleString()}</small>
                </p>
              </li>
            ))}
          </ul>
          {bookmarks.length === 0 && <p>No bookmarks found</p>}
        </div>
        <div className="user-details">
          <h2 className="profile-title">User Profile</h2>
          {error && <p className="error-message">{error}</p>}
          {!error && (
            <>
              <p>
                <strong>Name:</strong> {user.username || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Total Bookmarks:</strong> {bookmarks.length}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
