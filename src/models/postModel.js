const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const post = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    postImg:{
        type: String,
        required: true
    },
    commentsId:{
        type:ObjectId,
        ref:"Comment",
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Post',post)