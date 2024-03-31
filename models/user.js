/* ------------- Include Server Dependencies ------------- */
const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

// update user Model to include tracked flight data fields
// returned flight data from AviationAStack api is to be saved into an array on userSchema
const flightDataSchema = new Schema({
  flightNum: String,
  searchData: {
    type: Date,
    default: Date.now
  }
})
// create a user schema. Username must not have the ability to be duplicated
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // save flightData into an array of objects
  searched: [flightDataSchema]
})

const User = model('User', userSchema)
module.exports = User