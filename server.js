/* ------------- Include Server Dependencies ------------- */
require('dotenv').config() 
const express = require('express') 
const morgan = require("morgan") 
const AirplaneRouter = require('./controllers/airplaneControllers')
const UserRouter = require('./controllers/userControllers')
const TrackerRouter = require('./controllers/trackerControllers')
const ForumRouter = require('./controllers/forumControllers')
const middleware = require('./utils/middleware')
const path = require('path')

const app = require('liquid-express-views')(express())

/* ------------- Middleware ------------- */

middleware(app)

/* ------------- Render Index ------------- */
app.get('/', (req, res) => {
  const {username, loggedIn, userId} = req.session
  res.render('home.liquid', {username, loggedIn, userId})
})



app.use('/airplanes', AirplaneRouter)
app.use('/users', UserRouter)
app.use('/tracker', TrackerRouter)
app.use('/forums', ForumRouter)


/* ------------- Server Listener ------------- */
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Connected to port: ${PORT}`))