const express = require('express')
const shopRouter = express.Router()
const bcrypt = require('bcryptjs')
const userRegister = require('../models/userData')
const rationRegister = require('../models/rationShopData')
const login = require('../models/loginData')


shopRouter.get('/view-shop', (req, res) => {
    
    login.find({role:1})
        .then(function (data) {
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

shopRouter.get('/delete-shop/:id', (req, res) => {
    const id = req.params.id   // login id 
    login.deleteOne({ _id: id })
    rationRegister.deleteOne({ login_id: id })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'shop deleted!'
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
})


module.exports = shopRouter