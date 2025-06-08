import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { assets } from '../../assets/assets';

const Banner = () => {
  const navigate = useNavigate();

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

  const leftSectionVariants = {
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

  const rightSectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
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
        duration: 1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const floatingElementVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="relative min-h-[600px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30"
        variants={floatingElementVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-40"
        variants={floatingElementVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div
        className="absolute bottom-20 left-32 w-12 h-12 bg-indigo-200 rounded-full opacity-35"
        variants={floatingElementVariants}
        animate="animate"
        style={{ animationDelay: '0.5s' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Left Section */}
        <motion.div
          className="flex-1 max-w-2xl mb-12 lg:mb-0 lg:pr-12"
          variants={leftSectionVariants}
        >
          <motion.div
            className="relative"
            variants={titleVariants}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-20 blur-xl"
              variants={pulseVariants}
              animate="animate"
            />
            <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              Book Your
              <br />
              <span className="text-blue-600">Appointment</span>
            </h1>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="mb-8"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6">
              Get access to over{' '}
              <motion.strong
                className="text-blue-800 bg-blue-100 px-2 py-1 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                100+ trusted doctors
              </motion.strong>{' '}
              across multiple specialties.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Schedule your appointment effortlessly and manage your health from the comfort of your home.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={textVariants}
          >
            <motion.button
              onClick={() => navigate("/login")}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center justify-center">
                Create Account
                <motion.span
                  className="ml-2 text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-blue-600 font-semibold text-lg rounded-2xl border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex items-center text-gray-600">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium">24/7 Available</span>
            </div>
            <div className="flex items-center text-gray-600">
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <span className="text-sm font-medium">Verified Doctors</span>
            </div>
            <div className="flex items-center text-gray-600">
              <motion.div
                className="w-2 h-2 bg-purple-400 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
              <span className="text-sm font-medium">Secure Platform</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex-1 flex items-center justify-center lg:justify-end relative"
          variants={rightSectionVariants}
        >
          <motion.div
            className="relative"
            variants={imageVariants}
            whileHover="hover"
          >
            {/* Decorative elements around image */}
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
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
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full opacity-15"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <motion.div
              className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl"
              whileHover={{
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <img
                src={assets.appointment_img}
                alt="Doctor Illustration"
                className="max-w-full h-auto w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl"
              />
            </motion.div>

            {/* Floating stats */}
            <motion.div
              className="absolute top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-xs text-gray-600">Doctors</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-xs text-gray-600">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;