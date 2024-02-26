/* ------------- Include Server Dependencies ------------- */
//Only logged in users can make forum posts for other users to interact with
const mongoose = require('../utils/connection')
const commentSchema = require('./comment')
const likeSchema = require('./like')

const { Schema, model } = mongoose

//reply/comment sub-doc

const forumSchema = new Schema ({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [commentSchema],
  likes: [likeSchema]
}, {timestamps: true})

const Forum = model('forum', forumSchema)
module.exports = Forum

