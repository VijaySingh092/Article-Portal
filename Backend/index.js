import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})

app.listen(5000,()=>{
    console.log("server is running on PORT 5000")
})

