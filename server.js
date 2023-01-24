/* ------------- Include Server Dependencies ------------- */
require("dotenv").config() 
const express = require("express")
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 
const Airplane = require("./models/history")

/* ------------- Database Connection ------------- */
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

const app = express()

/* ------------- Middleware ------------- */

app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server Started...')
})

app.get('/airplanes', async (req, res) => {
  const planes = await Airplane.find({})
  res.json({ planes: planes})
})

app.post('/airplanes', (req, res) => { //creates a post request to the airplanes url
  Airplane.create(req.body) //creates a new airplanes to the request body
    .then((airplane) => {
      res.status(201).json({airplane: airplane.toObject()})
    })
    .catch((error) => {
      console.log(error)
      res.json({error})
    })
})

app.put('/airplanes/:id', (req, res) => {
  const planeId = req.params.id
  req.body.tracked = req.body.tracked === 'on' ? true : false

  Airplane.findByIdAndUpdate(planeId, req.body, {new: true})
    .then((airplane) => {
      res.sendStatus(204)
    })
    .catch((error) => {
      console.log(error)
      res.json({error})
    })
})

app.delete("/airplanes/:id", (req, res) => {
  // get the id from params
  const planeId = req.params.id
  // find and delete the fruit
  Airplane.findByIdAndRemove(planeId)
    .then((airplane) => {
      // 204 - No Content
      res.sendStatus(204)
    })
    // send error as json
    .catch((error) => {
      // console.log(error)
      res.json({ error })
    })
})

/* ------------- Server Listener ------------- */
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Connected to port: ${PORT}`))