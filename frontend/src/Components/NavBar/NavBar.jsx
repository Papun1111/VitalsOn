import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react"
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

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.15 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="relative bg-white border-b border-neutral-200"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-5">
          {/* Logo */}
          <motion.h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-xl lg:text-2xl font-semibold tracking-tight text-neutral-900"
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
          >
            VitalsOn
          </motion.h1>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center space-x-1"
            variants={itemVariants}
          >
            {[
              { path: "/", label: "Home" },
              { path: "/doctors", label: "All Doctors" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" }
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </motion.nav>

          {/* Auth Section */}
          <motion.div
            className="flex items-center space-x-3 lg:space-x-4"
            variants={itemVariants}
          >
            {token ? (
              <div className="relative group">
                <motion.div
                  className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.img
                    className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover ring-1 ring-neutral-200"
                    src={userData.image}
                    alt="Profile"
                  />
                  <motion.img
                    className="w-2.5 hidden lg:block"
                    src={assets.dropdown_icon}
                    alt="Dropdown"
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
                    <div className="bg-white rounded-xl shadow-lg ring-1 ring-neutral-200 py-1 overflow-hidden">
                      {[
                        { onClick: () => navigate("/my-profile"), label: "My Profile" },
                        { onClick: () => navigate("/my-appointments"), label: "My Appointments" },
                        { onClick: logout, label: "Logout" }
                      ].map((item) => (
                        <motion.div
                          key={item.label}
                          onClick={item.onClick}
                          className="px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors duration-150"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.15 }}
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
                className="bg-emerald-400 hover:bg-emerald-500 text-neutral-900 text-sm font-medium px-5 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Schedule a meeting
              </motion.button>
            )}

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              className="lg:hidden rounded-lg p-2 hover:bg-neutral-50 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                className="w-5 h-5"
                src={showMenu ? assets.cross_icon : assets.menu_icon}
                alt={showMenu ? "Close Menu" : "Open Menu"}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="lg:hidden overflow-hidden"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="px-2 pb-4 space-y-1">
                {[
                  { path: "/", label: "Home" },
                  { path: "/doctors", label: "All Doctors" },
                  { path: "/about", label: "About" },
                  { path: "/contact", label: "Contact" }
                ].map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200
                      ${
                        isActive
                          ? "text-neutral-900 bg-neutral-50"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                      }`
                    }
                    onClick={() => setShowMenu(false)}
                  >
                    {link.label}
                  </NavLink>
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