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

  const getSpecialtyColors = (spec) => {
    const colors = {
      'General physician': 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      'Gynecologist': 'from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800',
      'Dermatologist': 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
      'Pediatricians': 'from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800',
      'Neurologist': 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
      'Gastroenterologist': 'from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800'
    };
    return colors[spec] || 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800';
  };

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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const filterButtonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Medical Specialists Directory
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect with experienced healthcare professionals across various specialties
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.button
              variants={filterButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                showFilter 
                  ? 'bg-slate-800 text-white shadow-lg' 
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setShowFilter(prev => !prev)}
            >
              Filters
            </motion.button>

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
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: index * 0.1 }}
                      style={speciality === spec ? { 
                        background: "linear-gradient(135deg, #1e293b, #334155)",
                        color: "white",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25)"
                      } : {}}
                      onClick={() => handleSpecialityClick(spec)}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                        speciality === spec
                          ? ''
                          : `bg-gradient-to-r ${getSpecialtyColors(spec)} text-white shadow-md hover:shadow-lg transform hover:-translate-y-1`
                      }`}
                    >
                      {spec}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-slate-200 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    <motion.div 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 mb-3 font-medium">
                      {item.speciality}
                    </p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        item.available
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        item.available ? 'bg-emerald-500' : 'bg-red-500'
                      }`} />
                      {item.available ? "Available" : "Not Available"}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full text-center py-16"
              >
                <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-slate-200">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33m0 0l.001-.001a7.931 7.931 0 0110.59-10.59l.001.001m0 0A7.931 7.931 0 0110.59 21.41M21.41 13.41a7.931 7.931 0 01-10.59 10.59" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No Doctors Found</h3>
                  <p className="text-slate-500">No medical professionals are available for this specialty at the moment.</p>
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