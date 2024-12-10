import React, { useState } from "react";
import Cookies from "js-cookie";
import "./AddBookmark.css";
import ProfileHeader from "../Header/ProfileHeader";

const AddBookmark = () => {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    description: "",
    link: "",
    category: "",
    dynamicFields: [{ fieldName: "", value: "" }],
  });

  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  // Retrieve the token from cookies
  const token = Cookies.get("jwt_token");

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

    if (!token) {
      alert("You must be logged in to submit this form.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookmarks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use token from cookies
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        

        // Reset form fields
        setFormData({
          name: "",
          purpose: "",
          description: "",
          link: "",
          category: "",
          dynamicFields: [{ fieldName: "", value: "" }],
        });

        // Show success popup
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      } else {
        alert("Failed to add bookmark: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error adding bookmark: " + error.message);
    }
  };

  return (
    <>
    <ProfileHeader  />
    <div>
      <div className="container">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="bookmark-form">
            <h2>Add Bookmark</h2>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Purpose"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Link"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
              />
            </div>

            {/* Dynamic Fields */}
            <div className="form-group">
              <h4>Dynamic Fields</h4>
              {formData.dynamicFields.map((field, index) => (
                <div key={index} className="dynamic-field">
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
                  <button
                    type="button"
                    onClick={() => handleRemoveDynamicField(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddDynamicField}
                className="add-field-button"
              >
                Add Dynamic Field
              </button>
            </div>

            <button type="submit" className="submit-button">
              Add Bookmark
            </button>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup">
          <p>Bookmark added successfully!</p>
        </div>
      )}
    </div>
    </>
   
  );
};

export default AddBookmark;
