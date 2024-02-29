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
                // create conditional to limit likes per user
                if (forum.likes.includes(userId)) {
                    console.log('You already liked this post')
                    res.redirect(`/error?error=You%20Already%20liked%20%this%20forum`)
                } else {
                    // Add the new like to the forum's likes array
                    forum.likes.push(newLike)
                    // Save the updated forum
                    return forum.save()
                }
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

module.exports = router
