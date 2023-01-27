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
// router.get('/', (req, res) => {
//     flightData.flights(
//     {
//       API_TOKEN: apiToken,
//       options: {
//         limit: 1
//       }
//     })
//     .then(tracked => { 
//       console.log('Tracked: ', tracked)
//       // res.json({ tracked: tracked })
//       res.render('tracker/index', {tracked})
//     })
//       .catch((error) => {
//         console.log(error)
//         res.json({error})
//       })
// })

module.exports = router
