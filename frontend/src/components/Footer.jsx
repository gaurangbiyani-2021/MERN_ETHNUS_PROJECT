

const Footer = () => {
  return (
    <>
<div className=" flex mt-10 w-full bg-black px-8 md:px-[300px]  md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 ">
       <div className="flex flex-col text-white">
         <a href="/contactUs">Contact Us</a>
       </div>
       <div className="flex flex-col text-white">
         <a href="/about">About Us</a>
       </div>
    </div>
    <p className="py-2 pb-6 text-center text-white bg-blue-500 text-sm">All @NEWS WEBAPP 2023</p>
    </>
    
  )
}

export default Footer