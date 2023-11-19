import mongoose from 'mongoose'

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,
        
    },
    username:{
        type:String,
        required:true,  
    },
    userId:{
        type:String,
        required:true,  
    },
    categories:{
        type:Array,
        
    },
    like: {
        type: Number,
        default: 0, 
    },
    dislike: {
        type: Number,
        default: 0,
    },
},{timestamps:true})

export default mongoose.model("Post",PostSchema)