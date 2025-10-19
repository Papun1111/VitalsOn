import { useState, useContext, useEffect, useRef } from 'react';
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

  const isAdmin = Boolean(atoken);
  const isDoctor = Boolean(dtoken);

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

  const toggleSidebar = () => {
    window.dispatchEvent(new Event('toggleSidebar'));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navbarVariants = { /* ... */ };
  const logoVariants = { /* ... */ };
  const linkVariants = { /* ... */ };
  const dropdownVariants = { /* ... */ };
  const mobileMenuVariants = { /* ... */ };
  const mobileItemVariants = { /* ... */ };
  const userIconVariants = { /* ... */ };
  const hamburgerVariants = { /* ... */ };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 left-0 w-full bg-zinc-900/80 text-white shadow-md backdrop-blur-xl border-b border-zinc-700/60 z-50"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.button
              variants={hamburgerVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500 transition-colors mr-2"
            >
              <AiOutlineMenu className="h-6 w-6" />
            </motion.button>
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="flex-shrink-0"
            >
              <h1
                onClick={() => navigate("/")}
                className="text-2xl font-bold cursor-pointer text-lime-400"
              >
                VitalsOn Panel
              </h1>
            </motion.div>
            <div className="hidden md:ml-10 md:flex md:items-baseline md:space-x-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  variants={linkVariants}
                  whileHover="hover"
                  className="relative"
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-zinc-400 hover:text-white'
                      }`
                    }
                  >
                    {({isActive}) => (
                        <>
                            {link.label}
                            {isActive && (
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-500"
                                    layoutId="underline"
                                    initial={false}
                                />
                            )}
                        </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative" ref={dropdownRef}>
              <motion.button
                variants={userIconVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setDropdownOpen(prev => !prev)}
                type="button"
                className="flex items-center justify-center p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-lime-500 transition-colors"
              >
                <FaUserCircle className="h-7 w-7" />
              </motion.button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-2xl bg-zinc-800/95 backdrop-blur-lg border border-zinc-700 overflow-hidden"
                  >
                    <div className="py-1">
                      <NavLink
                        to={isDoctor ? "/doctor-profile" : "/profile"}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-colors"
                      >
                        <FaUserCircle className="mr-3 h-5 w-5 text-lime-400" />
                        Your Profile
                      </NavLink>
                      <div className="border-t border-zinc-700/80 my-1"></div>
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-red-400 transition-colors"
                      >
                        <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="md:hidden">
              {/* Mobile menu button logic remains same */}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden border-t border-zinc-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.div key={link.to} variants={mobileItemVariants}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                        isActive 
                          ? 'bg-lime-500 text-zinc-900' 
                          : 'text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
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