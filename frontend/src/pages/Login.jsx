import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      //fetch api
      const result = await axios.post('http://localhost:8800/api/auth/login', { email, password }, { withCredentials: true });
      setUser(result.data);
      console.log('login successful');
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-800 text-white">

        {/* Updated background color to match the Register component */}
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">NEWSIFY</Link>
        </h1>
        <h3>
          <Link to="/register">
            <b>Register</b>
          </Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-100">
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-[25%] bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center">Log in to your account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 outline-0 rounded-md"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 outline-0 rounded-md"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Log in
          </button>
          {error && <h3 className="text-red-500 text-sm text-center">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3 text-gray-600">
            <p>New here?</p>
            <p className="hover:text-gray-800">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      {/* ... (Footer component) */}
    </>
  );
};

export default Login;
