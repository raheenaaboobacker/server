const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/RationDB?retryWrites=true&w=majority')  //database connection
const Schema = mongoose.Schema    //schema definition

const FeedbackSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     comment:{ type: String, required: true },
   
})

var Feedbackdata = mongoose.model('feedback_tb',FeedbackSchema) //model creation
module.exports=Feedbackdata;