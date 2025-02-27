const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection'); // Ensure this points to your database connection
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = `
            INSERT INTO users (username, email, password_hash) 
            VALUES (?, ?, ?)`;
        
        db.execute(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err.message);
                return res.status(500).json({ message: 'Error registering user' });
            }

            res.status(201).json({ message: 'User registered successfully' });
        });

    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
