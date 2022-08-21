const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/RationDB?retryWrites=true&w=majority')  //database connection
const Schema = mongoose.Schema    //schema definition

const VolunteerSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     shop_id:{ type: Schema.Types.ObjectId, ref: "ration_shop_tb", required: true },
     name:{ type: String, required: true },
     address:{ type: String, required: true },
     phone:{ type: String, required: true },
     email:{ type: String, required: true },
      
})

var Volunteerdata = mongoose.model('volunteer_tb',VolunteerSchema) //model creation
module.exports=Volunteerdata;