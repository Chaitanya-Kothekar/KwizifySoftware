import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import manImg from '../assets/images/login-security-9747673-7914398.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      console.log(response.data);
      toast.success('Signup Successful');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response.data);
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-900">
      <div className="bg-purple-800 rounded-3xl h-[80vh] w-[23vw] p-8 shadow-black shadow-2xl">
        <h2 className="text-2xl text-white font-semibold mb-6">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="text-white hover:text-black hover:bg-white w-full shadow-lg transform hover:shadow-2xl transition-shadow duration-300 px-3 py-2 text-sm text-gray-700 bg-purple-600 rounded focus:outline-none"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full text-white hover:text-black hover:bg-white shadow-lg transform hover:shadow-2xl transition-shadow duration-300 px-3 py-2 text-sm text-gray-700 bg-purple-600 rounded focus:outline-none"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-white text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="text-white hover:text-black hover:bg-white w-full shadow-lg transform hover:shadow-2xl transition-shadow duration-300 px-3 py-2 text-sm text-gray-700 bg-purple-600 rounded focus:outline-none"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 mt-[3.5vh] text-gray-400"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          <button type="submit" className="relative font-extrabold px-5 mt-4 text-center py-2 w-full text-white group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
            <span className="relative">Signup</span>
          </button>
        </form>
        <div className="mt-4 text-center text-yellow-300">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-purple-300">
              Log in
            </Link>
          </p>
        </div>
        <div className="flex justify-center mt-[-1vh]">
          <img className="absolute h-[24vh]" src={manImg} alt="manIMg" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
