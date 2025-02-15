import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBookmark } from "../redux/bookmarkSlice";
import "./styles.css";

const BookmarkForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "",
    purpose: "",
    description: "",
    tags: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBookmark = { 
      ...formData, 
      tags: formData.tags.split(",").map(tag => tag.trim()) // Convert tags to array 
    };
    dispatch(addBookmark(newBookmark));
    setFormData({ title: "", url: "", category: "", purpose: "", description: "", tags: "" }); // Reset form
  };

  return (
    <div className="form-container">
      <h2>Add a New Bookmark</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="url" name="url" placeholder="URL" value={formData.url} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="purpose" placeholder="Purpose" value={formData.purpose} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        <input type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
        <button type="submit">Add Bookmark</button>
      </form>
    </div>
  );
};

export default BookmarkForm;
