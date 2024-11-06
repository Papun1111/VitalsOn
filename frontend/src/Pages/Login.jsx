import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [isSignUp, setIsSignUp] = useState(true); 
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
const navigate=useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const { data } = await axios.post(`${backendUrl}/api/user/register`,credentials);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Registration successful!");
          setCredentials({ name: "", email: "", password: "" });
          
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email: credentials.email,
          password: credentials.password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
          setCredentials({email: "", password: "" });
      
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  useEffect(() => {
   if(token){
    navigate("/")
   }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" onSubmit={onSubmitHandler}>
        <p className="text-lg font-semibold mb-4">
          Please {isSignUp ? "sign up" : "login"} to book an appointment
        </p>
        
        {isSignUp && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your full name"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={onChangeHandler}
              value={credentials.name}
            />
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={credentials.email}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={credentials.password}
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          {isSignUp ? "Create Account" : "Login"}
        </button>
        
        <p className="text-center mt-4">
          <button type="button" onClick={toggleForm} className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
            {isSignUp ? "Already have an account? Login" : "No account? Sign up"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
