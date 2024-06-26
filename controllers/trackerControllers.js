require('dotenv').config();
const express = require('express');
const flightData = require('flight-data');
// Import user model
const User = require('../models/user');

const router = express.Router();
const apiToken = process.env.API_TOKEN;

/* ------------- Render tracker page ------------- */
router.get('/', (req, res) => {
  const {username, loggedIn, userId} = req.session
  res.render('tracker/index', {username, loggedIn, userId});
});

/* ------------- Aviation-Stack API ------------- */
router.get('/track', (req, res) => {
  let flightNum = req.query.flightNum;
  console.log('Looking for: \n', flightNum);
  flightData.flights({
    API_TOKEN: apiToken,
    options: {
      limit: 1,
      flight_iata: flightNum
    }
  })
  .then(tracked => { 
    console.log('Tracked: ', tracked);
    console.log('Departure: ', tracked.data);
    // Checks if current session has a user
    if (req.session.loggedIn) {
      // Saved userId as session's userId
      const userId = req.session.userId;
      User.findById(userId)
      .then(user => {
        if (!user) {
          throw new Error('User not found');
        }
        // Push flight num into user searched Array
        user.searched.push({tracked});
        return user.save();
      })
      .then(savedUser => { 
        // Log the successful save for confirmation
        const lastSearch = savedUser.searched[savedUser.searched.length - 1]; 
        console.log(`Search for flight ${flightNum} saved.`, {user: savedUser.username, lastSearch, trackedData: tracked.data});
        // If logged in, return flight data to user sessionId
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/tracker/error');
      });
    } else {
      // If user is not in current session, return loggedIn as false
      res.render('tracker/index', { tracked, loggedIn: false});
    }
  })
  .catch((error) => {
    console.log(error);
    res.redirect('/tracker/error');
  });
});

router.get('/history', (req, res) => {
  const {username, loggedIn, userId} = req.session
  // return the saved user 
  User.findById(userId)
  .then(user => {
    console.log(user)
    res.render('tracker/history', {user, username, loggedIn, userId})
  })
})



module.exports = router;
