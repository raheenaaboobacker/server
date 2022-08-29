const express = require('express')
const RegisterRouter = express.Router()
const bcrypt = require('bcryptjs')
const userRegister = require('../models/userData')
const rationRegister = require('../models/rationShopData')
const login = require('../models/loginData')
const volunteer = require('../models/volunteerData')



RegisterRouter.post('/user-register', (req, res) => {
    console.log("data " + JSON.stringify(req.body))
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'password hashing error'
            })
        }
        let logindata = {
            username: req.body.username,
            password: hashedPass,
            role: 2,
            status: 0
        }
        login.findOne({ username: req.body.username })
            .then(username => {
                if (username) {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: 'username already exist!'
                    })
                }
                else {
                    var item = login(logindata)
                    item.save()
                        .then(() => {
                            login.findOne({ username: logindata.username })
                                .then(function (details) {
                                    var id = details._id
                                    let registerdata = {
                                        login_id: id,
                                        shop_id: req.body.shop_id,
                                        name: req.body.name,
                                        age: req.body.age,
                                        card_no: req.body.card_no,
                                        card_type: req.body.card_type,
                                        phone: req.body.phone,
                                        address: req.body.address,
                                        members: req.body.members,
                                        
                                        
                                    }
                                    userRegister.findOne({ card_no: registerdata.card_no })
                                        .then((mobile) => {
                                            if (!mobile) {
                                                
                                                    var register_item = userRegister(registerdata)
                                                    register_item.save()
                                                        .then(() => {
                                                            res.status(200).json({
                                                                success: true,
                                                                error: false,
                                                                message: 'registration success'
                                                            })
                                                        })
                                              
                                            }
                                            else {
                                                console.log(id)
                                                login.deleteOne({ _id: id })
                                                    .then(() => {

                                                        res.status(401).json({
                                                            success: false,
                                                            error: true,
                                                            message: 'Ration Card number is already registered with us'
                                                        })


                                                    })

                                            }
                                        })


                                })

                        })

                }

            })
    })

})

RegisterRouter.post('/ration-register', (req, res) => {
    console.log("password" + req.body.username)
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'password hashing error'
            })
        }
        let logindata = {
            username: req.body.username,
            password: hashedPass,
            role: 1,
            status: 0
        }
        login.findOne({ username: req.body.username })
            .then(username => {
                if (username) {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: 'username already exist!'
                    })
                }
                else {
                    var item = login(logindata)
                    item.save()
                        .then(() => {
                            login.findOne({ username: logindata.username })
                                .then(function (details) {
                                    var id = details._id
                                    let registerdata = {
                                        login_id: id,
                                        shop_owner_name: req.body.shop_owner_name,
                                        location: req.body.location,
                                        phone: req.body.phone,
                                        email: req.body.email,
                                                                               
                                    }
                                    rationRegister.findOne({ phone: registerdata.phone })
                                        .then((mobile) => {
                                            if (!mobile) {
                                                
                                                    var register_item = rationRegister(registerdata)
                                                    register_item.save()
                                                        .then(() => {
                                                            res.status(200).json({
                                                                success: true,
                                                                error: false,
                                                                message: 'registration success'
                                                            })
                                                        })
                                              
                                            }
                                            else {
                                                console.log(id)
                                                login.deleteOne({ _id: id })
                                                    .then(() => {

                                                        res.status(401).json({
                                                            success: false,
                                                            error: true,
                                                            message: 'Phone number is already registered with us'
                                                        })


                                                    })

                                            }
                                        })


                                })

                        })

                }

            })
    })

})

RegisterRouter.post('/volunteer-register', (req, res) => {
    console.log("password" + req.body.username)
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'password hashing error'
            })
        }
        let logindata = {
            username: req.body.username,
            password: hashedPass,
            role: 3,
            status: 0
        }
        login.findOne({ username: req.body.username })
            .then(username => {
                if (username) {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: 'username already exist!'
                    })
                }
                else {
                    var item = login(logindata)
                    item.save()
                        .then(() => {
                            login.findOne({ username: logindata.username })
                                .then(function (details) {
                                    var id = details._id
                                    let registerdata = {
                                        login_id: id,
                                        shop_id: req.body.shop_id,
                                        name: req.body.name,
                                        address: req.body.address,
                                        phone: req.body.phone,
                                                                               
                                    }
                                    volunteer.findOne({ phone: registerdata.phone })
                                        .then((mobile) => {
                                            if (!mobile) {
                                                
                                                    var register_item = volunteer(registerdata)
                                                    register_item.save()
                                                        .then(() => {
                                                            res.status(200).json({
                                                                success: true,
                                                                error: false,
                                                                message: 'registration success'
                                                            })
                                                        })
                                              
                                            }
                                            else {
                                                console.log(id)
                                                login.deleteOne({ _id: id })
                                                    .then(() => {

                                                        res.status(401).json({
                                                            success: false,
                                                            error: true,
                                                            message: 'Phone number is already registered with us'
                                                        })


                                                    })

                                            }
                                        })


                                })

                        })

                }

            })
    })

})

RegisterRouter.post('/approve/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    login.updateOne(  { _id:id} , { $set: { status : 1  } } ).then((user)=>{
        console.log(user);
        res.status(200).json({
            success:true,
            error:false,
            message:"approved"
        })
        
    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
 
})





module.exports = RegisterRouter