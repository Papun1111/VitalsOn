import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AdminContext } from "../../Context/AdminContext";
import { AppContext } from "../../Context/AppContext";
import assets from "../../assets/assets";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  // Helper function to format date and time nicely
  const formatDateTime = (date, time) => {
    const dt = new Date(`${date}T${time}`);
    if (isNaN(dt)) return `${date}, ${time}`;
    return dt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.95,
      rotate: -5
    }
  };

  return (
    <motion.div 
      className="p-6 w-full max-w-7xl mx-auto my-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={headerVariants}>
        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
          All Appointments
        </h1>
        <p className="text-gray-600 text-lg mb-8 font-medium">
          Manage and track all patient appointments
        </p>
      </motion.div>

      {/* Grid/table view for medium and larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <motion.div 
          className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <motion.div 
            className="grid grid-cols-7 gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wider">#</div>
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wider">Patient</div>
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wider">Age</div>
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wider">Date & Time</div>
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wider">Doctor</div>
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wider">Fee</div>
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wider">Action</div>
          </motion.div>
          <AnimatePresence>
            {appointments.map((item, index) => (
              <motion.div
                key={item._id || index}
                className="grid grid-cols-7 gap-4 p-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                layout
              >
                {/* Index */}
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-lg font-semibold text-gray-600 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </span>
                </motion.div>
                
                {/* Patient */}
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img
                    src={item.userData.image}
                    alt="patient"
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-blue-200"
                    whileHover={{ scale: 1.1, borderColor: "#3B82F6" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <span className="font-semibold text-gray-800 text-base">{item.userData.name}</span>
                  </div>
                </motion.div>
                
                {/* Age */}
                <motion.div 
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-gray-700 font-medium text-base">
                    {calculateAge(item.userData.dob)} yrs
                  </span>
                </motion.div>
                
                {/* Date & Time */}
                <motion.div 
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="text-blue-800 font-medium text-sm">
                      {formatDateTime(item.slotDate, item.slotTime)}
                    </span>
                  </div>
                </motion.div>
                
                {/* Doctor */}
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img
                    src={item.doctorData.image}
                    alt="doctor"
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-green-200"
                    whileHover={{ scale: 1.1, borderColor: "#10B981" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <span className="font-semibold text-gray-800 text-base">{item.doctorData.name}</span>
                  </div>
                </motion.div>
                
                {/* Fee */}
                <motion.div 
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-green-600 font-bold text-lg bg-green-50 px-3 py-1 rounded-lg">
                    {currency}{item.amount}
                  </span>
                </motion.div>
                
                {/* Action */}
                <motion.div className="flex items-center">
                  {item.cancelled ? (
                    <motion.span 
                      className="text-red-600 text-sm font-bold bg-red-50 px-3 py-2 rounded-full border border-red-200"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Cancelled
                    </motion.span>
                  ) : item.isCompleted ? (
                    <motion.span 
                      className="text-green-600 text-sm font-bold bg-green-50 px-3 py-2 rounded-full border border-green-200"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Completed
                    </motion.span>
                  ) : (
                    <motion.img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 h-10 cursor-pointer p-2 rounded-full hover:bg-red-50 transition-colors"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Card view for small screens */}
      <motion.div 
        className="md:hidden space-y-6"
        variants={containerVariants}
      >
        <AnimatePresence>
          {appointments.map((item, index) => (
            <motion.div
              key={item._id || index}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 overflow-hidden"
              variants={itemVariants}
              whileHover={cardHoverVariants.hover}
              layout
            >
              <motion.div 
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <motion.img
                    src={item.userData.image}
                    alt="patient"
                    className="w-14 h-14 rounded-full mr-4 object-cover border-3 border-blue-200"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{item.userData.name}</p>
                    <p className="text-gray-600 text-sm font-medium">Age: {calculateAge(item.userData.dob)} years</p>
                  </div>
                </div>
                <motion.span 
                  className="font-bold text-2xl text-blue-600 bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {index + 1}
                </motion.span>
              </motion.div>
              
              <motion.div 
                className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-1">Date & Time:</p>
                <p className="text-blue-800 font-semibold text-base">{formatDateTime(item.slotDate, item.slotTime)}</p>
              </motion.div>
              
              <motion.div 
                className="mb-4 flex items-center bg-green-50 p-4 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src={item.doctorData.image}
                  alt="doctor"
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-green-200"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-base">{item.doctorData.name}</p>
                  <p className="text-green-600 font-bold text-lg">Fee: {currency}{item.amount}</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {item.cancelled ? (
                  <motion.span 
                    className="inline-block text-red-600 text-base font-bold bg-red-50 px-4 py-2 rounded-full border-2 border-red-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Cancelled
                  </motion.span>
                ) : item.isCompleted ? (
                  <motion.span 
                    className="inline-block text-green-600 text-base font-bold bg-green-50 px-4 py-2 rounded-full border-2 border-green-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Completed
                  </motion.span>
                ) : (
                  <motion.img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-12 h-12 cursor-pointer p-2 rounded-full hover:bg-red-50 transition-colors"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AllAppointments;