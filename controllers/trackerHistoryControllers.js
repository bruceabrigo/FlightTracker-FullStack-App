const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/history', (req, res) => {
  // Set Cache-Control header to no-store to prevent caching of response
  res.set('Cache-Control', 'no-store');

  const { username, loggedIn, userId } = req.session;
  // Assume that you would want to retrieve the specific user by their userId
  User.find({})
    .then(user => {
      res.render('tracker/history', {user, username, loggedIn, userId})
    })
    .catch(err => {
      res.redirect(`/error?error=${err}`)
    })
});


module.exports = router;
