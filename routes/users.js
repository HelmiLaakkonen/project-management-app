const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
    console.log('GET request to /users route received')
    const query = 'SELECT username FROM users';
    
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            console.log('No users found');
            return res.status(404).json({ message: 'No users found' });
        }

        console.log('Fetched username:', results[0].username);
        res.json(results); // Return data as JSON
    });
});

module.exports = router;
