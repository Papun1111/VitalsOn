import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AdminContext } from '../Context/AdminContext';
import { DoctorContext } from '../Context/DoctorContext';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext);
  const { dtoken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  
  // Determine user type
  const isAdmin = Boolean(atoken);
  const isDoctor = Boolean(dtoken);

  // Define navigation links based on user type
  const adminLinks = [
    { label: 'Dashboard', to: '/admin-dashboard' },
    { label: 'Appointments', to: '/all-appointments' },
    { label: 'Add Doctor', to: '/add-doctor' },
    { label: 'Doctors List', to: '/doctor-list' },
  ];

  const doctorLinks = [
    { label: 'Dashboard', to: '/doctor-dashboard' },
    { label: 'Appointments', to: '/doctor-appointments' },
    { label: 'Profile', to: '/doctor-profile' },
  ];

  const navLinks = isAdmin ? adminLinks : isDoctor ? doctorLinks : [];

  // Dropdown and mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    navigate("/");
    if (isAdmin) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (isDoctor) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Using sticky so the navbar stays at the top without overlapping other content
    <nav className="sticky top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side: Logo and navigation links */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                onClick={() => navigate("/")}
                className="text-2xl font-bold cursor-pointer"
              >
                VitalsOn Panel
              </h1>
            </div>
            {/* Desktop navigation links */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side: User dropdown and mobile menu button */}
          <div className="flex items-center">
            {/* User Dropdown */}
            <div className="ml-3 relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                type="button"
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              >
                <span className="sr-only">Open user menu</span>
                <FaUserCircle className="h-8 w-8" />
              </button>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <NavLink
                    to={isDoctor ? "/doctor-profile" : "/profile"}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Your Profile
                  </NavLink>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2 flex items-center">
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <AiOutlineClose className="block h-6 w-6" />
                ) : (
                  <AiOutlineMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
