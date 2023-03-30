const express = require('express')
const { comment, updateComment, deleteComment } = require('../controllers/commentController')
const { post, updatePost, deletePost } = require('../controllers/postController')
const { user } = require('../controllers/userController')

const router = express.Router()

router.get("/test_me",function(req,res){
    console.log("api is working")    
})

router.post("/User",user)

router.post("/PostImg",post)

router.put("/UpdatePost",updatePost)

router.delete("/DeletePost",deletePost)

router.post("/PostComment",comment)

router.delete("/DeleteComment",deleteComment)

router.put("/UpdateComment",updateComment)


module.exports = router