// import { Link, useLocation, useNavigate } from "react-router-dom"
// import {BsSearch} from 'react-icons/bs'
// import {FaBars} from 'react-icons/fa'
// import { useContext, useState } from "react"
// import Menu from "./Menu"
// import { UserContext } from "../context/UserContext"



// const Navbar = () => {
  
//   const [prompt,setPrompt]=useState("")
//   const [menu,setMenu]=useState(false)
//   const navigate=useNavigate()
//   const path=useLocation().pathname
  
//   // console.log(prompt)
  

//   const showMenu=()=>{
//     setMenu(!menu)
//   }
  
   
//     const {user}=useContext(UserContext)
    
//   return (
//     <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
//     <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">NEWS WEBAPP</Link></h1>
//     {path==="/" && <div className="flex justify-center items-center space-x-0">
//     <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch/></p>
//     <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 " placeholder="Search a post" type="text"/>
    
//     </div>}
//     <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
//       {user? <h3><Link to="/write">Write</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
//       {user? <div onClick={showMenu}>
//         <p className="cursor-pointer relative"><FaBars/></p>
//         {menu && <Menu/>}
//       </div>:<h3><Link to="/register">Register</Link></h3>}
//     </div>
//     <div onClick={showMenu} className="md:hidden text-lg">
//       <p className="cursor-pointer relative"><FaBars/></p>
//       {menu && <Menu/>}
//     </div>

//     </div>
//   )
// }

// export default Navbar 


import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"



const Navbar = () => {

  const [prompt,setPrompt] = useState("")
  console.log(prompt);
  const [menu,setMenu]=useState(false)
  const navigate = useNavigate()

  const showMenu=()=>{
    setMenu(!menu)
  }
   
    const {user}=useContext(UserContext)
    
  return (

    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 ">
    <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">NEWSIFY</Link></h1>
    <div className="flex justify-center items-center space-x-0">
    <p onClick={()=>navigate(prompt ? "?search="+prompt : navigate("/"))} className="cursor-pointer mr-4"><BsSearch/></p>
    <input onChange={(e)=>setPrompt(e.target.value)} className="outline w-[500px] outline-offset-2 px-3 " placeholder="Search a post" type="text"/>
    
    </div>
    <div className="hidden mr-3 ml-3 md:flex items-center justify-center space-x-2 md:space-x-4">
      {user? 
        <a href="/write" class="relative inline-block px-4 py-2 font-medium group">
        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span class="relative text-black group-hover:text-white">Write</span>
        </a>
        // <h3><Link to="/write">Write</Link></h3> 
        :<h3><Link to="/login">Login</Link></h3>}
      {user? <div onClick={showMenu}>
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>:
      
      <h3><Link to="/register">Register</Link></h3>}
      
      <a href="/team" class="relative inline-block px-4 py-2 font-medium group">
        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span class="relative text-black group-hover:text-white">About us</span>
      </a>
      {/* <h3><Link to="/team">About Us</Link></h3> */}
    </div>
    <div onClick={showMenu} className="md:hidden text-lg">
      <p className="cursor-pointer relative"><FaBars/></p>
      {menu && <Menu/>}
    </div>

    </div>
  )
}

export default Navbar 