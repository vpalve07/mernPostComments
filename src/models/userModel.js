const { Schema } = require('mongoose')
let mongoose = require('mongoose')

let user = new Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:['mr','mrs'],
        required:true
    },
    phone:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model('User',user)