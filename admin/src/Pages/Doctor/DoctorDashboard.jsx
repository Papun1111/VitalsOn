import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { motion } from 'framer-motion';
import assets from "../../assets/assets";

const DoctorDashboard = () => {
  const { getDashData, dashData, dtoken, cancelAppointment, completeAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken, getDashData]);

  // Animation Variants
  const cardVariant = {
    initial: { scale: 0.9, opacity: 0, y: 30 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    hover: { scale: 1.05, y: -5, transition: { type: 'spring', stiffness: 300 } }
  };

  const listItemVariant = {
    initial: { x: -30, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
    hover: { scale: 1.02, transition: { type: 'spring' } }
  };

  if (!dashData) {
    return (
        <div className="bg-zinc-900 w-full min-h-screen p-6 flex items-center justify-center">
            <div className="text-lime-400 text-2xl font-semibold animate-pulse">Loading Dashboard...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
        className="px-4 py-6 w-full max-w-7xl mx-auto space-y-8 text-zinc-100"
      >
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: assets.earning_icon, value: `$${dashData.earnings}`, label: 'Total Earnings' },
            { icon: assets.appointment_icon, value: dashData.appointments, label: 'Total Appointments' },
            { icon: assets.patients_icon, value: dashData.patients, label: 'Total Patients' }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariant}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex flex-col items-center justify-center p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/80"
            >
              <motion.img
                src={card.icon}
                alt={card.label}
                className="mb-4 w-16 h-16"
                whileHover={{ rotate: 10 }}
              />
              <p className="text-3xl font-bold mb-1 text-lime-400">{card.value}</p>
              <p className="text-sm uppercase tracking-wide text-zinc-400">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Latest Bookings Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
          className="rounded-xl shadow-lg p-6 bg-zinc-800 border border-zinc-700/80"
        >
          <div className="flex items-center mb-6">
            <img
              src={assets.list_icon}
              alt="Latest Bookings"
              className="mr-3 w-8 h-8"
            />
            <h2 className="text-2xl font-semibold text-zinc-100">Latest Bookings</h2>
          </div>
          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <motion.div
                key={index}
                variants={listItemVariant}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-zinc-900/70 rounded-lg border border-zinc-700 hover:border-lime-500 transition-colors duration-300"
              >
                <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-zinc-600"
                  />
                  <div>
                    <p className="font-semibold text-lg text-zinc-100">{item.userData.name}</p>
                    <p className="text-sm text-zinc-400">{item.slotDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {item.cancelled ? (
                     <p className="text-red-400 text-sm font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Cancelled</p>
                  ) : item.isCompleted ? (
                     <p className="text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Completed</p>
                  ) : (
                    <>
                      <motion.button onClick={() => cancelAppointment(item._id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500/10 transition-colors" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <img src={assets.cancel_icon} alt="Cancel" className="w-6 h-6"/>
                      </motion.button>
                      <motion.button onClick={() => completeAppointment(item._id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500/10 transition-colors" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                         <img src={assets.tick_icon} alt="Confirm" className="w-6 h-6"/>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;
