const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const jwt = require('jsonwebtoken'); // JWT for authentication
const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;  // Destructure username and password from the request body

    if (!username || !password) {
        console.log('username and password required');
        return res.status(400).json({ message: 'Username and password are required' });
        
    }

    // Query the database for the user by username
    const query = 'SELECT * FROM users WHERE username = ?';

    db.execute(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            console.log('User not found');
            return res.status(404).json({ message: 'Invalid username or password' });
        }

        // If user found, compare the hashed password with the one in the database
        const user = results[0]; // Assuming the result is an array with one user
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err.message);
                return res.status(500).json({ error: err.message });
            }

            if (!isMatch) {
                console.log('Password does not match');
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            
            // If passwords match, create a JWT token (or any other authentication method)
            const token = jwt.sign({ username: user.username, userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log("User ID:", user.id);
            console.log("Generated toekn", token);
            console.log('User authenticated');
            res.json({
                message: 'Login successful',
                token: token, // Send the token to the client
                
            });
        });
    });
});

module.exports = router;

