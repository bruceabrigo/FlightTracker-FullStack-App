// require connection 
const mongoose = require('../utils/connection')

const {Schema, model} = mongoose

const likeSchema = new Schema({
    // create a username o
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    likeCount : {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = likeSchema