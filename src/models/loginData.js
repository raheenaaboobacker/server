const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/RationDB?retryWrites=true&w=majority') 
const Schema = mongoose.Schema    

const LoginSchema = new Schema({
     username: String,
     password: String,
     role: String,
     status: String,
    
})

var Logindata = mongoose.model('login_tb',LoginSchema) 
module.exports=Logindata;