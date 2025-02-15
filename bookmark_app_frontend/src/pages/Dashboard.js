import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../redux/bookmarkSlice";
import BookmarkCard from "../components/BookmarkCard";
import BookmarkForm from "../components/BookmarkForm";
import "../styles.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { bookmarks, status, error } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Your Bookmarks</h1>
      <BookmarkForm />
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {status === "succeeded" && bookmarks.length === 0 && <p>No bookmarks found.</p>}
      <div className="grid">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark._id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
