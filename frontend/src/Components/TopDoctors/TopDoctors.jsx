import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../../Context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
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
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const statusBadgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8 lg:p-10 rounded-3xl shadow-xl border border-slate-200/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12 space-y-4"
        variants={headerVariants}
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 bg-clip-text text-transparent 
            font-serif"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Top Doctors to Book
        </motion.h1>
        <motion.p 
          className="text-slate-600 text-lg font-light tracking-wide max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Connect with our highly qualified and experienced medical professionals
        </motion.p>
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Doctors Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {doctors.map((item, index) => (
          <motion.div 
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer relative border border-slate-100
              backdrop-blur-sm bg-white/80"
            variants={cardVariants}
            whileHover="hover"
            layout
          >
            {/* Animated gradient border */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 
                rounded-2xl -z-10"
              whileHover={{ 
                opacity: 0.1,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            />
            
            <div className="p-1">
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-xl">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain bg-gradient-to-b from-slate-50 to-blue-50"
                  variants={imageVariants}
                />
                
                {/* Animated overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="p-5 space-y-4">
                {/* Status and Divider */}
                <div className="flex justify-between items-center">
                  <motion.div 
                    className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                  <motion.p 
                    className={`text-sm font-semibold px-3 py-1.5 rounded-full transition-colors duration-300 border
                      ${item.available ? 
                        'text-emerald-700 bg-emerald-50 border-emerald-200 group-hover:bg-emerald-100 group-hover:border-emerald-300' : 
                        'text-red-700 bg-red-50 border-red-200 group-hover:bg-red-100 group-hover:border-red-300'
                      }`}
                    variants={statusBadgeVariants}
                  >
                    {item.available ? '● Available' : "● Unavailable"}
                  </motion.p>
                </div>

                {/* Doctor Info */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.p 
                    className="text-xl font-bold text-slate-800 group-hover:text-blue-700 
                      transition-colors duration-300 font-serif"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    Dr. {item.name}
                  </motion.p>
                  <motion.p 
                    className="text-slate-600 font-medium tracking-wide group-hover:text-indigo-600 
                      transition-colors duration-300 text-sm"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    {item.speciality}
                  </motion.p>
                </motion.div>

                {/* Hover indicator */}
                <motion.div
                  className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-sm font-medium">Book Appointment →</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* More Button */}
      <motion.div 
        className="flex justify-center mt-12"
        variants={buttonVariants}
      >
        <motion.button 
          onClick={() => { navigate("/doctors"); scrollTo(0,0); }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl 
            font-semibold tracking-wide relative group overflow-hidden shadow-lg border border-blue-500/20"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="relative z-10 flex items-center gap-2">
            View All Doctors
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </span>
          
          {/* Button background animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600"
            initial={{ x: '-100%' }}
            whileHover={{ 
              x: 0,
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default TopDoctors;