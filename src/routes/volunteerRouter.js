const express = require('express')
const volunteerRouter = express.Router()
const bcrypt = require('bcryptjs')
const volunteer = require('../models/volunteerData')
const login = require('../models/loginData')


volunteerRouter.get('/view-volunteer', (req, res) => {
    login.aggregate([
        {
          $lookup:
          {
            from:'volunteer_tbs',
            localField:'_id',
            foreignField:'login_id',
                     
            as:"registerdetails"
          }
        },
        {
            $match:
            {
                role:"3"
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

volunteerRouter.delete('/delete-volunteer/:id', (req, res) => {
    const id = req.params.id   // login id 
    login.deleteOne({ _id: id }) .then(function () {
    volunteer.deleteOne({ login_id: id })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'volunteer deleted!'
            })
        })
    })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
    
})

volunteerRouter.get('/view-volunteer-profile/:id', (req, res) => {
    const id= req.params.id
    volunteer.find({login_id:id}).then(function (data) {
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


module.exports = volunteerRouter