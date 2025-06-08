import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
// Mock assets for demonstration


const Header = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const rightContentVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const floatingElementVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-purple-100 rounded-full opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative flex flex-col lg:flex-row justify-between items-center p-8 lg:p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 gap-8 lg:gap-12">
        
        {/* Left Side */}
        <motion.div
          className="flex-1 space-y-6"
          variants={leftContentVariants}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight mb-2"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              Book Appointment with Trusted Doctors
            </motion.h1>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.div>

          <motion.div
            className="flex items-start space-x-4 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="relative mt-2"
              variants={floatingElementVariants}
              animate="float"
            >
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.p
              className="text-gray-700 leading-relaxed text-base md:text-lg max-w-2xl"
              whileHover={{
                color: "#374151",
                transition: { duration: 0.2 }
              }}
            >
              Welcome to our doctor appointment booking website, where managing your healthcare is quick and easy. Find and book appointments with trusted professionals in your area, browse available times, and read doctor profiles—all in one place. With convenient reminders and a user-friendly interface, prioritizing your health has never been simpler. Schedule your visit today!
            </motion.p>
          </motion.div>

          <motion.a
            href="#speciality"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl border-0 group relative overflow-hidden"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10">Book Appointments</span>
            <motion.img
              src={assets.arrow_icon}
              alt="Arrow"
              className="relative z-10 ml-3 w-5 h-5 filter brightness-0 invert"
              animate={{
                x: [0, 5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.a>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="flex-1 flex justify-center items-center"
          variants={rightContentVariants}
        >
          <motion.div
            className="relative group"
            whileHover="hover"
          >
            {/* Glowing background effect */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-2xl opacity-20 blur-lg"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="relative bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              variants={imageVariants}
              whileHover="hover"
            >
              <img
                src={assets.header_img}
                alt="Healthcare"
                className="rounded-xl w-full h-auto max-w-md object-cover"
                style={{
                  filter: 'contrast(1.1) brightness(1.05) saturate(1.1)'
                }}
              />

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"
                variants={floatingElementVariants}
                animate="float"
              />
              <motion.div
                className="absolute -bottom-3 -right-3 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full shadow-lg"
                variants={floatingElementVariants}
                animate="float"
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />

              {/* Medical cross icon */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  transition: { duration: 0.2 }
                }}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;