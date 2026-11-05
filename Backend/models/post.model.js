import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        default:"uncategorized"
    },
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/1177502660/photo/young-woman-reading-the-news-on-a-modern-tablet-computer-while-sitting-in-her-living-room.jpg?s=2048x2048&w=is&k=20&c=sB6Mz1v3_JTCYb2Q9B5gUqKafpENo3rjZ14O1AIjPko="
    },
    content:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
}, {timestamps: true})

const Post = mongoose.model("Post",postSchema)

export default Post