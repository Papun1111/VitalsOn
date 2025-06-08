import React from 'react';
import { motion } from "motion/react"
import { specialityData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const decorativeCircleVariants = {
    hover: {
      scale: [1, 1.2, 1],
      opacity: [0, 0.6, 0.4],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      id="speciality" 
      className="p-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl shadow-xl max-w-6xl mx-auto border border-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      <div className="space-y-6 mb-12">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center"
          variants={headerVariants}
        >
          Find by Specialty
        </motion.h1>
                
        <motion.p 
          className="text-slate-600 leading-relaxed max-w-3xl mx-auto text-center"
          variants={descriptionVariants}
        >
          Finding the right doctor is crucial for effective healthcare. Our platform allows you to easily search for doctors by specialty, ensuring you connect with professionals who meet your specific needs. Whether you're looking for a cardiologist, dermatologist, or pediatrician, our comprehensive listings provide detailed profiles, including qualifications and patient reviews. Browse through available specialists, compare their expertise, and book appointments with confidence. Your health deserves the best care, and we're here to help you find it!
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={containerVariants}
      >
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="group relative"
          >
            <Link 
              onClick={() => scrollTo(0,0)}
              to={`/doctors/${item.speciality}`}
              className="block"
            >
              {/* Animated background gradient */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                whileHover={{ opacity: 0.3 }}
              />
                        
              {/* Card content */}
              <motion.div 
                className="relative flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl
                  border border-gray-200 group-hover:border-blue-200 transition-all duration-500
                  group-hover:bg-gradient-to-b from-white to-blue-50"
                variants={cardVariants}
              >
                {/* Image container */}
                <div className="relative mb-4 overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"
                  />
                  <motion.img
                    src={item.image}
                    alt={item.speciality}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full
                       ring-2 ring-slate-200 group-hover:ring-blue-300 transition-all duration-500"
                    variants={imageVariants}
                  />
                                
                  {/* Decorative circles */}
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0"
                    variants={decorativeCircleVariants}
                    whileHover="hover"
                  />
                  <motion.div 
                    className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-500 rounded-full opacity-0"
                    variants={decorativeCircleVariants}
                    whileHover="hover"
                    transition={{ delay: 0.1 }}
                  />
                </div>
                            
                {/* Specialty name */}
                <motion.p 
                  className="text-center text-md sm:text-lg font-medium text-slate-700 
                     group-hover:text-blue-700 relative transition-colors duration-300"
                >
                  {item.speciality}
                  {/* Underline effect */}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SpecialityMenu;