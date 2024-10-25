import React, { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../Context/DoctorContext.jsx";


const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
const{setDToken}=useContext(DoctorContext);
const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    let response;
    if (state === "Admin") {
      response = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });
    } else {
      response = await axios.post(backendUrl + "/api/doctor/login", { 
        email,
        password,
      });
    }

    const { data } = response;
    if (data.success) {
      const token = data.token;
      if (state === "Admin") {
        localStorage.setItem(`aToken`, token);
        setAToken(token); 
      } else {
        localStorage.setItem(`dToken`, token);
        setDToken(token); 
      }
      toast.success("Successful!");
    } else {
      toast.error(data.message); 
    }
  } catch (error) {
    console.log("Error:", error);
    toast.error("An error occurred. Please try again.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transform transition duration-500 ease-in-out hover:scale-105">
          <p className="text-2xl font-bold mb-6 text-center text-gray-800">
            <span className="text-blue-600 animate-pulse">{state}</span> Login
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500"
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-300 ease-in-out hover:scale-110 w-full"
              type="submit"
            >
              Login
            </button>
            <div className="text-sm text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">
              {state === "Admin" ? (
                <p>
                  Doctor Login{" "}
                  <span
                    onClick={() => setState("Doctor")}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer underline"
                  >
                    Click Here
                  </span>
                </p>
              ) : (
                <p>
                  Admin Login{" "}
                  <span
                    onClick={() => setState("Admin")}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer underline"
                  >
                    Click Here
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
