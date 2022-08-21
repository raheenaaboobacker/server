const express = require('express')
const feedbackRouter = express.Router()
const bcrypt = require('bcryptjs')
const feedback = require('../models/feedbackData')



feedbackRouter.get('/view-feedback', (req, res) => {
    feedback.find()
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

feedbackRouter.get('/delete-feedback/:id', (req, res) => {
    const id = req.params.id   // login id 
    feedback.deleteOne({_id: id })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'feedback deleted!'
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
})


module.exports = feedbackRouter