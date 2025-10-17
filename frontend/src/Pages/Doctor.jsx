import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from "motion/react"
import { AppContext } from "../Context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (!Array.isArray(doctors)) return;
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  const handleSpecialityClick = (spec) => {
    if (speciality === spec) {
      navigate('/doctors');
    } else {
      navigate(`/doctors/${spec}`);
    }
  };

  const specialties = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -6,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const filterButtonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-neutral-900 mb-4">
            Medical Specialists Directory
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
            Connect with experienced healthcare professionals across various specialties
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <motion.button
              variants={filterButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                showFilter 
                  ? 'bg-neutral-900 text-white shadow-sm' 
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 shadow-sm'
              }`}
              onClick={() => setShowFilter(prev => !prev)}
            >
              {showFilter ? 'Hide Filters' : 'Show Filters'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {specialties.map((spec, index) => (
                  <motion.button
                    key={spec}
                    variants={filterButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSpecialityClick(spec)}
                    className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                      speciality === spec
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                    }`}
                  >
                    {spec}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {filterDoc.length > 0 ? (
              filterDoc.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  layout
                  transition={{ delay: index * 0.03 }}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden cursor-pointer border border-neutral-200 hover:border-neutral-300 transition-all duration-200 group"
                >
                  <div className="relative overflow-hidden bg-neutral-50">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Status Badge on Image */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors duration-200
                          ${item.available
                            ? 'text-emerald-700 bg-white/90 border border-emerald-200'
                            : 'text-red-700 bg-white/90 border border-red-200'
                          }`}
                      >
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                          item.available ? 'bg-emerald-500' : 'bg-red-500'
                        }`} />
                        {item.available ? "Available" : "Not Available"}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="p-5 space-y-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-sm text-neutral-600 group-hover:text-neutral-700 transition-colors duration-200">
                      {item.speciality}
                    </p>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full text-center py-16"
              >
                <div className="bg-white rounded-xl shadow-sm p-12 max-w-md mx-auto border border-neutral-200">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33m0 0l.001-.001a7.931 7.931 0 0110.59-10.59l.001.001m0 0A7.931 7.931 0 0110.59 21.41M21.41 13.41a7.931 7.931 0 01-10.59 10.59" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Doctors Found</h3>
                  <p className="text-neutral-600">No medical professionals are available for this specialty at the moment.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Doctor;