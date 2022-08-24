const mongoose = require('mongoose')
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/e-rationdb?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority')  //database connection
const Schema = mongoose.Schema    //schema definition

const UserSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     shop_id:{ type: Schema.Types.ObjectId, ref: "ration_shop_tb", required: true },
     name:{ type: String, required: true },
     age:{ type: String, required: true },
     card_no:{ type: String, required: true },
     card_type:{ type: String, required: true },
     phone:{ type: String, required: true },
     address:{ type: String, required: true },
     members:{ type: Array, required: true },
     

      
})

var Userdata = mongoose.model('user_tb',UserSchema) //model creation
module.exports=Userdata;