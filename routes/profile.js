const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

router.get('/profile', authenticate, (req, res) => {
    const userId = req.user.userId;
    console.log("username:",userId)
    const query = 'SELECT username, email FROM users WHERE user_id = ?';
    db.execute(query, [userId], (err, results) => {
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

router.post('/passwordChange', authenticate, async (req, res) => {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old and new passwords are required' });
    }

    try {
        const query = 'SELECT password_hash FROM users WHERE user_id =?';
        db.execute(query, [userId], async (err, results) => {
            if (err) {
                console.error('Error executing query:', err.message);
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(oldPassword, user.password_hash);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect old password' });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updateQuery = 'UPDATE users SET password_hash = ? WHERE user_id = ?';
            db.execute(updateQuery, [hashedPassword, userId], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating password:', updateErr.message);
                    return res.status(500).json({ error: updateErr.message });
                }
                res.json({ message: 'Password updated successfully' });
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/deleteAccount', authenticate, async (req, res) => {
    const userId = req.user.userId;

    const deleteQuery = 'DELETE FROM users WHERE user_id = ?';

    db.execute(deleteQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err.message);
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Account deleted successfully' });
    });
});

module.exports = router;