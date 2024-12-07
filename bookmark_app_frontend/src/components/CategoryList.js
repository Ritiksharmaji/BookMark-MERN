import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryList = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from the backend
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category); // Trigger the callback with the selected category
  };

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            onClick={() => handleCategoryClick(category.name)}
            style={{
              cursor: "pointer",
              fontWeight: selectedCategory === category.name ? "bold" : "normal",
            }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
