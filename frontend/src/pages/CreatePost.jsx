import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import {ImCross} from 'react-icons/im'
import { useState } from 'react'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'

const CreatePost = () => {
    
    const navigate = useNavigate(); 

    //for individual category
    const [cat,setCat] = useState("")
    //for array of category
    const [cats,setCats] = useState([])

    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [file,setFile] = useState(null)

    const {user} = useContext(UserContext)

    const deleteCategory=(i)=>{
        let updatedCats=[...cats]
        updatedCats.splice(i)
        setCats(updatedCats)
     }
 
     const addCategory=()=>{
         let updatedCats=[...cats]
         updatedCats.push(cat)
         setCat("")
         setCats(updatedCats)
     }

     const handleCreate = async (e) => {
        e.preventDefault();
    
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats
        };
    
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("file", file);
            data.append("title", title);
            data.append("desc", desc);
            data.append("username", user.username);
            data.append("userId", user._id);
            data.append("categories", JSON.stringify(cats));
            
            try {
                // Upload image and other form data
                const imgUpload = await axios.post("http://localhost:8800/api/posts/create", data, {
                    headers: {
                        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(imgUpload.data);
                console.log("Image uploaded successfully");
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        }
    
        // try {
        //     // You might need to adjust the endpoint and headers based on your API
        //     const res = await axios.post("http://localhost:8800/api/posts/create", post, { withCredentials: true });
        //     console.log("Post created successfully");
        //     navigate("/posts/post/" + res.data._id);
        // } catch (err) {
        //     console.log(err);
        // }
    };
    
 
  return (

    <div>
        <Navbar/>
        
        <div className='px-6 md:px-[200px] mt-8'>
            <h1 className='font-bold md:text-2xl text-xl'>Create a Post</h1>

            <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                <input onChange={(e)=>setTitle(e.target.value)} type='text' placeholder='enter post title' className='px-4 py-2 outline-none'/>
                <input onChange={(e)=>setFile(e.target.files[0])} type='file' className='px-4'/>

                <div className='flex flex-col'>
                    <div className='flex items-center space-x-4 md:space-x-8'>
                        <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='enter post category' type='text'/>
                        <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                    </div>

                    {/*category*/}
                    <div className='flex px-4 mt-3'>
                        {cats?.map((c,i)=>(
                            <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                            <p>{c}</p>
                            <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
                        </div>
                        ))}
                    </div>
                </div>
                <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description'/>
                <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>
            </form>

        </div>
        <Footer/>
    </div>
  )
}

export default CreatePost