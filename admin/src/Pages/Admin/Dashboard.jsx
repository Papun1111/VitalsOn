import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AdminContext } from "../../Context/AdminContext";
import assets from "../../assets/assets";

const Dashboard = () => {
  const { dashData, getDashData, atoken, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const statsIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.5
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.5
      }
    }
  };

  const latestBookingsVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const bookingItemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      x: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const cancelIconVariants = {
    hover: {
      scale: 1.3,
      rotate: 90,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.8,
      rotate: 180
    }
  };

  return (
    <AnimatePresence>
      {dashData && (
        <motion.div 
          className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-6 p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Stats Cards */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <motion.img 
              src={assets.doctor_icon} 
              alt="Doctors" 
              className="mb-4 w-16 h-16 filter brightness-110"
              variants={statsIconVariants}
              whileHover="hover"
            />
            <motion.p 
              className="text-blue-400 text-3xl font-bold mb-2"
              variants={numberVariants}
            >
              {dashData.doctors}
            </motion.p>
            <motion.p 
              className="text-gray-300 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Doctors
            </motion.p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
          >
            <motion.img 
              src={assets.appointment_icon} 
              alt="Appointments" 
              className="mb-4 w-16 h-16 filter brightness-110"
              variants={statsIconVariants}
              whileHover="hover"
            />
            <motion.p 
              className="text-purple-400 text-3xl font-bold mb-2"
              variants={numberVariants}
            >
              {dashData.appointments}
            </motion.p>
            <motion.p 
              className="text-gray-300 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Appointments
            </motion.p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 hover:border-green-500 transition-all duration-300"
          >
            <motion.img 
              src={assets.patients_icon} 
              alt="Patients" 
              className="mb-4 w-16 h-16 filter brightness-110"
              variants={statsIconVariants}
              whileHover="hover"
            />
            <motion.p 
              className="text-green-400 text-3xl font-bold mb-2"
              variants={numberVariants}
            >
              {dashData.patients}
            </motion.p>
            <motion.p 
              className="text-gray-300 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Patients
            </motion.p>
          </motion.div>

          {/* Latest Bookings Section */}
          <motion.div 
            className="col-span-1 sm:col-span-3"
            variants={latestBookingsVariants}
          >
            <motion.div 
              className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700"
              whileHover={{
                scale: 1.01,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.img 
                  src={assets.list_icon} 
                  alt="Latest Bookings" 
                  className="mr-3 w-8 h-8 filter brightness-110"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.p 
                  className="text-2xl font-bold text-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Latest Bookings
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <AnimatePresence>
                  {dashData.latestAppointments.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={bookingItemVariants}
                      whileHover="hover"
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg border border-gray-600 hover:border-blue-400 transition-all duration-300"
                      layout
                    >
                      <motion.img 
                        src={item.doctorData.image} 
                        alt={item.doctorData.name} 
                        className="w-14 h-14 rounded-full mr-4 border-2 border-gray-500"
                        whileHover={{ 
                          scale: 1.1,
                          borderColor: "#3B82F6"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                      <div className="flex-grow">
                        <motion.p 
                          className="text-gray-100 font-semibold text-lg mb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {item.doctorData.name}
                        </motion.p>
                        <motion.p 
                          className="text-gray-400 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.1 }}
                        >
                          {item.slotDate}
                        </motion.p>
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {item.cancelled ? (
                          <motion.p 
                            className="text-red-400 text-sm font-bold px-3 py-1 bg-red-900/30 rounded-full border border-red-600"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                          >
                            Cancelled
                          </motion.p>
                        ) : (
                          <motion.img
                            onClick={() => cancelAppointment(item._id)}
                            className="w-10 h-10 cursor-pointer filter brightness-110 hover:brightness-125"
                            src={assets.cancel_icon}
                            alt="Cancel"
                            variants={cancelIconVariants}
                            whileHover="hover"
                            whileTap="tap"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dashboard;