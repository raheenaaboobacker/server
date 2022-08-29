const express = require('express')
const app = express()
const bodyParser=require('body-parser');
const RegisterRouter = require('./src/routes/registerRouter')
const UserRouter = require('./src/routes/userRouter')
const ShopRouter = require('./src/routes/shopRouter')
const VolunteerRouter = require('./src/routes/volunteerRouter')
const FeedbackRouter = require('./src/routes/feedbackRouter')
const LoginRouter=require('./src/routes/loginRouter')
const subsidyRouter=require('./src/routes/subsidyRouter')
const cartRouter=require('./src/routes/cartRouter')
const cors=require('cors')
app.use(cors());
app.use(express.json())   //convert to json
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}))

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
 
  
 app.use('/',LoginRouter)
app.use('/register',RegisterRouter)
app.use('/ration',ShopRouter)
app.use('/volunteer',VolunteerRouter)
app.use('/user',UserRouter)
app.use('/feedback',FeedbackRouter)
app.use('/subsidy',subsidyRouter)
app.use('/cart',cartRouter)


app.listen(5000,()=>{
    console.log('server started at port 5000')
})