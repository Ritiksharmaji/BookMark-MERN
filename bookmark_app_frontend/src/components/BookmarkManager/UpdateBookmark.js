import React, { useState } from "react";

const UpdateBookmark = ({ bookmarks, updateBookmark }) => {
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  const handleSelect = (e) => {
    const bookmark = bookmarks.find((b) => b.id === e.target.value);
    setSelectedId(e.target.value);
    setFormData(bookmark || {});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBookmark(selectedId, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Update Bookmark</h2>
      <select value={selectedId} onChange={handleSelect}>
        <option value="">Select a Bookmark</option>
        {bookmarks.map((b) => (
          <option key={b.id} value={b.id}>
            {b.title}
          </option>
        ))}
      </select>
      {selectedId && (
        <>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <button type="submit">Update Bookmark</button>
        </>
      )}
    </form>
  );
};

export default UpdateBookmark;
