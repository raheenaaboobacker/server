const mongoose = require('mongoose')
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/e-rationdb?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority')  //database connection
const Schema = mongoose.Schema    //schema definition

const RationShopSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     shop_owner_name:{ type: String, required: true },
     location:{ type: String, required: true },
     phone:{ type: String, required: true },
     email:{ type: String, required: true },
          
      
})

var RationShopdata = mongoose.model('ration_shop_tb',RationShopSchema) //model creation
module.exports=RationShopdata;