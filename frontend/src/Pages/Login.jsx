import React, { useEffect, useState } from 'react';

const Login = () => {
  const [state, setState] = useState("Sign up"); 
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials((data) => ({ ...data, [name]: value }));
  };
  const onSubmit=(e)=>{
e.preventDefault();
  }
  const toggleForm = () => {
    setState(current => (current === "Sign up" ? "Login" : "Sign up"));
  };
useEffect(()=>{
console.log(credentials);
},[credentials])
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
        <p className="text-lg font-semibold mb-4">
          Please {state.toLowerCase()} to book an appointment
        </p>
        
        {state === "Sign up" && (
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
            value={credentials.email}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={onChangeHandler}
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
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>
        <p className="text-center mt-4">
          <button type="button" onClick={toggleForm} className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
            {state === "Sign up" ? "Already have an account? Login" : "No account? Sign up"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
