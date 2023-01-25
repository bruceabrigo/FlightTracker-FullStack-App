/* ------------- Include Server Dependencies ------------- */
require('dotenv').config() 
const express = require('express') 
const morgan = require("morgan") 
const AirplaneRouter = require('./controllers/airplaneControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')
const path = require('path')

const app = require('liquid-express-views')(express())

/* ------------- Middleware ------------- */

middleware(app)

app.get('/', (req, res) => {
  res.send('Server Started...')
})

app.use('/airplanes', AirplaneRouter)
app.use('/users', UserRouter)


/* ------------- Server Listener ------------- */
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Connected to port: ${PORT}`))