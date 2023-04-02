const postModel = require('../models/postModel')
const aws = require('aws-sdk')

const uploadFile = async (files) => {

    return new Promise(function (resolve, reject) {
        aws.config.update({
            accessKeyId: "AKIAY3L35MCRZNIRGT6N",
            secretAccessKey: "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",
            region: "ap-south-1"
        })
        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        let uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "TNAP/productManagement/" + files.originalname,
            Body: files.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
    })
}
module.exports = { uploadFile }

const post = async function (req, res) {
    try {
        let data = req.body
        let files = req.files
        if (files && files.length > 0) {
            let uploadFileUrl = await uploadFile(files[0])
            data.postImg = uploadFileUrl
        }
        else {
            return res.status(400).send({ msg: "no files found" })
        }
        let createPost = await postModel.create(data)
        return res.status(201).send({ status: true, data: createPost })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getPost = async function(req,res){
    try {
        let post = await postModel.find()
        if (post.length==0) return res.status(400).send({ status: false, msg: "Posts not found" })
        return res.status(200).send({ status: true, data: post })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const updatePost = async function (req, res) {
    try {
        let data = req.body
        if(!data.postId) return res.status(400).send({status:false,msg:"PostId is required for updating the post"})
        let files = req.files
        if (files && files.length > 0) {
            let uploadFileUrl = await uploadFile(files[0])
            data.postImg = uploadFileUrl
        }
        let updatePost = await postModel.findByIdAndUpdate(data.postId, data, { new: true })
        if (!updatePost) return res.status(400).send({ status: false, msg: "Post not found for updation" })
        return res.status(201).send({ status: true, data: updatePost })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const deletePost = async function (req, res) {
    try {
        let data = req.body
        if(!data.postId) return res.status(400).send({status:false,msg:"postId is required"})

        let findPost = await postModel.findOne({_id:req.body.postId})
        if(req.decode.userId!=findPost.userId.toString()) return res.status(404).send({status:false,msg:"You are not authorized"})

        let deletePost = await postModel.findOneAndUpdate({ _id: data.postId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!deletePost) return res.status(400).send({ status: false, msg: "Post not found for Deletion" })
        return res.status(201).send({ status: true, msg: "Post Deleted Successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports = { post, getPost, updatePost, deletePost }