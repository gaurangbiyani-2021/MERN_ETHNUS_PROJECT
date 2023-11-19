import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ContactUs = () => {
  const [mail, setMail] = useState("");

  useEffect(() => {
    localStorage.setItem('mailKey', JSON.stringify(mail));
  }, [mail]);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    localStorage.setItem('problemKey', JSON.stringify(problem));
  }, [problem]);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-800 text-white">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">NEWSIFY</Link>
      </h1>
    </div>
    <div className="w-full flex justify-center items-center h-[80vh] bg-gray-100">
      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-left">Contact Us</h1>
        <input
          onChange={(e) => setMail(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 outline-0 rounded-md"
          type="text"
          placeholder="Enter your email"
        />
        <input
          onChange={(e) => setProblem(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 outline-0 rounded-md"
          type="password"
          placeholder="Enter your problem"
        />
        <button
          className="w-full px-4 py-4 text-lg font-bold text-white bg-gray-800 rounded-md hover:bg-gray-700"
        >
          Send
        </button>
      </div>
    </div>
  </>
  )
}

export default ContactUs
