const userModel = require('../models/userModel')

const user = async function(req,res){
    let user = await userModel.create(req.body)
    res.status(201).send({status:true,data:user})
}

module.exports = {user}