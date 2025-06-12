import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Animation variants for the sidebar
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        when: "afterChildren"
      }
    }
  };

  // Animation variants for menu items
  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  // Animation variants for close button
  const closeButtonVariants = {
    hover: { 
      scale: 1.1, 
      rotate: 90,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  // Animation variants for nav links
  const navLinkVariants = {
    hover: { 
      scale: 1.02,
      x: 4,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 20 
      }
    },
    tap: { scale: 0.98 }
  };

  // Backdrop animation
  const backdropVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={`
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
          text-white h-full w-72 shadow-2xl fixed top-0 left-0 z-50 
          overflow-y-auto border-r border-slate-700/50
          sm:relative sm:translate-x-0
        `}
      >
        {/* Header with close button */}
        <div className="sm:hidden flex justify-between items-center p-4 border-b border-slate-700/50">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Menu
          </motion.h2>
          <motion.button 
            variants={closeButtonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={closeSidebar} 
            className="text-slate-400 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </motion.button>
        </div>

        {/* Admin Menu */}
        {atoken && (
          <motion.ul 
            className="flex flex-col p-6 space-y-3"
            variants={itemVariants}
          >
            <motion.li variants={itemVariants}>
              <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/admin-dashboard" 
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <AiFillHome className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-base">Dashboard</p>
                </NavLink>
              </motion.div>
            </motion.li>
            
            <motion.li variants={itemVariants}>
              <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/all-appointments" 
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <FaCalendarAlt className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-base">Appointments</p>
                </NavLink>
              </motion.div>
            </motion.li>
            
            <motion.li variants={itemVariants}>
              <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/add-doctor" 
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <FaUserPlus className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-base">Add Doctor</p>
                </NavLink>
              </motion.div>
            </motion.li>
            
            <motion.li variants={itemVariants}>
              <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/doctor-list" 
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <FaUsers className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-base">Doctors List</p>
                </NavLink>
              </motion.div>
            </motion.li>
          </motion.ul>
        )}

        {/* Doctor Menu */}
        {dtoken && (
          <motion.ul 
            className="flex flex-col p-6 space-y-3"
            variants={itemVariants}
          >
            <motion.li variants={itemVariants}>
              <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/doctor-dashboard" 
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/25' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <AiFillHome className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-base">Dashboard</p>
                </NavLink>
              </motion.div>
            </motion.li>
            
            <motion.li variants={itemVariants}>
              <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/doctor-appointments" 
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/25' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <FaCalendarAlt className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-base">Appointments</p>
                </NavLink>
              </motion.div>
            </motion.li>
            
            <motion.li variants={itemVariants}>
              <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/doctor-profile" 
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/25' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <FaUserCircle className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-base">Profile</p>
                </NavLink>
              </motion.div>
            </motion.li>
          </motion.ul>
        )}

        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      </motion.div>
    </>
  );
};

export default Sidebar;