const userModel = require('../models/userModel')

const user = async function(req,res){
try {
        let user = await userModel.create(req.body)
        return res.status(201).send({status:true,data:user})
} catch (error) {
    return res.status(500).send({status:false,msg:error.message})
}
}

module.exports = {user}