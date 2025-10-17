import React from 'react';
import { useNavigate } from 'react-router-dom';
// Corrected the import to use the standard framer-motion package
import { motion } from "framer-motion";


const Banner = () => {
  const navigate = useNavigate();

  // All your original animation variants are preserved
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const rightSectionVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className="bg-[#FBF9F6]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            className="space-y-8 text-center lg:text-left"
            variants={contentVariants}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-gray-900 leading-tight"
            >
              Secure & Seamless <br />
              Healthcare Access
            </motion.h1>

            <motion.p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Get access to over <span className="font-semibold text-gray-800">100+ trusted doctors</span> across multiple specialties. Schedule your appointment effortlessly and manage your health from the comfort of your home.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Corrected button to include original structure */}
              <motion.button
                onClick={() => navigate("/login")}
                className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors duration-300 flex items-center justify-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Create Account
                {/* Restored the animated arrow from your original code */}
                <motion.span
                  className="ml-2 text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.button>
              
              <motion.button
                className="bg-white text-gray-700 font-semibold py-3 px-8 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center h-80 lg:h-96"
            variants={rightSectionVariants}
          >
            <motion.div 
              className="absolute w-64 h-64 bg-gray-200/50 rounded-full"
              animate={{ scale: [1, 1.05, 1], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }}}
            />
            <motion.div 
              className="absolute w-48 h-48 bg-white border border-gray-200/80 rounded-2xl shadow-sm flex items-center justify-center p-4"
              initial={{ rotate: -10 }}
              animate={{ y: [-10, 10], rotate: -10, transition: { duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}}
            >
              <div className='text-center'>
                <p className='text-3xl font-semibold text-gray-800'>24/7</p>
                <p className='text-sm text-gray-500'>Support</p>
              </div>
            </motion.div>
             <motion.div 
              className="absolute w-40 h-24 bg-white border border-gray-200/80 rounded-2xl shadow-sm -bottom-8 -right-4 lg:bottom-0 lg:-right-8 p-4 flex items-center gap-3"
              initial={{ rotate: 15 }}
              animate={{ y: [10, -10], rotate: 15, transition: { duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}}
            >
              <div className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center'>
                 <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className='font-semibold text-gray-800 text-sm'>Verified</p>
                <p className='text-xs text-gray-500'>Doctors</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;