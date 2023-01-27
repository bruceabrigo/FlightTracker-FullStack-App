/* ------------- Include Server Dependencies ------------- */
const express = require('express')
const Forum = require('../models/forum')


const router = express.Router()

/* ------------- Render Home Page ------------- */
// router.get('/', (req, res) => {
//   res.render('index.liquid')
// })

/* ------------- Index Route ------------- */
router.get('/', (req, res) => {
  const { username, loggedIn, userId } = req.session

  Forum.find({})
    .populate('owner', 'username')
    .then(forums => {
      res.render('forums/index', {forums, username, loggedIn, userId})
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})

// /* ------------- Create Route ------------- */
router.post('/', (req, res) => {
  req.body.owner = req.session.userId
  Forum.create(req.body) //creates a new forum to the request body
  .then((forum) => {
    console.log('Created: ', forum) //ONLY FOR DEBUGGIN DELETE FOR versionFINAL
    res.redirect('/forums')
  })
  .catch((error) => {
    console.log(error)
    res.json({error})
  })
})

/* ------------- Update Route ------------- */
router.put('/:id', (req, res) => {
  const forumId = req.params.id
    const updatedForum = req.body
    //create an if statement to check if User is logged in to allow Update and Delete function
    Forum.findById(forumId)
    .then(forum => {
      if (forum.owner == req.session.userId) {
        return forum.updateOne(req.body)
      }
    })
     .then(forum => {
        console.log('the newly updated forum', forum)
        res.sendStatus(204)
     })
    .catch((error) => {
        console.log(error)
        res.json({error})
      })
})

/* ------------- Delete Route ------------- */
router.delete('/:id', (req, res) => {
  const forumId = req.params.id
  Forum.findById(forumId)
  .then(forum => {
    if (forum.owner == req.session.userId) {
      return forum.deleteOne()
    }
  })
      .then(() => {
          res.sendStatus(204)
      })
      .catch(err => console.log(err))
})

/* ------------- Show One Route ------------- */
router.get('/:id', (req, res) => {
  const forumId = req.params.id
  Forum.findById(forumId)
      .then((forum) => {
        console.log(forum)
        res.json({forum:forum})
      })
      .catch((error) => {
        console.log(error)
        res.json({error})
      })
  })

module.exports = router