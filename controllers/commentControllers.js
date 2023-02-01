const express = require('express')
const Forum = require('../models/comment')
const router = express.Router()

/* ------------- Router to POST a new comment ------------- */
router.post('/:forumId', (req, res) => {
  const forumId = req.params.forumId
  if (req.session.loggedIn) {
      req.body.author = req.session.userId
      const comments = req.body
      Fruit.findById(forumId)
          .then(forum => {
              forum.comments.push(comments)
              return forum.save()
          })
          .then(forum => {
            res.redirect(`/forums/${forum.id}`)
          })
          .catch(err => {
              console.log(err)
              res.redirect(`/error?error=${err}`)
            })
  } else {
      res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20forum`)
  }

/* ------------- Delete the comment ------------- */

})
router.delete('/delete/:forumId/:commId', (req, res) => {
  const {forumId, commId} = req.params
  Forum.findById(forumId)
    .then(forum => {
      const comments = forum.comments.id(commId)
      if (req.session.loggedIn) {
        if (comments.author == req.session.userId) {
          comments.remove()
            forum.save()
              res.redirect(`/forums/${forum.id}`)
          } else {
          res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
        }
      } else {
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})
module.exports = router
