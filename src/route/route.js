const express = require('express')
const { comment, updateComment, deleteComment, postReplay } = require('../controllers/commentController')
const { post, updatePost, deletePost, getPost } = require('../controllers/postController')
const { user, login } = require('../controllers/userController')
const { objectIdCheck, validateToken, updateAuth } = require('../middlewares/authorization')

const router = express.Router()

router.get("/test_me", function (req, res) {
    console.log("api is working")
})

router.post("/user", user)

router.post("/login",login)

router.post("/postImg", objectIdCheck, validateToken, post)

router.get("/getPost", getPost)

router.put("/updatePost", objectIdCheck, validateToken, updateAuth, updatePost)

router.delete("/deletePost", objectIdCheck, validateToken, deletePost)

router.post("/postComment", objectIdCheck, validateToken, comment)

router.delete("/deleteComment", objectIdCheck, validateToken, deleteComment)

router.put("/updateComment", objectIdCheck, validateToken, updateAuth, updateComment)

router.post("/postReplay", objectIdCheck, postReplay)


module.exports = router