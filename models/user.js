/* ------------- Include Server Dependencies ------------- */
const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

//create a user schema. Username must not have the ability to be duplicated

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = model('User', userSchema)
module.exports = User