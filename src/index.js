let express = require('express')
let route = require('./route/route')
let mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://vinayakpalve02:VScSGgtY3DwHX9KY@cluster0.ka2f5rk.mongodb.net/testVScSGgtY3DwHX9KY",{
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use("/",route)
app.listen(3000,function(){
    console.log("Express app running on port 3000")
})