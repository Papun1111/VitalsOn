import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";

const Header = () => {
  // All your original animation variants are preserved
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
    // Inspired Styling: Clean off-white background with a centered, single-column layout.
    <motion.div
      className="bg-[#FBF9F6]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <motion.div
          className="space-y-8"
          variants={contentVariants}
        >
          {/* Inspired Styling: Elegant serif font for the main heading. */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A Healthier Future, Scheduled Today.
          </motion.h1>

          {/* Inspired Styling: Readable sans-serif font for the paragraph with constrained width. */}
          <motion.p
            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Welcome to VitalsOn, where managing your healthcare is simple and
            secure. Find and book appointments with trusted professionals, browse
            available times, and take control of your health journey with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.a
              href="#speciality"
              // Inspired Styling: Matches the primary button style used across the site.
              className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Book an Appointment
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;