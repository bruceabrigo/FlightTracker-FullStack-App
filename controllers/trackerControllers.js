require('dotenv').config() 
const express = require('express')
// const axios = require('axios')
const flightData = require('flight-data')

const router = express.Router()
const apiToken = process.env.API_TOKEN
/* ------------- Render tracker page ------------- */
router.get('/', (req, res) => {
  res.render('tracker/index')
})

/* ------------- Aviation-Stack API ------------- */
router.get('/track', (req, res) => {
  const {loggedIn} = req.session

  let flightNum = req.query.flightNum
  console.log('looking for: \n', flightNum)
    flightData.flights(
    {
      API_TOKEN: apiToken,
      options: {
        limit: 1,
        flight_number: flightNum
      }
    })
    .then(tracked => { 
      console.log('Tracked: ', tracked)
      // res.json({ tracked: tracked })
      res.render('tracker/index', {tracked, loggedIn})
    })
      .catch((error) => {
        console.log(error)
        res.redirect('tracker/error')
      })
})

module.exports = router
