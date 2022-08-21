const express = require('express')
const RegisterRouter = express.Router()
const bcrypt = require('bcryptjs')
const userRegister = require('../models/userData')
const rationRegister = require('../models/rationShopData')
const login = require('../models/loginData')
const app = express()


app.post('/user-register', (req, res) => {
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
            role: 2
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
                                        members: req.body.menbers
                                        
                                    }
                                    register.findOne({ phone: registerdata.phone })
                                        .then((mobile) => {
                                            if (!mobile) {
                                                
                                                    var register_item = register(registerdata)
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



module.exports = RegisterRouter