const express = require('express')
const Forum = require('../models/like')

const router = express.Router()

module.exports = router

/* ------------- Router to create a new Like ------------- */
router.post(':/forumId', (req, res) => {
    const forumId = req.params.forumId

    // check if request body session is logged in
    if (req.session.loggedIn) {
        // if someone is logged in in the current session
        // create a request body to refer to a like
        const addLike = req.body
        // location the forum per the request
        Forum.findById(forumId)
            .then(forum => {
                // after locating the target forum
                // push a new like per the request
                forum.likes.push(addLike)
                // return a saved version of the forum with a new like
                return forum.save
            })
            // on a positive 201 response, redirect to the forums page
            .then(() => {
                res.redirect('/forums')
            })
            // handle any error
            .catch(err => {
                console.log(err)
                res.redirect(`error/?error=${err}`)
            })
    // upon an un-authorized like request 
    } else {
        // return a message displaying a 401 un-authorized request
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20fruit`)
    }
})