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
    description:{
        type:String,
        required:true
    },
    comments:{
        type:Number,
        required:true,
        default:0
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('Post',post)