/* ------------- Include Server Dependencies ------------- */
const express = require('express')
const Forum = require('../models/forum')


const router = express.Router()

/* ------------- Index Route ------------- */
router.get('/', (req, res) => {
  const { username, loggedIn, userId } = req.session

  Forum.find({})
    .populate('owner', 'username')
    .populate('comments.author', '-password')
    .then(forums => {
      res.render('forums/index', {forums, username, loggedIn, userId})
    })
    .catch(err => {
      res.redirect(`/error?error=${err}`)
    })
})

// /* ------------- Create Route ------------- */
router.post('/', (req, res) => {
  req.body.owner = req.session.userId
  const forumPost = req.body
  Forum.create(forumPost) //creates a new forum to the request body
  .then(() => {
    res.redirect('/forums')
  })
  .catch((error) => {
    console.log(error)
    res.redirect(`/error?error=${err}`)
  })
})

/* ------------- Update Route ------------- */
router.put('/:id', (req, res) => {
  const forumId = req.params.id
    //create an if statement to check if User is logged in to allow Update and Delete function
    Forum.findById(forumId)
    .then(forum => {
      if (forum.owner == req.session.userId) {
        return forum.updateOne(req.body)
      }
    })
     .then(forum => {
        res.redirect('/forums')
     })
    .catch((error) => {
        console.log(error)
        res.redirect(`/error?error=${err}`)
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
          res.redirect('/forums')
      })
    .catch(err => {
      res.redirect(`/error?error=${err}`)
    })
})

// delete comment

/* ------------- Show One Route ------------- */
router.get('/:id', (req, res) => {
  const forumId = req.params.id
  Forum.findById(forumId)
      .populate('comments.author', '-password',)
      .then(forum => {
        res.render('forums/show', {forum, ...req.session})
      })
      .catch((err) => { 
        res.redirect(`/error?error=${err}`)
      })
  })

module.exports = router