// const mongoose = require('mongoose');

// // Define the schema for Bookmark
// const bookmarkSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     purpose: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category', // Reference to the Category model
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Reference to the User model
//         required: true
//     },
//     dynamicFields: {
//         type: [Object] // Array of dynamic fields
//     },
//     dateCreated: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Create the model from the schema
// const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// module.exports = Bookmark;


const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String }, 
  category: { type: String, required: true },
  purpose: { type: String },
  description: { type: String },
  tags: [String],
  dateAdded: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);

