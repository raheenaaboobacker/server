const express = require('express')
const cartRouter = express.Router()
const cart = require('../models/cartData')
const checkAuth=require("../middleware/check-auth");
var ObjectId = require('mongodb').ObjectID;

cartRouter.post('/addCartItem',checkAuth,((req,res)=>{
    console.log(req.body);
    console.log(req.userData.userId);
    var item = {
        login_id:req.userData.userId,
        subsidy_id:req.body.cardId,
        item:req.body.itemname,
        date:req.body.date
    }
    console.log(item);
    var products=cart(item);
    products.save().then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Added to cart!'
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed.please login"
        })
    })
}))

cartRouter.get('/viewCartItem/:id', (req, res) => {
    var id=req.params.id;
    console.log(id);
    cart.aggregate([
     {
        $lookup:
         {
            from: 'subsidy_tbs',
            localField: 'subsidy_id',
            foreignField: '_id',
            as: 'cartData'
         }
    },
    {
        $unwind:'$cartData'
    },  
    {
        $match:
        {
            login_id:ObjectId(id)
        }
    }
     ])
        .then(function (data) {
            console.log("data",data);
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Item Found!"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: data
                })
            }
        })

})
cartRouter.post("/updatecartqty",checkAuth,((req,res)=>{
  
    console.log(req.body);
    cart.updateOne({_id:req.body.id},{$set:{qty:req.body.qty}})
     .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'updated!'
        })
    })
}))
cartRouter.delete("/deletecartitem/:id",checkAuth,((req,res)=>{
  const id=req.params.id
    console.log(id);
    cart.deleteOne({_id:id})
     .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'deleted!'
        })
    })
}))



module.exports = cartRouter