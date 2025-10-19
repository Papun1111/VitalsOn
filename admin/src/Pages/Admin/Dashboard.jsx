import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminContext } from "../../Context/AdminContext";
import assets from "../../assets/assets";

const Dashboard = () => {
  const { dashData, getDashData, atoken, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    // Fetches dashboard data when the component mounts and the admin token is available.
    if (atoken) {
      getDashData();
    }
  }, [atoken, getDashData]);

  // Animation variants to ensure smooth and appealing UI transitions.
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }, hover: { scale: 1.03, y: -5, transition: { type: "spring" } } };
  const statsIconVariants = { hidden: { scale: 0 }, visible: { scale: 1, transition: { type: "spring", delay: 0.2 } }, hover: { rotate: 15, transition: { duration: 0.3 } } };
  const numberVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.4 } } };
  const latestBookingsVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { type: "spring" } } };
  const bookingItemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 }, hover: { scale: 1.02, x: 5, transition: { type: "spring" } } };
  const cancelIconVariants = { hover: { scale: 1.2, rotate: 90 }, tap: { scale: 0.8 } };

  return (
    <div className="min-h-screen bg-zinc-900 w-full p-4 sm:p-6">
        <AnimatePresence>
          {dashData ? (
            <motion.div 
              className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {/* Stats Cards */}
              {[
                { icon: assets.doctor_icon, data: dashData.doctors, label: "Doctors" },
                { icon: assets.appointment_icon, data: dashData.appointments, label: "Appointments" },
                { icon: assets.patients_icon, data: dashData.patients, label: "Patients" },
              ].map((card, index) => (
                <motion.div
                  key={card.label}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`flex flex-col items-center justify-center p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/80 group ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <motion.div 
                      className="relative flex items-center justify-center w-16 h-16 mb-4"
                      variants={statsIconVariants}
                  >
                      <div className="absolute inset-0 bg-lime-500/10 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <img src={card.icon} alt={card.label} className="w-16 h-16 filter drop-shadow-lg" />
                  </motion.div>
                  <motion.p className="text-lime-400 text-4xl font-bold mb-1" variants={numberVariants}>
                    {card.data}
                  </motion.p>
                  <p className="text-zinc-400 text-lg font-medium">
                    {card.label}
                  </p>
                </motion.div>
              ))}

              {/* Latest Bookings Section */}
              <motion.div 
                className="col-span-1 sm:col-span-2 lg:col-span-3"
                variants={latestBookingsVariants}
              >
                <div className="p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/80">
                  <div className="flex items-center mb-6">
                    <img src={assets.list_icon} alt="Latest Bookings" className="mr-3 w-8 h-8"/>
                    <h3 className="text-2xl font-bold text-slate-100">Latest Bookings</h3>
                  </div>
                  <motion.div className="space-y-4" variants={containerVariants}>
                    <AnimatePresence>
                      {dashData.latestAppointments.map((item) => (
                        <motion.div
                          key={item._id}
                          variants={bookingItemVariants}
                          whileHover="hover"
                          className="flex items-center justify-between p-4 bg-zinc-900/70 rounded-lg border border-zinc-700 hover:border-lime-500 transition-colors duration-300"
                          layout
                        >
                          <div className="flex items-center flex-grow min-w-0">
                             <img src={item.doctorData.image} alt={item.doctorData.name} className="w-12 h-12 rounded-full mr-4 flex-shrink-0 border-2 border-zinc-600"/>
                             <div className="min-w-0">
                                <p className="text-slate-100 font-semibold text-md truncate">{item.doctorData.name}</p>
                                <p className="text-zinc-400 text-sm">{item.slotDate}</p>
                             </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <AnimatePresence mode="wait">
                              {item.cancelled ? (
                                <motion.p 
                                    key="cancelled"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="text-red-400 text-sm font-semibold px-3 py-1 bg-red-500/10 rounded-full border border-red-500/30 whitespace-nowrap"
                                >
                                  Cancelled
                                </motion.p>
                              ) : (
                                <motion.button
                                  key="cancel"
                                  onClick={() => cancelAppointment(item._id)}
                                  className="w-10 h-10 cursor-pointer flex items-center justify-center text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                  variants={cancelIconVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                >
                                  <img src={assets.cancel_icon} alt="Cancel" className="w-6 h-6"/>
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
             <div className="flex items-center justify-center h-[80vh]">
                <div className="text-lime-400 text-2xl font-semibold animate-pulse">Loading Dashboard...</div>
             </div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default Dashboard;

