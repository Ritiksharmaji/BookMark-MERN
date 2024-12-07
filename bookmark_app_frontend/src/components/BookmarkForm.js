import React, { useState } from "react";

const BookmarkForm = ({ onBookmarkAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    description: "",
    link: "",
    category: "",
    dynamicFields: [{ fieldName: "", value: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDynamicFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = formData.dynamicFields.map((field, i) =>
      i === index ? { ...field, [name]: value } : field
    );
    setFormData({ ...formData, dynamicFields: updatedFields });
  };

  const handleAddDynamicField = () => {
    setFormData({
      ...formData,
      dynamicFields: [...formData.dynamicFields, { fieldName: "", value: "" }],
    });
  };

  const handleRemoveDynamicField = (index) => {
    const updatedFields = formData.dynamicFields.filter((_, i) => i !== index);
    setFormData({ ...formData, dynamicFields: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    if (!token) {
      alert("You must be logged in to submit this form.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookmarks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onBookmarkAdded(data); // Notify parent about the new bookmark
        setFormData({
          name: "",
          purpose: "",
          description: "",
          link: "",
          category: "",
          dynamicFields: [{ fieldName: "", value: "" }],
        });
      } else {
        alert("Failed to add bookmark: " + data.message || "Unknown error");
        console.error("Error adding bookmark:", data);
      }
    } catch (error) {
      alert("Error adding bookmark: " + error.message);
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Bookmark</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="purpose"
        value={formData.purpose}
        onChange={handleChange}
        placeholder="Purpose"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="url"
        name="link"
        value={formData.link}
        onChange={handleChange}
        placeholder="Link"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <div>
        <h4>Dynamic Fields</h4>
        {formData.dynamicFields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              name="fieldName"
              value={field.fieldName}
              onChange={(e) => handleDynamicFieldChange(index, e)}
              placeholder="Field Name"
              required
            />
            <input
              type="text"
              name="value"
              value={field.value}
              onChange={(e) => handleDynamicFieldChange(index, e)}
              placeholder="Value"
              required
            />
            <button type="button" onClick={() => handleRemoveDynamicField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDynamicField}>
          Add Dynamic Field
        </button>
      </div>
      <button type="submit">Add Bookmark</button>
    </form>
  );
};

export default BookmarkForm;
