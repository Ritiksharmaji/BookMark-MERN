import "../styles.css";

const BookmarkCard = ({ bookmark }) => {
  return (
    <div className="card">
      <h2>{bookmark.title}</h2>
      <p><strong>Category:</strong> {bookmark.category}</p>
      <p>{bookmark.description}</p>
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer">Visit</a>
    </div>
  );
};

export default BookmarkCard;
