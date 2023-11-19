import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Comment from '../components/Comment'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { useState,useEffect, useContext,useRef} from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import Loader from '../components/Loader'
import { Navigate, useNavigate } from 'react-router-dom'


const PostDetails = () => {
    const postId = useParams().id;
    console.log("postId is : " + postId)
    const [hasLiked, setHasLiked] = useState(false);
    const [post,setPost] = useState([])
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const[comments,setComments] = useState([]);
    const [comment,setComment] = useState("");
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);

    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [file,setFile] = useState(null)
    const [cats,setCats] = useState("")

    const fetchPost = async ()=>{
        try {
            const res = await axios.get("https://newsify-3azj.onrender.com/api/posts/"+postId); 
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setFile(res.data.photo);
            setCats(res.data.categories);
            setLike(res.data.like);
            setDislike(res.data.dislike);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchPost()
    },[postId])

  
    const handleLikeClick = async () => {
        
        if(!hasLiked){
        const post ={
            title,
            desc,
            userId:user._id,
            categories:cats,
            like:like+1
        }
        setLike(like +1);
        setHasLiked(true);
        console.log("post >>>>> "+post);

        try{
            const res=await axios.put("https://newsify-3azj.onrender.com/api/posts/"+postId,post,{withCredentials:true})
            navigate("/posts/post/"+res.data._id)
            console.log("result : " + res.data)
    
        }
        catch(err){
           
            console.log("user has already liked the post")
            console.log(err)
        }
    }else{
        console.log('User has already liked the post.');
    }

      console.log(like);
    };
  
    const handleDislikeClick =async () => {
      
        const post ={
            title,
            desc,
            
            userId:user._id,
            categories:cats,
            dislike:dislike+1
        }
        setDislike(dislike +1);
        console.log("post >>>>> "+dislike);

        if(dislike >10){
            const res = await axios.delete("http://localhost:8800/api/posts/"+postId,{withCredentials:true});
            navigate("/")
        }

        try{
            const res=await axios.put("https://newsify-3azj.onrender.com/api/posts/"+postId,post,{withCredentials:true})
            navigate("/posts/post/"+res.data._id)
            console.log("result : " + res.data)
    
        }
        catch(err){
            console.log(err)
        }
    };


    const fetchPosts = async () => {
        try {
            const res = await axios.get("https://newsify-3azj.onrender.com/api/posts/"+postId);
            console.log(res.data);
            setPost(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchPosts();
    },[postId]);


    const handleDeletePost = async () => {
        try {   
            const res = await axios.delete("https://newsify-3azj.onrender.com/api/posts/" + postId,{withCredentials:true});
            console.log("deleted successfully");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPostComments = async () => {
        try {
            const res = await axios.get("https://newsify-3azj.onrender.com/api/comments/post/"+postId);
            setComments(res.data);

        } catch (error) {
            console.log(error);
        }
    }
        
    useEffect(()=>{
        fetchPostComments();
    },[postId]);


    const postComments = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://newsify-3azj.onrender.com/api/comments/create",{comment:comment,author:user.username,postId:postId,userId:user._id},{withCredentials:true});
            console.log(res.data);
            fetchPostComments();
            setComment("");

            window.location.reload(true);

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <Navbar/>
           <div className="px-8 md:px-[200px]mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title} </h1>
                {user?._id === post ?.userId && <div className="flex items-center justify-center space-x-2">
                    <p className='cursor-pointer' onClick={()=>navigate("/edit/"+postId)}><BiEdit/></p>
                    <p className='cursor-pointer' onClick={handleDeletePost}><MdDelete/></p>
                </div>}
            </div>
            
            <div className="flex items-center justify-between mt-2 md:mt-4">
                <p>@{post.username}</p>

                <div className="flex space-x-2">
                    <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                    <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
                </div>
            </div>



            <img src={post.photo} className="w-[500px] h-[300px] mx-auto mt-8" alt=""/>
           
            <p className="mx-auto mt-8">{post.desc}</p>
            <div className="flex items-center mt-8 space-x-4 font-semibold">
                <p>Categories : </p>
                <div className="flex justify-center items-center space-x-2">
                    {post.categories?.map((c,i)=>(
                        <>
                            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
                        </>
            
                    ))}
                </div>
            </div>
            <div className='flex items-center space-x-2 mt-6'>  
                <button onClick={handleLikeClick} className=' flex rounded-lg border-2 bg-gray-300 p-2 w-[5%] font-weight: 200 font-size: 10px space-x-30 mr-3'>
                    <div className='mr-3'><FaRegThumbsUp /></div> {like}
                </button>
                <button onClick={handleDislikeClick} className='flex rounded-lg border-2 bg-gray-300 p-2 w-[5%] font-weight: 200 font-size: 10px'><div className='mr-3'><FaRegThumbsDown /></div>{dislike}</button>
            </div>
            

            <div className='flex flex-col mt-4'>
                <h3 className="mt-6 mb-4 font-semibold"> Comments : </h3>
                {comments?.map((c)=>(
                        <Comment key={c._id} c={c} post={post}/>
                ))}
                   
                <div className="w-full flex flex-col mt-4 md:flex-row">
                    <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
                    <button onClick={postComments} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
                </div>
                </div>
            </div>
        <Footer/>
    </div>
  )
}

export default PostDetails
