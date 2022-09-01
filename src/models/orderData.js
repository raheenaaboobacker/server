const mongoose = require('mongoose')
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/e-rationdb?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority') 
const Schema = mongoose.Schema    //schema definition

const orderSchema = new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"} ,
    shop_id:{type:Schema.Types.ObjectId,ref:"ration_shop_tb"} ,
    subsidydata:{type:Array,required: true},
    date:{ type: String, required: true },
    orderstatus:{ type: String, required: true },
    paymentstatus:{type:String,required: true},
    total:{type:String,required: true},
})

var orderdata = mongoose.model('order_tb',orderSchema) //model creation
module.exports=orderdata;