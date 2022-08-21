const express = require('express')
const app = express()

const RegisterRouter = require('./src/routes/registerRouter')
const LoginRouter = require('./src/routes/loginRouter')

app.use(express.json())



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
 
  app.use(express.urlencoded({extended:true})) 
app.use('/register',RegisterRouter)
// app.use('/login',LoginRouter)



app.listen(6000,()=>{
    console.log('server started at port 6000')
})