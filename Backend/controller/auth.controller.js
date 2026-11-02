import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signUp = async(req,res, next)=>{

    const{userName, password, email} = req.body || {}
    console.log(req.body)

    if(!userName || !password || !email || userName==="" || password==="" || email==="" ){
        return next(errorHandler(400,"All fields are required"))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({
        userName, 
        password:hashedPassword, 
        email})

    try{
        await newUser.save()
        res.json("Sign Up successful")
    }catch(err){
        res.status(500).json({message:err})
        console.log(err)
    }
    
}

export const signIn = async(req,res, next)=>{
    const {email, password} = req.body || {}

    if(!password || !email || password==="" || email==="" ){
        return next(errorHandler(400,"All fields are required"))
    }

    try{
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(404,"User not found"))
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(400, "Wrong Credentials"))
        }

        const token = jwt.sign(
            {id:validUser._id, isAdmin:validUser.isAdmin},
            process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc

        res
        .status(200)
        .cookie("access_token",token,{httpOnly:true})
        .json(rest)

    }catch(error){
        next(error)
    }

}

export const google = async(req,res,next)=>{
    const {email, name,profilePhotoUrl} = req.body

    try{
        const user = await User.findOne({email})

        if(user){
           const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET)

           const {password:pass, ...rest} = user._doc

           return res
           .status(200)
           .cookie("access_token",token,{httpOnly:true}).json(rest)

        }

        const generatedPassword = 
        Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8)

        const hashedPassword = bcrypt.hashSync(generatedPassword,10)

        const newUser = new User({
            userName:name.toLowerCase().split(" ").join("")+Math.random().toString(9).slice(-4),
            email,
            password:hashedPassword,
            profilePicture:profilePhotoUrl,
        })
        await newUser.save()

        const token = jwt.sign({id:newUser._id, isAdmin: newUser.isAdmin},process.env.JWT_SECRET)
        const {password:pass, ...rest} = newUser._doc

        return res 
        .status(200)
        .cookie("access_token",token,{
            httpOnly:true,
        }).json(rest)

    }catch(error){
        next(error)
    }
}
