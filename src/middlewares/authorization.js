const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const commentModel = require("../models/commentModel")
const postModel = require("../models/postModel")

const objectIdCheck = function(req,res,next){
    try {
        let data = req.body
        if(data.postId&&!mongoose.isValidObjectId(data.postId)) return res.status(400).send({status:false,msg:"Invalid postId"})
        if(data.userId&&!mongoose.isValidObjectId(data.userId)) return res.status(400).send({status:false,msg:"Invalid userId"})
        if(data.commentId&&!mongoose.isValidObjectId(data.commentId)) return res.status(400).send({status:false,msg:"Invalid commentId"})
        next()
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const validateToken = function(req,res,next){
    try {
        let token = req.headers['x-api-key']
        if(!token) return res.status(400).send({status:false,msg:"Token is required"})
        jwt.verify(token,"secretKey", function(err,decode){
            if(err) return res.status(400).send({status:false,msg:"Authentication Failed"})
            req.decode = decode
            next() 
        })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const updateAuth = async function(req,res,next){
    if(req.body.commentId){
        let findComment = await commentModel.findOne({_id:req.body.commentId})
        if(req.decode.userId!=findComment.userId.toString()) return res.status(404).send({status:false,msg:"You are not authorized"})
        next()
    }
    if(req.body.postId){
        let findPost = await postModel.findOne({_id:req.body.postId})
        if(req.decode.userId!=findPost.userId.toString()) return res.status(404).send({status:false,msg:"You are not authorized"})
        next()
    }
    
}

module.exports = {objectIdCheck, validateToken, updateAuth}