const express = require('express')
const subsidyRouter = express.Router()
const bcrypt = require('bcryptjs')
const subsidy = require('../models/subsidyData')



subsidyRouter.post('/add-subsidy', (req, res) => {
    console.log("subsidy====",req.body)
    var item={
        card_type:req.body.data,
        card_items:req.body.subsidyDetails
    }
    var messageitem = subsidy(item)
    messageitem.save()
    .then(()=>{
        res.status(200).json({
            success:true,
            error: false,
            message:'subsidy added'
        })
    })

})

subsidyRouter.get('/view-subsidy/:cardtype', (req, res) => {
    const datavalue=req.params.cardtype;
    console.log(datavalue);
   subsidy.findOne({card_type:datavalue})
   .then((data)=>{
    res.status(200).json({
        success:true,
        error: false,
        data:data
    })
})
.catch(err=>{
     return res.status(401).json({
         message: "something wrong"
     })
 })

}) 


subsidyRouter.post('/update-subsidy', (req, res) => {
    console.log(req.body);
    subsidy.updateOne({card_type:req.body.cardtype},{$set:{status:req.body.subsidydata}})
    .then((data)=>{
        console.log(data);
        res.status(200).json({
            success:true,
            error:false,
            message:"Updated"
        })
    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })

})




module.exports = subsidyRouter