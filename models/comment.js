
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
  },
  // add createdAt field to return timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

module.exports = commentSchema