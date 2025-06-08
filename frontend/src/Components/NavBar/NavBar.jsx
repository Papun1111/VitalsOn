import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react"
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";
import vitals from "../../assets/vitals.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="relative bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200/60 shadow-lg backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
          >
            VitalsOn
          </motion.h1>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex space-x-2"
            variants={itemVariants}
          >
            {[
              { path: "/", label: "HOME" },
              { path: "/doctors", label: "ALL DOCTORS" },
              { path: "/about", label: "ABOUT" },
              { path: "/contact", label: "CONTACT" }
            ].map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl relative overflow-hidden group transition-all duration-300 ease-in-out font-medium
                    ${
                      isActive
                        ? "text-blue-600 bg-blue-50/70 shadow-sm"
                        : "text-slate-600 hover:text-blue-600"
                    }`
                  }
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          {/* Auth Section */}
          <motion.div
            className="flex items-center space-x-4"
            variants={itemVariants}
          >
            {token ? (
              <div className="relative group">
                <motion.div
                  className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-blue-50/70 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.img
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-100"
                    src={userData.image}
                    alt="Profile"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.img
                    className="w-2.5"
                    src={assets.dropdown_icon}
                    alt="Dropdown"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <AnimatePresence>
                  <motion.div
                    className="absolute right-0 pt-2 hidden group-hover:block w-48 z-50"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl ring-1 ring-slate-200/60 py-2 transition-all duration-300">
                      {[
                        { onClick: () => navigate("/my-profile"), label: "My Profile" },
                        { onClick: () => navigate("/my-appointments"), label: "My Appointments" },
                        { onClick: logout, label: "Logout" }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          onClick={item.onClick}
                          className="px-4 py-3 text-sm text-slate-700 hover:bg-blue-50/70 hover:text-blue-600 cursor-pointer transition-colors duration-200 mx-2 rounded-lg"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Create Account
              </motion.button>
            )}

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden rounded-xl p-2 hover:bg-blue-50/70 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                className="w-6 h-6"
                src={showMenu ? assets.cross_icon : assets.menu_icon}
                alt={showMenu ? "Close Menu" : "Open Menu"}
                animate={{ rotate: showMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-2">
                {[
                  { path: "/", label: "HOME" },
                  { path: "/doctors", label: "ALL DOCTORS" },
                  { path: "/about", label: "ABOUT" },
                  { path: "/contact", label: "CONTACT" }
                ].map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={mobileItemVariants}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ease-in-out
                        ${
                          isActive
                            ? "text-blue-600 bg-blue-50/70 shadow-sm"
                            : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                        }`
                      }
                      onClick={() => setShowMenu(false)}
                    >
                      <motion.span
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NavBar;