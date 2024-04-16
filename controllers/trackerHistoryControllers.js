const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/history', (req, res) => {
  // Retrieve the savedUser object from the request
  const savedUser = req.savedUser;

  // Check if there's a saved user
  if (savedUser) {
    // If there's a logged-in user, retrieve their search history
    const searchHistory = savedUser.searched;
    // Render the liquid view, passing the search history data to it
    res.render('/', { searchHistory });
  } else {
    // If no saved user, handle it accordingly (redirect, render an error page, etc.)
    res.render('/', { searchHistory: [] }); // Render the view with an empty search history array
  }
});

module.exports = router;
