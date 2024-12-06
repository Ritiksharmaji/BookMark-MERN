const express = require('express');
const Bookmark = require('../models/Bookmark');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Bookmark
router.post('/add', authMiddleware, async (req, res) => {
    const { name, purpose, description, category, dynamicFields } = req.body;
    try {
        const bookmark = new Bookmark({ name, purpose, description, category, user: req.user, dynamicFields });
        await bookmark.save();
        res.status(201).json(bookmark);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add bookmark!' });
    }
});

// Fetch User's Bookmarks
router.get('/', authMiddleware, async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user });
        res.status(200).json(bookmarks);
        res.send("user good!!")
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookmarks!' });
    }
});

module.exports = router;
