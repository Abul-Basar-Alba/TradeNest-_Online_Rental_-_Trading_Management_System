const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Placeholder for user routes
// Add more user-related routes here later

router.get('/profile/:id', async (req, res) => {
  res.json({ message: 'User profile route - coming soon' });
});

module.exports = router;
