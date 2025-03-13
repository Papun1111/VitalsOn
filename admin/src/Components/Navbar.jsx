import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../Context/DoctorContext';

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext);
  const { dtoken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  // Dispatch a custom event to toggle the sidebar on small screens
  const handleToggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggleSidebar'));
  };

  const logout = () => {
    navigate("/");
    if (atoken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (dtoken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Hamburger toggle button: visible only on small screens */}
        <button 
          onClick={handleToggleSidebar} 
          className="sm:hidden text-white focus:outline-none mr-4"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div>
          <h1 className="text-white text-2xl font-bold">VitalsOn Panel</h1>
          <p className="text-white text-lg">{atoken ? "Admin" : "Doctor"}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
