const express = require('express');
const Bookmark = require('../models/Bookmark'); // Bookmark model
const Category = require('../models/Category'); // Category model
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Bookmark
router.post('/add', authMiddleware, async (req, res) => {
    const { name, purpose, description, category, dynamicFields } = req.body;
    console.log('POST /add - Request Body:', req.body);
    console.log('User:', req.user);  // Log user info from the authMiddleware

    try {
        // Check if the category already exists
        let existingCategory = await Category.findOne({ name: category });

        // If category does not exist, create a new category
        if (!existingCategory) {
            existingCategory = new Category({
                name: category,
                description: `${category} description`,  // You can modify this to accept a description or generate one
            });
            await existingCategory.save();
        }

        // Create the bookmark and link it to the existing or newly created category
        const bookmark = new Bookmark({
            name,
            purpose,
            description,
            category: existingCategory._id, // Use the category's ObjectId
            user: req.user, // Use the authenticated user
            dynamicFields
        });

        await bookmark.save();
        console.log('Bookmark Created:', bookmark);
        res.status(201).json(bookmark);
    } catch (error) {
        console.error('Error creating bookmark:', error);
        res.status(500).json({ error: 'Failed to add bookmark!' });
    }
});

// Fetch User's Bookmarks
router.get('/', authMiddleware, async (req, res) => {
    console.log('GET / - User:', req.user);  // Ensure user is authenticated

    try {
        const bookmarks = await Bookmark.find({ user: req.user }).populate('category'); // Populate category details
        console.log('Fetched Bookmarks:', bookmarks);
        res.status(200).json(bookmarks);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ error: 'Failed to fetch bookmarks!' });
    }
});

module.exports = router;
