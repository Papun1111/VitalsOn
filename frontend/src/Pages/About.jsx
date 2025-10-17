import React from 'react';
// Corrected the import to use the standard framer-motion package
import { motion } from "framer-motion";
import { assets } from '../assets/assets';

const About = () => {
  // All your original animation variants are preserved
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 }
    }
  };

  return (
    // Inspired Styling: Clean off-white background.
    <motion.div
      className="bg-[#FBF9F6]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Heading */}
        <motion.div className="mb-16 text-center" variants={itemVariants}>
          {/* Inspired Styling: Elegant serif font for headings. */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900">
            About VitalsOn
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Simplifying your journey to better health, one appointment at a time.
          </p>
        </motion.div>

        {/* About Section */}
        <motion.div
          // Inspired Styling: A clean two-column layout for text and an image.
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 mb-24"
          variants={itemVariants}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">VitalsOn</span> is a streamlined online platform designed to simplify access to healthcare services and enhance patient convenience. We make it easy to find the right doctor and book an appointment at a time that suits you.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With VitalsOn, users can browse doctor profiles, check available times, and schedule appointments with just a few clicks. We provide detailed information about each doctor's qualifications and patient reviews, helping you make informed decisions about your healthcare.
            </p>
          </motion.div>
          <motion.div
            className="w-full flex justify-center"
            variants={imageVariants}
          >
            {/* Using a placeholder for a clean, relevant image */}
            <img src="https://placehold.co/500x500/F3F4F6/374151?text=Our+Team&font=serif" alt="Our Team" className="rounded-xl object-cover shadow-md" />
          </motion.div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900">
            Why Choose Us
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-gray-600">
            We are dedicated to providing a platform that is efficient, convenient, and personalized to your needs.
          </p>
        </motion.div>

        <motion.div
          // Inspired Styling: Clean, minimalist cards for feature highlights.
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
        >
          {[
            {
              title: "Efficiency",
              text: "Our platform streamlines the process of accessing healthcare, significantly reducing the time and effort required for patients to connect with providers through an intuitive interface."
            },
            {
              title: "Convenience",
              text: "VitalsOn is designed to maximize convenience, allowing you to manage your healthcare needs from the comfort of your home or on the go, using any device with internet access."
            },
            {
              title: "Personalization",
              text: "We emphasize personalization to enhance the healthcare experience for each user, tailoring our services to meet your unique needs and preferences for a more effective journey."
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              // Inspired Styling: White card with a subtle border and hover effect.
              className="p-8 bg-white rounded-xl border border-gray-200/80 hover:border-gray-300 transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;