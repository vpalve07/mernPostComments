const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const user = async function (req, res) {
    try {
        let user = await userModel.create(req.body)
        return res.status(201).send({ status: true, data: user })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const login = async function(req,res){
    try {
        let data = req.body
        if(!data.password) return res.status(400).send({status:false,msg:"password is required"})
        if(!data.email) return res.status(400).send({status:false,msg:"email is required"})
        let {password,email} = data
        let findUser = await userModel.findOne({password:password,email:email})
        if(!findUser) return res.status(400).send({status:false,msg:"Invalid Credentials"})
        let payload = {userId:findUser._id.toString(),email:findUser.email}
        let token = jwt.sign(payload,'secretKey')
        return res.status(200).send({status:true,data:token})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { user, login }