const express = require('express')
const Forum = require('../models/forum')
const Like = require('../models/like') // Import the Like model

const router = express.Router()

router.post('/:forumId', (req, res) => {
    const forumId = req.params.forumId
    
    if (req.session.loggedIn) {
        // Extract user ID from session
        const userId = req.session.userId
        // Create a new like object with the user's ID
        const newLike = {
            author: userId // Associate the user's ID with the like
        }
        // Find the forum by ID
        Forum.findById(forumId)
            .then(forum => {
                if (!forum) {
                    throw new Error('Forum not found');
                }
                    // Add the new like to the forum's likes array
                    forum.likes.push(newLike)
                    // Save the updated forum
                    return forum.save()
            })
            .then(updatedForum => {
                console.log('Updated form: ', updatedForum)
                // Redirect to the forum page after successful like
                res.redirect('/forums');
            })
            .catch(err => {
                console.error(err);
                res.redirect(`/error?error=${err}`)
            })
    } else {
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20like%20this%20forum`)
    }
})


// create a delete router
// delete router/forumid/likeid
router.delete('/delete/:forumId/:likeId', (req, res) => {
    // define our request parameters
    const { forumId, likeId } = req.params

    // Find the forum
    Forum.findById(forumId)
    // use the forum to find the like id
    .then(forum => {
        const findLike = forum.likes.id(likeId)
        console.log('Like: ', findLike)
        // if user is loggedin
        if (req.session.loggedIn) {
            // if author id matches the session id
            if (findLike.author == req.session.userId) {
                findLike.remove()
                forum.save()
            } else {
                return res.redirect('/error?error=You%20Are20%Not%20Allowed%20To%20Dislike%20This%20Post')
            }
        } else {
            return res.redirect('/error?error=You%20Are%20Not%20Logged%20In')
        }
    })
    // upon successful dislike, refresh forum page
    .then(() => {
        res.redirect('/forums')
    })
    // catch errors
    .catch(err => {
        res.redirect(`/error?error=${err}`)
    })
})

module.exports = router
