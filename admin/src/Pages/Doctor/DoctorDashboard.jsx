import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { motion } from 'motion/react';
import assets from "../../assets/assets";

const cardVariant = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, rotate: 2, transition: { type: 'spring', stiffness: 300 } }
};

const listItemVariant = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.02, rotate: 1, transition: { type: 'spring', stiffness: 200 } }
};

const DoctorDashboard = () => {
  const { getDashData, dashData, dtoken, cancelAppointment, completeAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken, getDashData]);

  return (
    dashData && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6 } }}
        className="px-4 py-6 w-full max-w-6xl mx-auto space-y-8 bg-gray-900 text-gray-100"
      >
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: assets.earning_icon, value: `$${dashData.earnings}`, label: 'Earnings' },
            { icon: assets.appointment_icon, value: dashData.appointments, label: 'Appointments' },
            { icon: assets.patients_icon, value: dashData.patients, label: 'Patients' }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariant}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg"
            >
              <motion.img
                src={card.icon}
                alt={card.label}
                className="mb-3 w-16 h-16"
                whileHover={{ rotate: 15 }}
              />
              <p className="text-xl font-bold mb-1">{card.value}</p>
              <p className="text-sm uppercase tracking-wide">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Latest Bookings Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.6 } }}
          className="rounded-lg shadow-lg p-6 bg-gray-800"
        >
          <div className="flex items-center mb-4">
            <motion.img
              src={assets.list_icon}
              alt="Latest Bookings"
              className="mr-3 w-8 h-8"
              whileHover={{ rotate: 360, transition: { duration: 1 } }}
            />
            <p className="text-2xl font-semibold">Latest Bookings</p>
          </div>
          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <motion.div
                key={index}
                variants={listItemVariant}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-700 rounded-lg shadow"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <motion.img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <p className="font-medium text-lg">{item.userData.name}</p>
                    <p className="text-sm text-gray-300">{item.slotDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                  {!item.cancelled ? (
                    <motion.img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-6 h-6 cursor-pointer"
                      whileHover={{ scale: 1.3, rotate: -10 }}
                    />
                  ) : (
                    <p className="text-red-400 text-sm font-medium">Cancelled</p>
                  )}
                  {!item.isCompleted ? (
                    <motion.img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Confirm"
                      className="w-6 h-6 cursor-pointer"
                      whileHover={{ scale: 1.3, rotate: 10 }}
                    />
                  ) : (
                    <p className="text-green-400 text-sm font-medium">Completed</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default DoctorDashboard;
