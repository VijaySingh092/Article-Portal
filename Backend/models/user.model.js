import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User