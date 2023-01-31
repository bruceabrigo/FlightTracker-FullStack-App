/* ------------- Include Server Dependencies ------------- */
// Will store favorited aircrafts IF and ONLY IF user is logged in
// User will also have the ability to log tracked aircraft history
const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

const airplaneSchema = new Schema ({

}, {timestamps: true})

const Airplane = model('airplane', airplaneSchema)
module.exports = Airplane