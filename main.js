// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
const req_r="Hello world";
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/auth_demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Define user model
const User = mongoose.model('User', userSchema);

// Route for user registration
app.post('/register', async (req, res) => {
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    res.send('User registered successfully.');
});

// Route for user login
app.post('/login', async (req, res) => {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // Create and assign a JWT token
    const token = jwt.sign({ _id: user._id }, 'secretkey');
    res.header('auth-token', token).send(token);
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied.');

    try {
        const verified = jwt.verify(token, 'secretkey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
}

// Route for protected resources
app.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected resource.');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
