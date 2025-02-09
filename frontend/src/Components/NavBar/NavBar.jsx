import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative bg-[#FFEDFA] border-b border-[#E195AB] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 
            onClick={() => navigate("/")} 
            className="cursor-pointer text-xl md:text-2xl font-bold text-[#DE3163] hover:text-[#E195AB] transition-all duration-300"
          >
            VitalsOn
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg relative overflow-hidden group transition-all duration-300 ease-in-out
                ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600'}
                before:absolute before:inset-x-0 before:bottom-0 before:h-full before:origin-bottom before:scale-y-0 before:bg-[#FFEDFA] 
                before:transition before:duration-300 hover:before:scale-y-100 hover:text-[#DE3163]`
              }
            >
              <span className="relative">HOME</span>
            </NavLink>
            <NavLink 
              to="/doctors" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg relative overflow-hidden group transition-all duration-300 ease-in-out
                ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600'}
                before:absolute before:inset-x-0 before:bottom-0 before:h-full before:origin-bottom before:scale-y-0 before:bg-[#FFEDFA] 
                before:transition before:duration-300 hover:before:scale-y-100 hover:text-[#DE3163]`
              }
            >
              <span className="relative">ALL DOCTORS</span>
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg relative overflow-hidden group transition-all duration-300 ease-in-out
                ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600'}
                before:absolute before:inset-x-0 before:bottom-0 before:h-full before:origin-bottom before:scale-y-0 before:bg-[#FFEDFA] 
                before:transition before:duration-300 hover:before:scale-y-100 hover:text-[#DE3163]`
              }
            >
              <span className="relative">ABOUT</span>
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg relative overflow-hidden group transition-all duration-300 ease-in-out
                ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600'}
                before:absolute before:inset-x-0 before:bottom-0 before:h-full before:origin-bottom before:scale-y-0 before:bg-[#FFEDFA] 
                before:transition before:duration-300 hover:before:scale-y-100 hover:text-[#DE3163]`
              }
            >
              <span className="relative">CONTACT</span>
            </NavLink>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {token ? (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-[#FFEDFA] transition-colors duration-300">
                  <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="Profile" />
                  <img className="w-2.5 transition-transform duration-300 group-hover:rotate-180" src={assets.dropdown_icon} alt="Dropdown" />
                </div>
                <div className="absolute right-0 pt-2 hidden group-hover:block w-48 z-50">
                  <div className="bg-white rounded-lg shadow-lg ring-1 ring-[#E195AB] ring-opacity-20 py-1 transition-all duration-300">
                    <div 
                      onClick={() => navigate("/my-profile")} 
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-[#FFEDFA] hover:text-[#DE3163] cursor-pointer transition-colors duration-200"
                    >
                      My Profile
                    </div>
                    <div 
                      onClick={() => navigate("/my-appointments")} 
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-[#FFEDFA] hover:text-[#DE3163] cursor-pointer transition-colors duration-200"
                    >
                      My Appointments
                    </div>
                    <div 
                      onClick={logout} 
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-[#FFEDFA] hover:text-[#DE3163] cursor-pointer transition-colors duration-200"
                    >
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#CCDF92] hover:bg-[#DE3163] text-white font-semibold px-6 py-2 rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden rounded-lg p-2 hover:bg-[#FFEDFA] transition-colors duration-300"
            >
              <img
                className="w-6 h-6"
                src={showMenu ? assets.cross_icon : assets.menu_icon}
                alt={showMenu ? "Close Menu" : "Open Menu"}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMenu && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ease-in-out
                  ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600 hover:text-[#DE3163] hover:bg-[#FFEDFA]'}`
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ease-in-out
                  ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600 hover:text-[#DE3163] hover:bg-[#FFEDFA]'}`
                }
              >
                ALL DOCTORS
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ease-in-out
                  ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600 hover:text-[#DE3163] hover:bg-[#FFEDFA]'}`
                }
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ease-in-out
                  ${isActive ? 'text-[#DE3163] bg-[#FFEDFA]' : 'text-gray-600 hover:text-[#DE3163] hover:bg-[#FFEDFA]'}`
                }
              >
                CONTACT
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;