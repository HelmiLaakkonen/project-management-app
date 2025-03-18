const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const router = express.Router();

router.get('/', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('No authorization header');
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from the Authorization header

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token:', err.message);
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        
        console.log('Decoded token:', decoded);

        const query = 'SELECT username, email FROM users WHERE username = ?';
        db.execute(query, [decoded.username], (err, results) => {
            if (err) {
                console.error('Error executing query:', err.message);
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                console.log('User not found');
                return res.status(404).json({ message: 'User not found' });
            }

            const user = results[0];
            res.json({
                username: user.username,
                email: user.email
            });
        });
    });
});

module.exports = router;