

// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
// const User = require('../models/User'); // Import the User model
// const Bookmark = require('../models/Bookmark'); // Import the Bookmark model

// // Route to get user details and recent bookmarks
// router.get('/profile', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user; // Extract user ID from authMiddleware (decoded JWT payload)

//         // Fetch user details
//         const user = await User.findById(userId).select('username email');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }

//         // Fetch the 5 most recent bookmarks for the user
//         const recentBookmarks = await Bookmark.find({ user: userId })
//             .sort({ dateCreated: -1 }) // Sort by most recent
//             .limit(5)
//             .select('name description category dateCreated');

//         // Respond with user details and recent bookmarks
//         res.status(200).json({
//             user,
//             recentBookmarks,
//         });
//     } catch (error) {
//         console.error('Error fetching profile data:', error.message);
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User'); // Import the User model
const Bookmark = require('../models/Bookmark'); // Import the Bookmark model

// Route to get user details (Profile)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user; // Extract user ID from authMiddleware (decoded JWT payload)

        // Fetch user details
        const user = await User.findById(userId).select('username email');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Respond with user details
        res.status(200).json({
            user,
        });
    } catch (error) {
        console.error('Error fetching profile data:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Route to get all bookmarks for the logged-in user
router.get('/bookmarks', authMiddleware, async (req, res) => {
    try {
        const userId = req.user; // Extract user ID from authMiddleware (decoded JWT payload)

        // Fetch all bookmarks for the logged-in user, ensuring they belong to the user
        console.log(`userId in backend when fetch the bookmark:`, userId)
        const bookmarks = await Bookmark.find({ user: userId })
            .sort({ dateCreated: -1 }) // Sort by most recent
            .select('name description category dateCreated'); // Select only relevant fields
        console.log(`totol bookmark:`,bookmarks)
        if (!bookmarks.length) {
            return res.status(404).json({ error: 'No bookmarks found for this user.' });
        }

        // Respond with the user's bookmarks
        res.status(200).json({
            bookmarks,
        });
    } catch (error) {
        console.error('Error fetching bookmarks:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
