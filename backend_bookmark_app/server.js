require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');  // Import the connectDB function


const bcrypt = require('bcrypt');
const User = require('./models/User');  // Ensure this path is correct
const jwt = require('jsonwebtoken');  // Import jsonwebtoken


const categoryRoutes = require('./routes/categoryRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

const app = express();

// Connect to the database
connectDB();  // Call the connectDB function once

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use('/api/categories', categoryRoutes);  // Handle category-related requests
app.use('/api/bookmarks', bookmarkRoutes);  // Handle bookmark-related requests

// Define the route for the root URL "/"
app.get('/', (req, res) => {
  res.send("Welcome to the bookmark application");
});


// Register route directly at /register
// app.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Registration failed!' });
//     }
// });


// // Login route directly at /api/auth/login
// app.post('/api/auth/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ error: 'User not found!' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ error: 'Invalid credentials!' });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token, user: { id: user._id, username: user.username } });
//     } catch (error) {
//         res.status(500).json({ error: 'Login failed!' });
//     }
// });


app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password }); // Save password as-is for testing
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed!' });
    }
});


app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found!' });

        // For testing purposes, we compare the plaintext password directly
        if (password !== user.password) {  // Compare directly with stored password (plaintext)
            return res.status(400).json({ error: 'Invalid credentials!' });
        }

        // Create a JWT token if credentials match
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Login failed!' });
    }
});





// Set up the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
