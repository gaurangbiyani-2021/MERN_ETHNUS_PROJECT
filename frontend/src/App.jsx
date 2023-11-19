import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import MyBlogs from './pages/MyBlogs'

import { UserContextProvider } from './context/UserContext'

export default function App() {

  const dash = () => {
    window.location.href = "./src/pages/home.html";
    return <></>;
  };
  
  return (
    
    <UserContextProvider>
        <Routes>
          
          <Route exact path='/dashboard' element={<dash/>}/> 
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/posts/post/:id" element={<PostDetails/>}/>  
          <Route exact path="/write" element={<CreatePost/>}/>
          <Route exact path="/edit/:id" element={<EditPost/>}/>
          <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
          <Route exact path="/profile/:id" element={<Profile/>}/>
        </Routes>
    </UserContextProvider>
  )
}
