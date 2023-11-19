import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import express from 'express';
const router = express.Router();

export const register = async(req,res)=>{
    try{
        // get the user details entered by the user
        const {username,email,password}=req.body
        // this is used for password encryption
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt)

        // insert the user value into the user object
        const newUser=new User({username,email,password:hashedPassword})
        //save the user details in mongodb database
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)
        console.log('register successful');
    }
    catch(err){
        res.status(500).json(err)
    }

}
//LOGIN
export const login = async (req,res)=>{
    try{

        // find if user exist in the database
        const user=await User.findOne({email:req.body.email})       
        if(!user){
            return res.status(404).json("User not found!")
        }
        // if user exist already then compare the password 
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }

        // if the password is correct then generate token for session data management 
        const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        // cookie will be set
        res.cookie("token",token).status(200).json(info)
        console.log("login successful");
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}


//LOGOUT
export const logout = async (req,res)=>{
    try{
        // clear the cookie 
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")
        console.log("logged out successfully");
    }
    catch(err){
        res.status(500).json(err)
    }
}

//refetch the user

export const refetch = (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
};

