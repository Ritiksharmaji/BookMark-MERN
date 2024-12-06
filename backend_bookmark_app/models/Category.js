const mongoose = require('mongoose');

// Define the schema for Category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
