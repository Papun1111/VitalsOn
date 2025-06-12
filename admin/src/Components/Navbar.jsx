import  { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Toggle sidebar function
  const toggleSidebar = () => {
    window.dispatchEvent(new Event('toggleSidebar'));
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

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const userIconVariants = {
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: { scale: 0.9 }
  };

  const hamburgerVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 left-0 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl backdrop-blur-md border-b border-slate-700/50 z-50"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          {/* Left side: Hamburger (mobile) + Logo and navigation links */}
          <div className="flex items-center">
            {/* Mobile hamburger for sidebar */}
            <motion.button
              variants={hamburgerVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors mr-3"
            >
              <AiOutlineMenu className="h-6 w-6" />
            </motion.button>

            {/* Logo */}
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="flex-shrink-0"
            >
              <motion.h1
                onClick={() => navigate("/")}
                className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                VitalsOn Panel
              </motion.h1>
            </motion.div>

            {/* Desktop navigation links */}
            <div className="hidden md:ml-8 md:flex md:space-x-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  variants={linkVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
                          : 'hover:bg-slate-700/50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side: User dropdown and mobile menu button */}
          <div className="flex items-center space-x-2">
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                variants={userIconVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setDropdownOpen(prev => !prev)}
                type="button"
                className="flex items-center justify-center p-2 rounded-full hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <span className="sr-only">Open user menu</span>
                <FaUserCircle className="h-8 w-8 text-slate-300" />
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-slate-800 border border-slate-700 backdrop-blur-md overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="py-2">
                      <motion.div
                        whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <NavLink
                          to={isDoctor ? "/doctor-profile" : "/profile"}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-3 text-sm text-slate-200 hover:text-white transition-colors"
                          role="menuitem"
                        >
                          <span className="flex items-center">
                            <FaUserCircle className="mr-3 text-blue-400" />
                            Your Profile
                          </span>
                        </NavLink>
                      </motion.div>
                      
                      <div className="border-t border-slate-700 my-1"></div>
                      
                      <motion.div
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-3 text-sm text-slate-200 hover:text-red-400 transition-colors"
                          role="menuitem"
                        >
                          <span className="flex items-center">
                            <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              variants={hamburgerVariants}
              whileHover="hover"
              whileTap="tap"
              className="md:hidden"
            >
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-2 rounded-lg hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineClose className="block h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineMenu className="block h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  variants={mobileItemVariants}
                  custom={index}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
                          : 'hover:bg-slate-700/50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;