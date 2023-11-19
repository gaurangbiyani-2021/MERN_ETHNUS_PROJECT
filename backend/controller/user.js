import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import verifyToken from "../verifyToken.js";
// const verifyToken = require('../verifyToken')

// update 
router.put("/:id",verifyToken, async (req,res)=>{
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedUser)
            console.log("updated user");
        }
        catch(err){
            res.status(500).json(err)
        }
})

// delete 

 router.delete("/:id",verifyToken,async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})

        res.status(500).json("user has been deleted successfully");

    } catch (error) {
        res.status(500).json(err)
    }
});

// get user by id 

router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})

export default router;

