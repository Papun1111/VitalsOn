import React, { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext.jsx";
import { DoctorContext } from "../Context/DoctorContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (state === "Admin") {
        response = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
      } else {
        response = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
      }

      const { data } = response;
      if (data.success) {
        const token = data.token;
        if (state === "Admin") {
          localStorage.setItem('aToken', token);
          setAToken(token); 
        } else {
          localStorage.setItem('dToken', token);
          setDToken(token); 
        }
        toast.success("Login Successful!");
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 0.6 } }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-4">
      <motion.form 
        onSubmit={onSubmitHandler} 
        className="w-full max-w-sm"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-zinc-800 shadow-xl rounded-xl p-8 border border-zinc-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-zinc-100">
            <AnimatePresence mode="wait">
              <motion.span 
                key={state}
                className="text-lime-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {state}
              </motion.span>
            </AnimatePresence>
            {' '}Login
          </h1>
          <div className="mb-4">
            <label className="block text-zinc-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-colors"
              id="email"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-zinc-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-colors"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.button
              className="w-full bg-lime-400 hover:bg-lime-500 text-zinc-900 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-lime-500/50 transition-colors"
              type="submit"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <div className="text-sm text-zinc-400">
              {state === "Admin" ? (
                <p>
                  Doctor Login?{' '}
                  <span onClick={() => setState("Doctor")} className="text-lime-400 hover:text-lime-300 cursor-pointer font-semibold">
                    Click Here
                  </span>
                </p>
              ) : (
                <p>
                  Admin Login?{' '}
                  <span onClick={() => setState("Admin")} className="text-lime-400 hover:text-lime-300 cursor-pointer font-semibold">
                    Click Here
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
