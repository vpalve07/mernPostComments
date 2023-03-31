const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const comment = new mongoose.Schema({
    postId: {
        type: ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String
    },
    replay:{
        type:[String]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', comment)