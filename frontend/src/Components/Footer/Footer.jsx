import React from 'react';
import { motion } from "motion/react"

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      x: 10,
      color: "#ffffff",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const contactVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      color: "#ffffff",
      transition: {
        duration: 0.2
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-gray-200 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-20 right-20 w-24 h-24 bg-indigo-400 rounded-full opacity-15"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-500 rounded-full opacity-10"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-8 py-12">
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start space-y-12 lg:space-y-0 lg:space-x-16"
          variants={containerVariants}
        >
          {/* Left Section */}
          <motion.div
            className="space-y-6 lg:max-w-lg"
            variants={sectionVariants}
          >
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="cursor-pointer"
            >
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                whileHover={{
                  backgroundImage: "linear-gradient(45deg, #60a5fa, #c084fc, #818cf8, #60a5fa)",
                  transition: { duration: 0.3 }
                }}
              >
                VitalsOn
              </motion.h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            
            <motion.p
              className="text-sm md:text-base text-gray-300 leading-relaxed"
              variants={sectionVariants}
            >
              VitalsOn is a dedicated healthcare platform that simplifies the process of booking
              appointments with a wide range of healthcare providers. With a user-friendly interface
              and transparent doctor profiles, we aim to make healthcare more accessible, efficient,
              and convenient for everyone.
            </motion.p>

            {/* Social Media Icons (Placeholder) */}
            <motion.div
              className="flex space-x-4 pt-4"
              variants={sectionVariants}
            >
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform, index) => (
                <motion.div
                  key={platform}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Middle Section: Company */}
          <motion.div
            className="flex flex-col space-y-6"
            variants={sectionVariants}
          >
            <motion.h2 
              className="text-2xl font-bold text-white relative"
              variants={sectionVariants}
            >
              Company
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 0.7, duration: 0.6 }}
              />
            </motion.h2>
            <motion.ul className="space-y-3">
              {['Home', 'About', 'Contact Us', 'Privacy'].map((item, index) => (
                <motion.li
                  key={item}
                  className="cursor-pointer text-gray-300 flex items-center group"
                  variants={listItemVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Section: Get in Touch */}
          <motion.div
            className="flex flex-col space-y-6"
            variants={sectionVariants}
          >
            <motion.h2 
              className="text-2xl font-bold text-white relative"
              variants={sectionVariants}
            >
              GET IN TOUCH
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </motion.h2>
            <motion.div className="space-y-4">
              <motion.div
                className="group cursor-pointer"
                variants={contactVariants}
                whileHover="hover"
              >
                <motion.div
                  className="flex items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    +91 7008939577
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="group cursor-pointer"
                variants={contactVariants}
                whileHover="hover"
              >
                <motion.div
                  className="flex items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    gohanmohapatra@gmail.com
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          className="my-12 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          />
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.p
            className="text-gray-400 text-sm md:text-base"
            whileHover={{ 
              color: "#ffffff",
              transition: { duration: 0.3 }
            }}
          >
            © 2025 All Rights Reserved to{' '}
            <motion.span
              className="text-blue-400 font-semibold cursor-pointer"
              whileHover={{ 
                color: "#60a5fa",
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Papun Mohapatra
            </motion.span>
            .
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      />
    </motion.footer>
  );
};

export default Footer;