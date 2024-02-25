const express = require('express')
const Forum = require('../models/forum')
const router = express.Router()

/* ------------- Router to POST a new comment ------------- */
router.post('/:forumId', (req, res) => {
  const forumId = req.params.forumId
  if (req.session.loggedIn) {
      req.body.author = req.session.userId
      const newComment = req.body
      Forum.findById(forumId)
          .then(forum => {
              forum.comments.push(newComment)
              return forum.save()
          })
          .then(forum => {
            // Pass forumId as a parameter when rendering the template
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
router.delete('/:forumId/comments/:commentId', (req, res) => {
  const { forumId, commentId } = req.params;
  if (req.session.loggedIn) {
    Forum.findById(forumId)
      .then(forum => {
        const commentIndex = forum.comments.findIndex(comment => comment._id == commentId);
        if (commentIndex !== -1 && forum.comments[commentIndex].author == req.session.userId) {
          forum.comments.splice(commentIndex, 1);
          return forum.save();
        } else {
          throw new Error('Comment not found or you are not authorized to delete it.');
        }
      })
      .then(() => {
        res.redirect(`/forums/${forumId}`);
      })
      .catch(err => {
        console.log(err);
        res.redirect(`/error?error=${err}`);
      });
  } else {
    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`);
  }
});




module.exports = router
