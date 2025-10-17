import React from 'react';
// Corrected the import to use the standard framer-motion package
import { motion } from "framer-motion";
import { specialityData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  // All your original animation variants are preserved
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.08 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
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
      y: -5, // A slight lift on hover
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  return (
    // Inspired Styling: Clean off-white background with spacious padding.
    <motion.div
      id="speciality"
      className="py-16 md:py-24 bg-[#FBF9F6]"
      initial="hidden"
      // Using whileInView for better user experience on scroll
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12 text-center max-w-3xl mx-auto">
          {/* Inspired Styling: Elegant serif font for the heading. */}
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-medium text-gray-900"
            variants={headerVariants}
          >
            Find by Specialty
          </motion.h1>

          {/* Inspired Styling: Readable, sans-serif font for the description. */}
          <motion.p
            className="text-base text-gray-600 leading-relaxed"
            variants={descriptionVariants}
          >
            Finding the right doctor is crucial. Our platform allows you to easily search for doctors by specialty, ensuring you connect with professionals who meet your specific needs. Your health deserves the best care, and we're here to help you find it!
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6"
          variants={containerVariants}
        >
          {specialityData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Link
                // Your original onClick logic is preserved
                onClick={() => window.scrollTo(0, 0)}
                to={`/doctors/${item.speciality}`}
                // Inspired Styling: The link itself is the card for a larger clickable area.
                className="block p-6 bg-white rounded-xl border border-gray-200/80 hover:border-gray-300 transition-all duration-300 text-center"
              >
                <motion.img
                  src={item.image}
                  alt={item.speciality}
                  // Inspired Styling: Clean image presentation.
                  className="w-20 h-20 object-contain rounded-full mx-auto mb-4"
                  variants={imageVariants} // This will now trigger on the parent's hover
                />
                <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                  {item.speciality}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SpecialityMenu;