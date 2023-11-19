
 import { AiFillGithub } from "react-icons/ai";
 import { MdOutlineEmail } from "react-icons/md";
 const Footer = () => {
   return (
     <>
 <div className=" flex mt-10 w-full bg-black px-8 md:px-[300px]  md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 ">
        <div className="flex  flex-col text-white">
          <a href="/contactUs">Contact Us</a>
        </div>
        <div className="flex flex-col text-white text-[40px]">
          <a href='https://github.com/gaurangbiyani-2021/MERN_ETHNUS_PROJECT'><AiFillGithub/></a>  
        </div>
        <div className="flex flex-col text-white text-[40px]">
          <MdOutlineEmail/>
        </div>
        <div className="flex flex-col text-white">
          <a href="/team">Our Team</a>
        </div>
     </div>
  
     <p className="py-2 pb-6 text-center text-white bg-black text-sm" >All @NEWS WEBAPP 2023</p>
     </>
  
   )
 }
 export default Footer
