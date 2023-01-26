require('dotenv').config() 
const express = require('express')
// const axios = require('axios')
const flightData = require('flight-data')

const router = express.Router()
const apiToken = process.env.API_TOKEN
/* ------------- Aviation-Stack API ------------- */
// api access key
// const params = {
//   access_key: '5c274a30d8214bb2b568793050ea9d82'
// }

// axios.get('http://api.aviationstack.com/v1/flights', {params})
//   .then(response => {
//     const apiResponse = response.data;
//     if (Array.isArray(apiResponse['results'])) {
//         apiResponse['results'].forEach(flight => {
//             if (!flight['live']['is_ground']) {
//                 console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
//                     `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
//                     `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
//             }
//         });
//     }
//   }).catch(error => {
//     console.log(error);
//   });



router.get('/track', (req, res) => {

  flightData.flights(
    {
      API_TOKEN: apiToken,
      options: {
        limit: 1,
        flight_number: '930',
        arr_iata: 'CUN'
      }
    })
    .then(tracked => { 
      console.log('Tracked: ', tracked)
      res.json({ tracked: tracked })
    })
      .catch((error) => {
        console.log(error)
        res.json({error})
      })
})

module.exports = router
