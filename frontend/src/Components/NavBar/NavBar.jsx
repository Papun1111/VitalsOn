import React, { useState } from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // You can remove this if not used anywhere
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between px-5 py-3 mb-5 border-b border-gray-400 shadow-lg bg-white">
      <h1 className="text-xl md:text-2xl font-bold text-blue-600">
        Medscription
      </h1>
      <ul className="flex flex-col md:flex-row md:space-x-4 mt-3 md:mt-0 ml-auto">
        <li>
          <NavLink
            exact="true"
            to="/"
            className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
          >
            ALL DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="px-3 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
          >
            CONTACT
          </NavLink>
        </li>
      </ul>
      <div>
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className="w-2.5 " src={assets.dropdown_icon} alt="Dropdown Icon" />
            <div className="absolute top-12 right-0 pt-1 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-28 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">
                  My Appointments
                </p>
                <p onClick={() => setToken(false)} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-3 md:mt-0"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
