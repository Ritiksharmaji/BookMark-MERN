const Bookmark = require("../models/Bookmark");

// Add Bookmark
const addBookmark = async (req, res) => {
  try {
    const { title, url, category, purpose, description, tags } = req.body;
    const newBookmark = new Bookmark({ title, url, category, purpose, description, tags, userId: req.user.id });
    const savedBookmark = await newBookmark.save();
    res.status(201).json(savedBookmark);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Bookmarks for a User
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a Single Bookmark by ID
const getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user.id });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// **Update a Bookmark**
const updateBookmark = async (req, res) => {
  try {
    const { title, url, category, purpose, description, tags } = req.body;

    const updatedBookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, url, category, purpose, description, tags },
      { new: true } // Return updated document
    );

    if (!updatedBookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json(updatedBookmark);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Bookmark
const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json({ message: "Bookmark deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addBookmark, getBookmarks, getBookmarkById, updateBookmark, deleteBookmark };
