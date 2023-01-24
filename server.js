/* ------------- Include Server Dependencies ------------- */
require("dotenv").config() 
const express = require("express")
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 

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

/* ------------- Server Listener ------------- */
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Connected to port: ${PORT}`))