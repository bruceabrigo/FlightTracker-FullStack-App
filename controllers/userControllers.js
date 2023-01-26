/* ------------- Include Server Dependencies ------------- */
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// create user router
const router = express.Router()

/* ------------- Determine Signup Routers ------------- */
router.post('/signup', async (req, res) => {
  const newUser = req.body
  newUser.password = await bcrypt.hash(
    newUser.password,
    await bcrypt.genSalt(10)
  )
  User.create(newUser)
    .then(user => {
      res.redirect('/users/login')
    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })
})

// GET and RENDER the signup page
router.get('/signup', (req, res) => {
  res.render('users/signup')
})

/* ------------- Determine Login Routers ------------- */
// GET and RENDER the login page
router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post('/login', async (req, res) => {
  // first we want to destructure the username and password from our req.body
  const { username, password } = req.body

  // search the db, for a user with a specific username
  User.findOne({ username })
     .then(async (user) => {
          // we check if that user exists
         if (user) {
            const result = await bcrypt.compare(password, user.password)
            if (result) {
              req.session.username = username
               req.session.loggedIn = true
               req.session.userId = user.id
               console.log('session user id', req.session.userId)
               res.redirect('/')
             } else {
                 res.json({ error: 'username or password is incorrect' })
            }
        } else {
            res.json({ error: 'user does not exist' })
        }
    })
    .catch(err => {
         console.log(err)
        res.json(err)
    })
})


/* ------------- Determine Logout Routers ------------- */
router.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('this is req.session upon logout \n', req.session)  //ONLY FOR DEBUGGING - REMOVE CONSOLE.LOG FOR versionFINAL
    res.redirect('/')
  })
})

// render logout page
router.get('/logout', (req, res) => {
  res.render('users/logout')
})

module.exports = router