
const mongoose = require('../utils/connection')

const { Schema } = mongoose
const commentSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = commentSchema