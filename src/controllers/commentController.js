const commentModel = require('../models/commentModel')
const postModel = require('../models/postModel')
let jwt = require("jsonwebtoken")

const comment = async function (req, res) {
    try {
        let data = req.body
        if(!data.userId) return res.status(400).send({status:false,msg:"userId is required"})
        if(!data.postId) return res.status(400).send({status:false,msg:"postId is required"})
        let {comment} = data
        if(data.replay) return res.status(400).send({status:false,msg:"Cannot post replay on comment before posting comment"})
        let createComment = await commentModel.create(data)
        await postModel.findByIdAndUpdate(data.postId, {$push:{allComment:comment}, $inc: { comments: 1 } }, { new: true })
        // let commentToken = jwt.sign({postId:data.postId.toString()},data.comment)
        return res.status(201).send({ status: true, data: createComment})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const postReplay = async function(req,res){
    try {
        let data = req.body
        if(!data.commentId) return res.status(400).send({status:false,msg:"commentId is required"})
        if(!data.replay) return res.status(400).send({status:false,msg:"reply is required"})
        let {replay} = data
        let postReply = await commentModel.findOneAndUpdate({_id:data.commentId,isDeleted:false},{$push:{replay:replay}},{new:true})
        if(!postReply) return res.status(400).send({status:false,msg:"Comment not found for reply"})
        return res.status(200).send({status:true,data:postReply})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const updateComment = async function (req, res) {
    try {
        let data = req.body
        if(!data.commentId) return res.status(400).send({status:false,msg:"commentId is required"})
        if(!data.comment) return res.status(400).send({status:false,msg:"comment is required"})
        let findComment = await commentModel.findByIdAndUpdate(data.commentId, { comment: data.comment }, { new: true })
        if (!findComment) return res.status(400).send({ status: false, msg: "Comment not found for updation" })
        return res.status(200).send({ status: true, data: findComment })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteComment = async function (req, res) {
    try {
        let data = req.body
        if(!data.commentId) return res.status(400).send({status:false,msg:"commentId is required"})

        let findComment = await commentModel.findOne({_id:req.body.commentId,isDeleted:false})
        let findPost = await postModel.findOne({commentId:req.body.commentId,isDeleted:false})

        if(req.decode.userId!=findComment.userId.toString()){
            if(req.decode.userId!=findPost.userId.toString()) return res.status(404).send({status:false,msg:"You are not authorized"})
            else return res.status(404).send({status:false,msg:"You are not authorized"})
        }

        let deleteComment = await commentModel.findOneAndUpdate({ _id: data.commentId, isDeleted: false }, { isDeleted: true })
        if (!deleteComment) return res.status(400).send({ status: false, msg: "Comment not found for Deletion" })
        return res.status(200).send({ status: true, msg: "Comment Deleted Successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
//try for git pr
module.exports = { comment, updateComment, deleteComment, postReplay }