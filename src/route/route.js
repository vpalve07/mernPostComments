const express = require('express')
const { comment, updateComment, deleteComment, postReplay } = require('../controllers/commentController')
const { post, updatePost, deletePost, getPost } = require('../controllers/postController')
const { user, login } = require('../controllers/userController')

const router = express.Router()

router.get("/test_me", function (req, res) {
    console.log("api is working")
})

router.post("/user", user)

router.post("/login",login)

router.post("/postImg", post)

router.get("/getPost",getPost)

router.put("/updatePost", updatePost)

router.delete("/deletePost", deletePost)

router.post("/postComment", comment)

router.delete("/deleteComment", deleteComment)

router.put("/updateComment", updateComment)

router.post("/postReplay",postReplay)


module.exports = router