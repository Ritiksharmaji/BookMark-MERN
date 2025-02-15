// const express = require('express');
// const Bookmark = require('../models/Bookmark'); // Bookmark model
// const Category = require('../models/Category'); // Category model
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// // Create Bookmark
// router.post('/add', authMiddleware, async (req, res) => {
//     const { name, purpose, description, category, dynamicFields } = req.body;


//     try {
//         // Check if the category exists
//         let existingCategory = await Category.findOne({ name: category });

//         // Create new category if it doesn't exist
//         if (!existingCategory) {
//             existingCategory = new Category({
//                 name: category,
//                 description: `${category} description`,
//             });
//             await existingCategory.save();
//         }

//         // Create the bookmark
//         const bookmark = new Bookmark({
//             name,
//             purpose,
//             description,
//             category: existingCategory._id,
//             user: req.user, // Authenticated user
//             dynamicFields,
//         });

//         await bookmark.save();
//         res.status(201).json(bookmark);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to add bookmark!' });
//     }
// });

// // Fetch All Bookmarks for a User
// router.get('/', authMiddleware, async (req, res) => {
//     try {
//         const bookmarks = await Bookmark.find({ user: req.user }).populate('category');
//         res.status(200).json(bookmarks);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch bookmarks!' });
//     }
// });

// // Fetch a Single Bookmark by ID
// router.get('/bookmark/:id', authMiddleware, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const bookmark = await Bookmark.findOne({ _id: id, user: req.user }).populate('category');
//         if (!bookmark) {
//             return res.status(404).json({ error: 'Bookmark not found!' });
//         }
//         res.status(200).json(bookmark);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch bookmark!' });
//     }
// });

// // Update Bookmark
// router.put('/bookmark/:id', authMiddleware, async (req, res) => {
//     const { id } = req.params;
//     const { name, purpose, description, category, dynamicFields } = req.body;
//     try {
//         // Check if the category exists
//         let existingCategory = await Category.findOne({ name: category });

//         // Create new category if it doesn't exist
//         if (!existingCategory) {
//             existingCategory = new Category({
//                 name: category,
//                 description: `${category} description`,
//             });
//             await existingCategory.save();
//         }

//         // Update the bookmark
//         const updatedBookmark = await Bookmark.findOneAndUpdate(
//             { _id: id, user: req.user },
//             {
//                 name,
//                 purpose,
//                 description,
//                 category: existingCategory._id,
//                 dynamicFields,
//             },
//             { new: true }
//         );

//         if (!updatedBookmark) {
//             return res.status(404).json({ error: 'Bookmark not found!' });
//         }
//         res.status(200).json(updatedBookmark);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update bookmark!' });
//     }
// });

// // Delete Bookmark
// router.delete('/bookmark/:id', authMiddleware, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedBookmark = await Bookmark.findOneAndDelete({ _id: id, user: req.user });
//         if (!deletedBookmark) {
//             return res.status(404).json({ error: 'Bookmark not found!' });
//         }
//         res.status(200).json({ message: 'Bookmark deleted successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete bookmark!' });
//     }
// });

// module.exports = router;


const express = require("express");
const { addBookmark, getBookmarks, getBookmarkById, updateBookmark, deleteBookmark } = require("../controllers/bookmarkController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/")
  .post(protect, addBookmark) 
  .get(protect, getBookmarks);

router.route("/:id")
  .get(protect, getBookmarkById)  
  .put(protect, updateBookmark)  
  .delete(protect, deleteBookmark);

module.exports = router;
