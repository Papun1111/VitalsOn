import React from 'react';
// Corrected the import to use the standard framer-motion package
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Contact = () => {
  // All your original animation variants are preserved
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03, // Adjusted for consistency
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    // Inspired Styling: Clean off-white background with spacious padding.
    <motion.div
      className="bg-[#FBF9F6]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          {/* Inspired Styling: Elegant serif font for the heading. */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </motion.div>

        {/* Content Section */}
        <motion.div
          // Inspired Styling: A simplified grid layout for contact info and careers.
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
        >
          {/* Contact Details Section */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Our Office
              </h2>
              <p className="text-base text-gray-600">
                Sec-6, CDA, Cuttack-753014
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Info
              </h2>
              <div className="space-y-3">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-600">Tel: +91 7008939577</p>
                </div>
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-600">Email: gohanmohapatra@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Careers Section */}
          <motion.div
            // Inspired Styling: A clean card for the careers section.
            className="p-8 bg-white rounded-xl border border-gray-200/80"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Careers At VitalsOn
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Interested in joining our team? Learn more about our culture and see all available job openings.
            </p>

            <motion.button
              // Inspired Styling: Matches the primary button style from other pages.
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Jobs
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;