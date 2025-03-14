import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../Context/DoctorContext';
import { AiFillHome } from 'react-icons/ai';
import { FaCalendarAlt, FaUserPlus, FaUsers, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);

  // Listen for the custom 'toggleSidebar' event dispatched from Navbar
  useEffect(() => {
    const toggleHandler = () => {
      setIsOpen(prev => !prev);
    };
    window.addEventListener('toggleSidebar', toggleHandler);
    return () => {
      window.removeEventListener('toggleSidebar', toggleHandler);
    };
  }, []);

  // Function to close the sidebar (used by the close button or when a link is clicked)
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`
        bg-gray-800 text-white h-full w-64 shadow-lg fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:relative sm:translate-x-0
      `}
    >
      {/* Close button on mobile: visible only on small screens */}
      <div className="sm:hidden flex justify-end p-2">
        <button onClick={closeSidebar} className="text-white focus:outline-none">
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {atoken && (
        <ul className="flex flex-col p-4 md:p-6 space-y-4">
          <li>
            <NavLink 
              to="/admin-dashboard" 
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
              onClick={closeSidebar}
            >
              <AiFillHome className="text-white text-2xl mr-2" />
              <p className="font-semibold text-sm md:text-base">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/all-appointments" 
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
              onClick={closeSidebar}
            >
              <FaCalendarAlt className="text-white text-2xl mr-2" />
              <p className="font-semibold text-sm md:text-base">Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add-doctor" 
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
              onClick={closeSidebar}
            >
              <FaUserPlus className="text-white text-2xl mr-2" />
              <p className="font-semibold text-sm md:text-base">Add Doctor</p>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/doctor-list" 
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
              onClick={closeSidebar}
            >
              <FaUsers className="text-white text-2xl mr-2" />
              <p className="font-semibold text-sm md:text-base">Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
      {dtoken && (
        <ul className="flex flex-col p-4 md:p-6 space-y-4">
          <li>
            <NavLink 
              to="/doctor-dashboard" 
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
              onClick={closeSidebar}
            >
              <AiFillHome className="text-white text-2xl mr-2" />
              <p className="font-semibold text-sm md:text-base">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/doctor-appointments" 
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
              onClick={closeSidebar}
            >
              <FaCalendarAlt className="text-white text-2xl mr-2" />
              <p className="font-semibold text-sm md:text-base">Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/doctor-profile" 
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
              onClick={closeSidebar}
            >
              <FaUserCircle className="text-white text-2xl mr-2" />
              <p className="font-semibold text-sm md:text-base">Profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
