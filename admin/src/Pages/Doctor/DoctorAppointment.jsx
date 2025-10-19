
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DoctorContext } from "../../Context/DoctorContext";
import { AppContext } from "../../Context/AppContext";
import assets from "../../assets/assets";
import { motion } from 'framer-motion';

const DoctorAppointment = () => {
  const { getAppointments, dtoken, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) getAppointments();
  }, [dtoken, getAppointments]);

  const formatDateTime = (date, time) => {
    const dt = new Date(`${date}T${time}`);
    return isNaN(dt) ? `${date} ${time}` : dt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  };

  // Animation Variants (Preserved)
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const rowVariants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 }, hover: { scale: 1.01, backgroundColor: 'rgba(63, 63, 70, 0.5)' } };
  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, hover: { scale: 1.03 } };

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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 w-full max-w-7xl mx-auto"
      >
        <h2 className="text-center text-4xl font-bold mb-8 text-zinc-100">All Appointments</h2>

        {/* Table for larger screens */}
        <div className="hidden md:block overflow-x-auto bg-zinc-800 rounded-xl shadow-lg border border-zinc-700">
          <motion.table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-zinc-900/80">
                {['#', 'Patient', 'Payment', 'Age', 'Date & Time', 'Fee', 'Action'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left uppercase text-sm font-semibold text-zinc-400 tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((item, idx) => (
                <motion.tr
                  key={idx}
                  variants={rowVariants}
                  whileHover="hover"
                  className="cursor-pointer border-t border-zinc-700"
                >
                  <td className="px-6 py-4 text-zinc-400 font-semibold">{idx + 1}</td>
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img
                      src={item.userData.image}
                      alt="patient"
                      className="w-10 h-10 rounded-full object-cover border-2 border-zinc-600"
                    />
                    <span className="font-semibold text-zinc-100">{item.userData.name}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{item.payment ? 'Online' : 'Cash'}</td>
                  <td className="px-6 py-4 text-zinc-300">{calculateAge(item.userData.dob)}</td>
                  <td className="px-6 py-4 text-zinc-300">{formatDateTime(item.slotDate, item.slotTime)}</td>
                  <td className="px-6 py-4 font-bold text-lime-400">${item.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {item.cancelled ? (
                        <span className="text-red-400 text-xs font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Cancelled</span>
                      ) : item.isCompleted ? (
                        <span className="text-green-400 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Completed</span>
                      ) : (
                        <>
                          <motion.button onClick={() => cancelAppointment(item._id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/10" whileHover={{ scale: 1.2 }} whileTap={{scale: 0.9}}>
                             <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5"/>
                          </motion.button>
                          <motion.button onClick={() => completeAppointment(item._id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-500/10" whileHover={{ scale: 1.2 }} whileTap={{scale: 0.9}}>
                             <img src={assets.tick_icon} alt="Complete" className="w-5 h-5"/>
                          </motion.button>
                        </>
                      )}
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Link
                          to={`/video-call/${item._id}`}
                          className="px-4 py-2 bg-lime-400 text-zinc-900 rounded-md text-xs font-bold hover:bg-lime-500 transition-colors"
                        >
                          Video Call
                        </Link>
                      </motion.div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Cards for small screens */}
        <div className="md:hidden space-y-6 mt-6">
          {appointments.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="bg-zinc-800 p-5 rounded-xl shadow-lg border border-zinc-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.userData.image}
                    alt="patient"
                    className="w-12 h-12 rounded-full object-cover border-2 border-zinc-600"
                  />
                  <div>
                    <p className="font-semibold text-lg text-zinc-100">{item.userData.name}</p>
                    <p className="text-sm text-zinc-400">Age: {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>
                <span className="font-bold text-lg text-zinc-500">#{idx + 1}</span>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between items-center bg-zinc-900/70 p-3 rounded-md">
                    <span className="text-sm text-zinc-400">Payment:</span>
                    <span className="font-semibold text-zinc-100">{item.payment ? 'Online' : 'Cash'}</span>
                 </div>
                 <div className="flex justify-between items-center bg-zinc-900/70 p-3 rounded-md">
                    <span className="text-sm text-zinc-400">When:</span>
                    <span className="font-semibold text-zinc-100">{formatDateTime(item.slotDate, item.slotTime)}</span>
                 </div>
                 <div className="flex justify-between items-center bg-zinc-900/70 p-3 rounded-md">
                    <span className="text-sm text-zinc-400">Fee:</span>
                    <span className="font-bold text-lime-400">${item.amount}</span>
                 </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
                <div className="flex items-center space-x-4">
                  {item.cancelled ? (
                    <span className="text-red-400 text-sm font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Completed</span>
                  ) : (
                    <>
                      <motion.button onClick={() => cancelAppointment(item._id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500/10" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                         <img src={assets.cancel_icon} alt="Cancel" className="w-6 h-6" />
                      </motion.button>
                      <motion.button onClick={() => completeAppointment(item._id)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500/10" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                         <img src={assets.tick_icon} alt="Complete" className="w-6 h-6"/>
                      </motion.button>
                    </>
                  )}
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to={`/video-call/${item._id}`}
                    className="px-4 py-2 bg-lime-400 text-zinc-900 rounded-md text-xs font-bold hover:bg-lime-500 transition-colors"
                  >
                    Video Call
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorAppointment;