import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Corrected the import to use the standard framer-motion package
import { motion } from 'framer-motion';
import { AppContext } from '../../Context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    hover: {
      y: -6,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05, // A bit more scale on hover
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    // Inspired Styling: Clean off-white background with spacious padding.
    <motion.div
      className="bg-[#FBF9F6] py-16 md:py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
        >
          {/* Inspired Styling: Elegant serif font for the heading. */}
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
            Our Top Doctors
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Connect with our highly qualified and experienced medical professionals.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {doctors.slice(0, 6).map((item) => (
            <motion.div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={item._id}
              // Inspired Styling: A clean card with subtle border and a more pronounced hover shadow.
              className="group bg-white rounded-xl border border-gray-200/80 cursor-pointer overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              layout
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                  variants={imageVariants} // This will trigger on parent hover
                />
              </div>
              <div className="p-5">
                {/* Inspired Styling: Clear typographic hierarchy for doctor's details. */}
                <h3 className="text-lg font-semibold text-gray-800">
                  Dr. {item.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {item.speciality}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-600">{item.experience} Years Exp.</p>
                  <p className={`text-xs font-bold py-1 px-2.5 rounded-md ${item.available 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'}`}>
                    {item.available ? 'Available' : "Unavailable"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-16"
          variants={buttonVariants}
        >
          <motion.button
            // Your original onClick logic is preserved
            onClick={() => { navigate("/doctors"); window.scrollTo(0,0); }}
            // Inspired Styling: Matches the primary button style used across the site.
            className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            View All Doctors
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TopDoctors;