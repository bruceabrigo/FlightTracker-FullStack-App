/* ------------- Include Server Dependencies ------------- */
const mongoose = require('mongoose') 
require('dotenv').config() 


const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
  .on('open', () => console.log('Connected to Mongoose...'))
  .on('close', () => console.log('Disconnected from Mongoose...'))
  .on('error', (err) => console.log('An error has ocurred: ', err))

module.exports = mongoose