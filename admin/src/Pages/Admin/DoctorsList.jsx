import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminContext } from '../../Context/AdminContext';

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'available', 'unavailable'

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  // Filter doctors based on availability
  const filteredDoctors = doctors.filter(doctor => {
    if (filterStatus === 'available') return doctor.available;
    if (filterStatus === 'unavailable') return !doctor.available;
    return true;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: -15
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
        duration: 0.8
      }
    }),
    hover: {
      y: -10,
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const availabilityVariants = {
    available: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    unavailable: {
      scale: [1, 0.8, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const checkboxVariants = {
    checked: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    unchecked: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    }
  };

  const handleAvailabilityChange = (doctorId, currentStatus) => {
    changeAvailability(doctorId);
  };

  const availableCount = doctors.filter(doc => doc.available).length;
  const unavailableCount = doctors.length - availableCount;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-10">
        <motion.h1 
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          All Doctors
        </motion.h1>

        {/* Stats Cards */}
        <motion.div 
          className="flex justify-center space-x-6 mb-8"
          variants={statsVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-lg">
              Available: {availableCount}
            </span>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-lg">
              Unavailable: {unavailableCount}
            </span>
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex justify-center space-x-4 mb-8"
          variants={filterVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { key: 'all', label: 'All Doctors', color: 'from-blue-600 to-blue-700' },
            { key: 'available', label: 'Available', color: 'from-green-600 to-green-700' },
            { key: 'unavailable', label: 'Unavailable', color: 'from-red-600 to-red-700' }
          ].map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filterStatus === filter.key
                  ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={filterStatus === filter.key ? { scale: [1, 1.1, 1] } : {}}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Doctors Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={filterStatus}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatePresence>
            {filteredDoctors.map((item, index) => (
              <motion.div
                key={item._id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl perspective-1000"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                layout
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                    variants={imageVariants}
                    whileHover="hover"
                  />
                  
                  {/* Overlay Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Availability Badge */}
                  <motion.div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      item.available 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}
                    variants={availabilityVariants}
                    animate={item.available ? 'available' : 'unavailable'}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.available ? '● Online' : '● Offline'}
                  </motion.div>
                </div>

                {/* Card Content */}
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.h3 
                    className="text-xl font-bold mb-2 text-gray-100"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm text-gray-400 mb-4 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {item.speciality}
                  </motion.p>

                  {/* Availability Toggle */}
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="relative"
                        variants={checkboxVariants}
                        animate={item.available ? 'checked' : 'unchecked'}
                      >
                        <input
                          onChange={() => handleAvailabilityChange(item._id, item.available)}
                          type="checkbox"
                          checked={item.available}
                          className="appearance-none w-5 h-5 border-2 border-gray-500 rounded bg-transparent checked:bg-blue-500 checked:border-blue-500 relative cursor-pointer transition-all duration-200"
                        />
                        {item.available && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <motion.p 
                        className={`text-sm font-bold ${
                          item.available ? 'text-green-400' : 'text-red-400'
                        }`}
                        animate={{ 
                          color: item.available ? '#4ADE80' : '#F87171',
                          scale: hoveredCard === index ? 1.05 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.available ? 'Available' : 'Unavailable'}
                      </motion.p>
                    </div>

                    {/* Status Indicator */}
                    <motion.div
                      className={`w-3 h-3 rounded-full ${
                        item.available ? 'bg-green-400' : 'bg-red-400'
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow: hoveredCard === index 
                      ? '0 0 30px rgba(59, 130, 246, 0.3)' 
                      : '0 0 0px rgba(59, 130, 246, 0)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      <AnimatePresence>
        {filteredDoctors.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🩺
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your filter settings</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DoctorsList;