// require connection 
const mongoose = require('../utils/connection')

const {Schema} = mongoose

const likeSchema = new Schema({
    // create a username o
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = likeSchema