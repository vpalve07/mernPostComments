const express = require('express')
const { user } = require('../controllers/userController')

const router = express.Router()

router.get("/test_me",function(req,res){
    console.log("api is working")    
})

router.post("/postUser",user)
module.exports = router