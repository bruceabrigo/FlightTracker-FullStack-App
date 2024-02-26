// require connection 
const mongoose = require('../utils/connection')

const {Schema, model} = mongoose

const likeSchema = new Schema({
    like: {
        type: Integer,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = likeSchema