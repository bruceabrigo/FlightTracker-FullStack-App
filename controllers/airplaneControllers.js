/* ------------- Include Server Dependencies ------------- */
const express = require('express')
const Airplane = require('../models/history')

const router = express.Router()

/* ------------- Render Home Page ------------- */
// router.get('/', (req, res) => {
//   res.render('index.liquid')
// })

/* ------------- Index Route ------------- */
router.get('/', (req, res) => {
  const { username, loggedIn, userId } = req.session

  Airplane.find({})
    .populate('owner', 'username')
    .then(planes => {
      res.render('planes/index', {planes, username, loggedIn, userId})
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})

// /* ------------- Create Route ------------- */
router.post('/', (req, res) => {
  req.body.owner = req.session.userId
  Airplane.create(req.body) //creates a new airplanes to the request body
  .then((airplane) => {
    const username = req.session.username
			const loggedIn = req.session.loggedIn
    console.log('Created: ', airplane) //ONLY FOR DEBUGGIN DELETE FOR versionFINAL
    res.render('airplanes/index', {airplane, username, loggedIn})
  })
  .catch((error) => {
    console.log(error)
    res.json({error})
  })
})

/* ------------- Update Route ------------- */
router.put('/:id', (req, res) => {
  const planeId = req.params.id
    const updatedPlane = req.body
    //create an if statement to check if User is logged in to allow Update and Delete function
    Airplane.findById(planeId)
    .then(airplane => {
      if (airplane.owner == req.session.userId) {
        return airplane.updateOne(req.body)
      }
    })
     .then(airplane => {
        console.log('the newly updated airplane', airplane)
        res.sendStatus(204)
     })
    .catch((error) => {
        console.log(error)
        res.json({error})
      })
})

/* ------------- Delete Route ------------- */
router.delete('/:id', (req, res) => {
  const planeId = req.params.id
  Airplane.findById(planeId)
  .then(airplane => {
    if (airplane.owner == req.session.userId) {
      return airplane.deleteOne()
    }
  })
      .then(() => {
          res.sendStatus(204)
      })
      .catch(err => console.log(err))
})

/* ------------- Show One Route ------------- */
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