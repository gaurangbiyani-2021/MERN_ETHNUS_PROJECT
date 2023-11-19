import express from 'express';
const router = express.Router();
import Post from '../models/Post.js';
import verifyToken from '../verifyToken.js';
import Comment from '../models/Comment.js';


//create 
router.post("/create",verifyToken, async (req,res)=>{
    try{
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        
        res.status(200).json(savedComment)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
})

//update
router.put('/:id',verifyToken, async (req,res) => {
    try{       
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e)
    }
});

//delete

router.delete("/:id",verifyToken, async (req,res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment has been deleted");
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//GET POST COMMENTS
router.get("/post/:postId",async (req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})

export default router