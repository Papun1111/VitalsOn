import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // All your original state and logic are preserved
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [isSignUp, setIsSignUp] = useState(true);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", phone: "" });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, credentials);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Registration successful!");
          setCredentials({ name: "", email: "", password: "", phone: "" });
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
          setCredentials({ email: "", password: "" });
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
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // All your original animation variants are preserved
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.01,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    // Inspired Styling: Clean off-white background.
    <div className="min-h-screen bg-[#FBF9F6] flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.form
          // Inspired Styling: A clean white card with subtle border and shadow.
          className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-200/80"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-8 text-center">
            {/* Inspired Styling: Elegant serif font for the heading. */}
            <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-gray-600">
              {isSignUp
                ? "Join us to manage your health with ease."
                : "Sign in to continue your health journey."}
            </p>
          </div>

          <div className="space-y-5">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition text-gray-700 font-medium"
                    onChange={onChangeHandler}
                    value={credentials.name}
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Phone</label>
                  <motion.input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition text-gray-700 font-medium"
                    onChange={onChangeHandler}
                    value={credentials.phone}
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email</label>
              <motion.input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition text-gray-700 font-medium"
                onChange={onChangeHandler}
                value={credentials.email}
                variants={inputVariants}
                whileFocus="focus"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
              <motion.input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition text-gray-700 font-medium"
                onChange={onChangeHandler}
                value={credentials.password}
                variants={inputVariants}
                whileFocus="focus"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            // Inspired Styling: Matches the primary button style used across the site.
            className="w-full mt-8 bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isSignUp ? "Create Account" : "Login"}
          </motion.button>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={toggleForm}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Login;