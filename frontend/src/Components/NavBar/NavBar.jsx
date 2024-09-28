import React from "react";
import "./NavBar.css"; // Ensure Tailwind directives are imported if this CSS file is used
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-4 mb-5 border-b border-gray-400 shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-blue-600">Medscription</h1>
      <ul className="flex">
        <NavLink to="/" className="mx-2 px-4 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          <li>HOME</li>
        </NavLink>
        <NavLink to="/doctors" className="mx-2 px-4 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          <li>ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about" className="mx-2 px-4 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          <li>ABOUT</li>
        </NavLink>
        <NavLink to="/contact" className="mx-2 px-4 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
          <li>CONTACT</li>
        </NavLink>
      </ul>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Create Account
      </button>
    </div>
  );
};

export default NavBar;
