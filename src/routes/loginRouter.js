const express = require('express')
const LoginRouter = express.Router()
const bcrypt = require('bcryptjs')
const userRegister = require('../models/userData')
const rationRegister = require('../models/rationShopData')
const login = require('../models/loginData')
const volunteer = require('../models/volunteerData')
const jwt = require('jsonwebtoken')

LoginRouter.post('/login',(req, res)=>{
    console.log("logindata====",req.body)
    let fetchedUser
    login.findOne({username: req.body.username})
    .then((user)=>{
       
        if(!user){
            return res.status(401).json({
                success:false,
                error:true,
                message:"User Not Found!"
            })
        }
            fetchedUser = user
            return bcrypt.compare(req.body.password, user.password)      
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                success:false,
                error:true,
                message:"Please Check Password!"
            })
        }
        id = fetchedUser._id
        console.log(fetchedUser);
        if(fetchedUser.role=="0"){
            userRegister.findOne({login_id:id})
                .then((registerData)=>{
                    const token = jwt.sign(
                        {username:fetchedUser.username, role:fetchedUser.role,
                            userId:fetchedUser._id},
                        "secret_this_should_be_longer",
                        { expiresIn: "1h" }
                    )
                    res.status(200).json({
                        success:true,
                        error:false,
                        token: token,
                        expiresIn: 3600,
                         role:fetchedUser.role,
                        loginId: fetchedUser._id,
                    })
                })
    }
        if(fetchedUser.role=="1"){
              if(fetchedUser.status=="1"){
            console.log("approved");
            rationRegister.findOne({login_id:id})
            .then((registerData)=>{
                const token = jwt.sign(
                    {username:fetchedUser.username, role:fetchedUser.role,
                        userId:fetchedUser._id},
                    "secret_this_should_be_longer",
                    { expiresIn: "1h" }
                )
                res.status(200).json({
                    success:true,
                    error:false,
                    token: token,
                    expiresIn: 3600,
                    username: fetchedUser.username,
                    role:fetchedUser.role,
                    loginId: fetchedUser._id,
                })
            })
     
        } 
        else{
            res.status(200).json({
                success:false,
                error:true,
              message:"request pending!!!!!!!!!!"
            })
        }
        }
        else if(fetchedUser.role=="2"){
            if(fetchedUser.status=="1"){
                console.log("approved");
                userRegister.findOne({login_id:id})
                .then((registerData)=>{
                    // console.log("membersss",registerData.members.length);
                    const token = jwt.sign(
                        {username:fetchedUser.username, role:fetchedUser.role,
                            userId:fetchedUser._id},
                        "secret_this_should_be_longer",
                        { expiresIn: "1h" }
                    )

                    res.status(200).json({
                        success:true,
                        error:false,
                        token: token,
                        expiresIn: 3600,
                         role:fetchedUser.role,
                        loginId: fetchedUser._id,
                        name: registerData.name,
                        card_type:registerData.card_type,
                        member_count:registerData.members.length+1
                    })
                })
         
            }
            else{
                res.status(200).json({
                    success:false,
                    error:true,
                  message:"request pending!!!!!!!!!!"
                })
            }
        }
        else if(fetchedUser.role=="3"){
            if(fetchedUser.status=="1"){
                console.log("approved");
                volunteer.findOne({login_id:id})
                .then((registerData)=>{
                    const token = jwt.sign(
                        {username:fetchedUser.username, userRole:fetchedUser.role,
                            userId:fetchedUser._id},
                        "secret_this_should_be_longer",
                        { expiresIn: "1h" }
                    )
                    res.status(200).json({
                        success:true,
                        error:false,
                        token: token,
                        expiresIn: 3600,
                         role:fetchedUser.role,
                        loginId: fetchedUser._id,
                        name: registerData.name
                    })
                })
         
            }
            else{
                res.status(200).json({
                    success:false,
                    error:true,
                  message:"request pending!!!!!!!!!!"
                })
            }
        }
       
       
       
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed"
        })
    })
})

module.exports = LoginRouter