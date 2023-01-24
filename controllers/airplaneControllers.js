/* ------------- Include Server Dependencies ------------- */
const express = require('express')
const Airplane = require('../models/history')

const router = express.Router()

// /* ------------- Index Route ------------- */

router.get('/', (req, res) => {
  Airplane.find({})
      .then(planes => { res.json({ planes: planes })})
      .catch(err => console.log('The following error occurred: \n', err))
})

// /* ------------- Create Route ------------- */

router.post('/', (req, res) => {
  const newAirplane = req.body
  Airplane.create(req.body) //creates a new airplanes to the request body
  .then((airplane) => {
    res.status(201).json({airplane: airplane.toObject()})
  })
  .catch((error) => {
    console.log(error)
    res.json({error})
  })
})

// /* ------------- Update Route ------------- */

router.put('/:id', (req, res) => {
  const planeId = req.params.id

    const updatedPlane = req.body

    Airplane.findByIdAndUpdate(planeId, updatedPlane, { new: true })
        .then(airplane => {
            console.log('the newly updated airplane', airplane)
            res.sendStatus(204)
          })
          .catch((error) => {
            console.log(error)
            res.json({error})
          })
})

// /* ------------- Delete Route ------------- */

router.delete('/:id', (req, res) => {
  const planeId = req.params.id
  Airplane.findByIdAndRemove(planeId)
      .then(() => {
          res.sendStatus(204)
      })
      .catch(err => console.log(err))
})

// /* ------------- Show One Route ------------- */
router.get('/:id', (req, res) => {
  const planeId = req.params.id
  Airplane.findById(planeId)
      .then((airplane) => {
        console.log(airplane)
        res.json({airplane:airplane})
      })
      .catch((error) => {
        console.log(error)
        res.json({error})
      })
  })

module.exports = router