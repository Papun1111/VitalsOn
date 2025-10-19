import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  }, [atoken, getAllAppointments]);

  // Helper function to format date and time
  const formatDateTime = (date, time) => {
    const dt = new Date(`${date}T${time}`);
    if (isNaN(dt)) return `${date}, ${time}`;
    return dt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  };

  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } } };
  const headerVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } } };
  const buttonVariants = { hover: { scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 300, damping: 15 } }, tap: { scale: 0.95, rotate: -5 } };

  if (!appointments) {
    return (
        <div className="bg-zinc-900 w-full min-h-screen p-6 flex items-center justify-center">
            <div className="text-lime-400 text-2xl font-semibold animate-pulse">Loading Appointments...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 w-full">
        <motion.div 
            className="p-6 w-full max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={headerVariants} className="mb-8">
                <h1 className="text-4xl font-extrabold mb-2 text-zinc-100">
                    All Appointments
                </h1>
                <p className="text-zinc-400 text-lg font-medium">
                    Manage and track all patient appointments
                </p>
            </motion.div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <motion.div 
                    className="min-w-full bg-zinc-800 rounded-lg shadow-lg overflow-hidden border border-zinc-700/80"
                    variants={itemVariants}
                >
                    <div className="grid grid-cols-7 gap-4 bg-zinc-900/80 p-5">
                        {["#", "Patient", "Age", "Date & Time", "Doctor", "Fee", "Action"].map(header => (
                            <div key={header} className="font-bold text-zinc-400 text-sm uppercase tracking-wider">{header}</div>
                        ))}
                    </div>
                    <AnimatePresence>
                        {appointments.map((item, index) => (
                            <motion.div
                                key={item._id || index}
                                className="grid grid-cols-7 gap-4 p-5 items-center border-t border-zinc-700/80 hover:bg-zinc-700/50 transition-colors duration-200"
                                variants={itemVariants}
                                layout
                            >
                                <span className="font-semibold text-zinc-400">{index + 1}</span>
                                <div className="flex items-center">
                                    <img src={item.userData.image} alt="patient" className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-zinc-600"/>
                                    <span className="font-semibold text-zinc-100 text-base truncate">{item.userData.name}</span>
                                </div>
                                <span className="text-zinc-300 font-medium text-base">{calculateAge(item.userData.dob)} yrs</span>
                                <span className="text-zinc-300 font-medium text-sm">{formatDateTime(item.slotDate, item.slotTime)}</span>
                                <div className="flex items-center">
                                    <img src={item.doctorData.image} alt="doctor" className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-zinc-600"/>
                                    <span className="font-semibold text-zinc-100 text-base truncate">{item.doctorData.name}</span>
                                </div>
                                <span className="text-lime-400 font-bold text-base">{currency}{item.amount}</span>
                                <div className="flex items-center">
                                    {item.cancelled ? <span className="text-red-400 text-xs font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Cancelled</span>
                                    : item.isCompleted ? <span className="text-green-400 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Completed</span>
                                    : <motion.button onClick={() => cancelAppointment(item._id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/10" variants={buttonVariants} whileHover="hover" whileTap="tap"><img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5"/></motion.button>}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Mobile Card View */}
            <motion.div className="md:hidden space-y-6" variants={containerVariants}>
                <AnimatePresence>
                    {appointments.map((item) => (
                        <motion.div
                            key={item._id}
                            className="bg-zinc-800 shadow-lg rounded-lg p-5 border border-zinc-700/80"
                            variants={itemVariants}
                            layout
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center min-w-0">
                                    <img src={item.userData.image} alt="patient" className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-zinc-600"/>
                                    <div className="min-w-0">
                                        <p className="font-bold text-zinc-100 text-lg truncate">{item.userData.name}</p>
                                        <p className="text-zinc-400 text-sm">Age: {calculateAge(item.userData.dob)} years</p>
                                    </div>
                                </div>
                                {item.cancelled ? <span className="text-red-400 text-xs font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Cancelled</span>
                                : item.isCompleted ? <span className="text-green-400 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Completed</span>
                                : <motion.button onClick={() => cancelAppointment(item._id)} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-red-500/10" variants={buttonVariants} whileHover="hover" whileTap="tap"><img src={assets.cancel_icon} alt="Cancel" className="w-6 h-6"/></motion.button>}
                            </div>
                            <div className="space-y-3">
                                <div className="bg-zinc-900/70 p-3 rounded-md">
                                    <p className="font-bold text-zinc-400 text-xs uppercase tracking-wider mb-1">Date & Time</p>
                                    <p className="text-zinc-100 font-semibold text-base">{formatDateTime(item.slotDate, item.slotTime)}</p>
                                </div>
                                <div className="bg-zinc-900/70 p-3 rounded-md flex items-center justify-between">
                                    <div className="flex items-center min-w-0">
                                        <img src={item.doctorData.image} alt="doctor" className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-zinc-600"/>
                                        <p className="font-bold text-zinc-100 text-base truncate">{item.doctorData.name}</p>
                                    </div>
                                    <p className="text-lime-400 font-bold text-lg flex-shrink-0 ml-2">{currency}{item.amount}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    </div>
  );
};

export default AllAppointments;