import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.js';
import userRoute from './controller/user.js';
import postRoute from './controller/post.js';
import commentRoute from './controller/comment.js';
import uploadRoute from './controller/upload.js';
import cors from "cors";
import multer from 'multer';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Use express.json() for parsing JSON bodies
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser());

// app.use("/images",express.static(path.join(__dirname,"/images")))


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('mongodb connection started');
    } catch (e) {
        console.log('failed to connect to MongoDB', e);
    }
}

app.listen(8800, () => {
    connectDB();
    console.log("connected to server !");
});
//localhost:8800/api/auth
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/upload", uploadRoute);


// image upload routes

// storage for multer
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"./images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img);
    }
})

const upload = multer({storage:storage})

// app.post("api/upload",upload.single("file"),(req,res)=>{
//     res.status(200).json("image uploaded successfully");
// })

