const express=require('express')
const morgon=require('morgan')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB = require('./MVC/config/connectDB')
const router = require('./MVC/route/userRoute')
const path=require('path')
const app=express()
// config dotenv
dotenv.config()
// call db
connectDB()
// middleware
app.use(morgon('dev'))
app.use(express.json())
app.use(cors())
// route
app.use("/api/v1/user", router);
app.use("/api/v1/transection",require('./MVC/route/transactionRoute.js'))
// files 
app.use(express.static(path.join(__dirname,'./client/dist')))
app.get("*",function (req,res) {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
})
// listen
const PORT=8080||process.env.PORT
app.listen(PORT,()=>{
    console.log("listenin to port "+PORT)
})