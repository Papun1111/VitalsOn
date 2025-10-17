import React from 'react';
// Corrected the import to use the standard framer-motion package
import { motion } from "framer-motion"; 

const Footer = () => {
  // Your original animation variants are preserved to maintain functionality
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const listItemVariants = {
    hover: {
      x: 5,
      color: "#111827", // Darker gray on hover
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <motion.footer
      // Inspired Styling: Clean off-white background with a subtle top border for separation.
      className="bg-[#FBF9F6] text-gray-700 border-t border-gray-200/80"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
        >
          {/* Left Section: About */}
          <motion.div
            className="md:col-span-2 lg:col-span-2 space-y-4"
            variants={sectionVariants}
          >
            {/* Inspired Styling: Bold, solid dark text for the logo, matching the NavBar. */}
            <h1 className="text-3xl font-bold text-gray-800 tracking-wider">
              VitalsOn
            </h1>
            
            {/* Inspired Styling: Softer, readable text color for the description. */}
            <p className="text-gray-600 leading-relaxed max-w-md">
              VitalsOn is a dedicated healthcare platform that simplifies booking
              appointments. With a user-friendly interface, we aim to make healthcare 
              more accessible, efficient, and convenient for everyone.
            </p>

            {/* Social Media Icons (Styled Placeholders) */}
            <div className="flex space-x-4 pt-2">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                <motion.div
                  key={platform}
                  // Inspired Styling: Simple gray circles with a subtle hover effect.
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "#D1D5DB" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Placeholder for actual icon SVG */}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Middle Section: Company Links */}
          <motion.div
            className="space-y-4"
            variants={sectionVariants}
          >
            {/* Inspired Styling: Understated, uppercase heading for sections. */}
            <h2 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h2>
            <ul className="space-y-3">
              {['Home', 'About', 'Contact Us', 'Privacy'].map((item) => (
                <motion.li
                  key={item}
                  // Inspired Styling: Clean link styling with a simple color change on hover.
                  className="cursor-pointer text-gray-600"
                  variants={listItemVariants}
                  whileHover="hover"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Section: Get in Touch */}
          <motion.div
            className="space-y-4"
            variants={sectionVariants}
          >
            <h2 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Get in Touch
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600">+91 7008939577</p>
              <p className="text-gray-600">gohanmohapatra@gmail.com</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="text-center border-t border-gray-200/80 mt-12 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 All Rights Reserved to{' '}
            <span className="text-gray-800 font-semibold cursor-pointer">
              Papun Mohapatra
            </span>.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;