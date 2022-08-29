const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcryptjs')
const volunteer = require('../models/volunteerData')
const login = require('../models/loginData')
const user = require('../models/userData')
const checkAuth=require("../middleware/check-auth");
const rationRegister=require("../models/rationShopData")
var ObjectId = require('mongodb').ObjectID;

userRouter.get('/view-user', (req, res) => {
    login.aggregate([
        {
          $lookup:
          {
            from:'user_tbs',
            localField:'_id',
            foreignField:'login_id',
                     
            as:"registerdetails"
          }
        },
        {
            $match:
            {
                role:"2"
            }
        }
       
    ]).then(function (data) {
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Data Found!"
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

userRouter.delete('/delete-user/:id', (req, res) => {
    const id = req.params.id   // login id 
    login.deleteOne({ _id: id }) .then(function () {
    user.deleteOne({ login_id: id })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'user deleted!'
            })
        })
    })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
})

userRouter.get('/view-user-profile/:id', (req, res) => {
    const id= req.params.id
    user.find({login_id:id}).then(function (data) {
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Data Found!"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: data
                })
            }
        }).catch((err) => {
            return res.status(401).json({
                success: false,
                error: true,
                message: err
            })
        })

})


userRouter.get("/view-user-Request",checkAuth,((req,res)=>{
    let id=req.userData.userId
    user.aggregate(
        [{
            $lookup: {
                from: 'login_tbs',
                localField: 'login_id',
                foreignField: '_id',
                as: 'userdata'
            }
        },
        {
            $unwind:'$userdata'
        }, {
            $lookup: {
                from: 'login_tbs',
                localField: 'shop_id',
                foreignField: '_id',
                as: 'shopdata'
            }
        },
        {
            $unwind:'$shopdata'
        },
    {
        $match:{
            shop_id:ObjectId(id)
        }
    }
]
    ).then(function(data){
        console.log("dataaaa",data);   
   res.status(200).json({
       success:true,
       error:false,
       data:data
   })
}) 
 }))
module.exports = userRouter