const express = require('express')
const Forum = require('../models/forum')
const router = express.Router()

/* ------------- Router to POST a new comment ------------- */
router.post('/:forumId', (req, res) => {
  const forumId = req.params.forumId;
  if (req.session.loggedIn) {
    req.body.author = req.session.userId;
    const newComment = req.body;
    Forum.findById(forumId)
      .then(forum => {
        forum.comments.push(newComment);
        return forum.save();
      })
      .then(forum => {
        // Pass forumId as a parameter when rendering the template
        res.redirect(`/forums/${forum.id}`);
      })
      .catch(err => {
        console.log(err);
        res.redirect(`/error?error=${err}`);
      });
  } else {
    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20forum`);
  }
});

/* ------------- Delete the comment ------------- */
router.delete('/delete/:forumId/:commId', (req, res) => {
  const { forumId, commId } = req.params;

  // find the forum via forumId
  Forum.findById(forumId)
    .then(forum => {
      // search for the comment via the comment Id
      const findComment = forum.comments.id(commId)
      console.log('Comment Deleted: \n', findComment)

      if (req.session.loggedIn) {
        if (findComment.author == req.session.userId) {
          // if comment author matches session id
          // remove the comment
          findComment.remove()
            // save the forum with the removed id
            forum.save()
              // and redirect to the show page for that forum on successful remove
        } else {
          // otherwise you are not allowed to delete the comment
          res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
        }
      } else {
        res.redirect(`/error?error=401`)
      }
    })
    .then(forum => {
      res.redirect(`/forums/${forumId}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
});




module.exports = router
