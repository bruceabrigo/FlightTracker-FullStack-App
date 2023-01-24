/* ------------- Include Server Dependencies ------------- */
// Will store favorited aircrafts IF and ONLY IF user is logged in
// User will also have the ability to log tracked aircraft history
const mongoose = require('mongoose') 

const mongoose = require('../utils/connection') // establish connection in Utils

const { Schema, model } = mongoose

const airplaneSchema = new Schema ({
  airline: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  tracked: {
    type: boolean,
    required: true,
  },
  flightNum: {
    type: String
  }
})

const Airplane = model('airplane', airplaneSchema)
module.exports = Airplane