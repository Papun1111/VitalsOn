import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminContext } from '../../Context/AdminContext';

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'available', 'unavailable'

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken, getAllDoctors]);

  // Filter doctors based on availability
  const filteredDoctors = doctors.filter(doctor => {
    if (filterStatus === 'available') return doctor.available;
    if (filterStatus === 'unavailable') return !doctor.available;
    return true;
  });

  // Animation variants (preserved)
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const titleVariants = { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150 } } };
  const filterVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } } };
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (index) => ({ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, delay: index * 0.05 } }),
    exit: { opacity: 0, y: 30, scale: 0.9 },
    hover: { y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300 } }
  };
  
  const handleAvailabilityChange = (doctorId) => {
    changeAvailability(doctorId);
  };

  const availableCount = doctors.filter(doc => doc.available).length;
  const unavailableCount = doctors.length - availableCount;

  if (!doctors) {
    return (
        <div className="bg-zinc-900 w-full min-h-screen p-6 flex items-center justify-center">
            <div className="text-lime-400 text-2xl font-semibold animate-pulse">Loading Doctors...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white w-full">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <motion.div 
            className="text-center mb-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl font-bold mb-6 text-zinc-100"
            variants={titleVariants}
          >
            All Doctors
          </motion.h1>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
            variants={filterVariants}
          >
            <div className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-lg">
              <span className="text-lime-400 font-bold text-lg">Available: {availableCount}</span>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-lg">
              <span className="text-red-400 font-bold text-lg">Unavailable: {unavailableCount}</span>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            className="flex justify-center flex-wrap gap-3 mb-8"
            variants={filterVariants}
          >
            {[
              { key: 'all', label: 'All Doctors' },
              { key: 'available', label: 'Available' },
              { key: 'unavailable', label: 'Unavailable' }
            ].map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key)}
                className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                  filterStatus === filter.key
                    ? 'bg-lime-400 text-zinc-900'
                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            <AnimatePresence>
              {filteredDoctors.map((item, index) => (
                <motion.div
                  key={item._id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-lg"
                  layout
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${item.available ? 'bg-lime-500' : 'bg-red-500'}`}>
                      {item.available ? '● Online' : '● Offline'}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1 text-zinc-100 truncate">{item.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4 font-medium">{item.speciality}</p>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer">
                        <input
                          onChange={() => handleAvailabilityChange(item._id)}
                          type="checkbox"
                          checked={item.available}
                          className="appearance-none w-5 h-5 border-2 border-zinc-500 rounded-md bg-zinc-700 checked:bg-lime-500 checked:border-lime-500 transition duration-200 relative"
                        />
                        <span className={`ml-3 text-sm font-bold ${item.available ? 'text-lime-400' : 'text-red-400'}`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </label>
                    </div>
                  </div>
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
            >
              <div className="text-6xl mb-4 text-zinc-600">🩺</div>
              <h3 className="text-2xl font-bold text-zinc-400 mb-2">No doctors found</h3>
              <p className="text-zinc-500">Try adjusting your filter settings.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorsList;

