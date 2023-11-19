import express from 'express';
const router = express.Router();
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import verifyToken from '../verifyToken.js';

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dsqx3hknt",
    api_key: "674583734234393",
    api_secret: "8M6u281j4BiOgm0MMFJMY1pLr9Y",
  });
  
  // Use memory storage for multer
  const upload=multer({
      storage: multer.diskStorage({}),
      fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          cb(new Error("Unsupported file type!"), false);
          return;
        }
        cb(null, true);
      },
    });
//create 
// create endpoint for post with image upload
router.post('/create', upload.single('file'), async (req, res) => {
    try {
        console.log("STared");
        // Check if a file was provided
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            // folder: 'your_folder_name', // optional
        });

        // Log the Cloudinary link
        console.log(result.secure_url);

        // Create a new Post with image URL
        const newPost = new Post({
            title: req.body.title,
            desc: req.body.desc,
            photo: result.secure_url, // Save Cloudinary image URL
            username: req.body.username,
            userId: req.body.userId,
            categories: req.body.categories,
        });

        // Save the post to the database
        const savedPost = await newPost.save();

        // Respond with the saved post
        res.status(200).json(savedPost);
    } catch (error) {
        console.error('Error creating post with image:', error);
        res.status(500).json('Internal Server Error');
    }
});

//update
router.put('/:id',verifyToken, async (req,res) => {
    try{       
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost);
    }
    catch(e){
        console.log(e);
        res.status(500).json(e)
    }
});

//delete

router.delete("/:id",verifyToken, async (req,res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId:req.params.id});
        res.status(200).json("Post has been deleted");
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//get post details 

router.get("/:id",async (req,res) => {
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//GET POSTS
router.get("/",async (req,res)=>{
    console.log("get all posts");
    const query=req.query
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    // console.log("done");

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER POSTS
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

//like

router.put("/like/:id",async(req, res) => {
    const id = req.params.id;
    
    try {
      const posts = await Post.findByIdAndUpdate(id,
        { $inc: { like: 1 } },
        { new: true }
    )
    res.status(200).json(posts)

    } catch (err) {
        res.status(500).json(err)
       console.log(err);
    }   
});

//dislike

router.put("/dislike/:id",async(req, res) => {
    const id = req.params.id;
    
    try {
      const post = await Post.findByIdAndUpdate(id,
        { $inc: { dislike: 1 } },
        { new: true }
    );
    if (post.dislike >= 2 * post.like) {
        // Delete the post
        await Post.findByIdAndDelete(id);
        await Comment.deleteMany({ postId: id });

        // Navigate to "/"
        res.status(200).json({ message: "Post deleted due to excessive dislikes" });
    } else {
        res.status(200).json(post);
    }
    
    res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err)
       console.log(err);
    } 

});

export default router