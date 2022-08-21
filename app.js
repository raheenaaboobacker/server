const express = require('express')
const app = express()
const bodyParser=require('body-parser');
const RegisterRouter = require('./src/routes/registerRouter')
const UserRouter = require('./src/routes/userRouter')
const ShopRouter = require('./src/routes/shopRouter')
const VolunteerRouter = require('./src/routes/volunteerRouter')
const FeedbackRouter = require('./src/routes/feedbackRouter')

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
 
  
 
app.use('/register',RegisterRouter)
app.use('/ration',ShopRouter)
app.use('/volunteer',VolunteerRouter)
app.use('/user',UserRouter)
app.use('/feedback',FeedbackRouter)



app.listen(6000,()=>{
    console.log('server started at port 6000')
})