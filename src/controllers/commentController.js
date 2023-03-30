const commentModel = require('../models/commentModel')
const postModel = require('../models/postModel')

const comment = async function(req,res){
    let data = req.body
    let createComment = await commentModel.create(data)
    await postModel.findByIdAndUpdate(data.postId,{ $inc: { comment: 1 } },{new:true})
    return res.status(201).send({status:true,data:createComment})
}

const updateComment = async function(req,res){
    let data = req.body
    let findComment = await commentModel.findByIdAndUpdate(data.commentId,{comment:data.comment},{new:true})
    if(!findComment) return res.status(404).send({status:false,msg:"Comment not found for updation"})
    return res.status(200).send({status:true,data:findComment})
}

const deleteComment = async function(req,res){
    let data = req.body
    let findComment = await commentModel.findOneAndUpdate({_id:data.commentId,isDeleted:false},{isDeleted:true})
    if(!findComment) return res.status(404).send({status:false,msg:"Comment not found for Deletion"})
    return res.status(200).send({status:true,msg:"Comment Deleted Successfully"})
}

module.exports = {comment,updateComment,deleteComment}