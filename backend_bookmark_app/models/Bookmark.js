const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    purpose: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dynamicFields: { type: Array, default: [] }, // Store additional fields dynamically
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
