import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DoctorContext } from "../../Context/DoctorContext";
import { AppContext } from "../../Context/AppContext";
import assets from "../../assets/assets";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, when: 'beforeChildren' } }
};

const rowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  hover: { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.03 }
};

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 text-gray-200"
    >
      <h2 className="text-center text-3xl font-bold mb-8">All Appointments</h2>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
        <motion.table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-700">
              {['#', 'Patient', 'Payment', 'Age', 'Date & Time', 'Fee', 'Action'].map((h, i) => (
                <th key={i} className="px-6 py-3 text-left uppercase text-sm font-semibold">
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
                className="cursor-pointer border-b border-gray-700"
              >
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <motion.img
                    src={item.userData.image}
                    alt="patient"
                    className="w-10 h-10 rounded-full"
                    whileHover={{ scale: 1.2 }}
                  />
                  <span>{item.userData.name}</span>
                </td>
                <td className="px-6 py-4">{item.payment ? 'Online' : 'Cash'}</td>
                <td className="px-6 py-4">{calculateAge(item.userData.dob)}</td>
                <td className="px-6 py-4">{formatDateTime(item.slotDate, item.slotTime)}</td>
                <td className="px-6 py-4">${item.amount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    {!item.cancelled ? (
                      <motion.img
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 cursor-pointer"
                        whileHover={{ rotate: -20, scale: 1.3 }}
                        onClick={() => cancelAppointment(item._id)}
                      />
                    ) : (
                      <span className="text-red-400">Cancelled</span>
                    )}
                    {!item.isCompleted ? (
                      <motion.img
                        src={assets.tick_icon}
                        alt="Complete"
                        className="w-6 h-6 cursor-pointer"
                        whileHover={{ rotate: 20, scale: 1.3 }}
                        onClick={() => completeAppointment(item._id)}
                      />
                    ) : (
                      <span className="text-green-400">Completed</span>
                    )}
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Link
                        to={`/video-call/${item._id}`}
                        className="px-3 py-1 bg-blue-600 rounded-md text-xs hover:bg-blue-500"
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
            className="bg-gray-800 p-4 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <motion.img
                  src={item.userData.image}
                  alt="patient"
                  className="w-12 h-12 rounded-full"
                  whileHover={{ rotate: 360 }}
                />
                <div>
                  <p className="font-semibold text-lg">{item.userData.name}</p>
                  <p className="text-sm text-gray-400">Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>
              <span className="font-bold text-lg">{idx + 1}</span>
            </div>
            <p className="text-sm mb-2">Payment: {item.payment ? 'Online' : 'Cash'}</p>
            <p className="text-sm mb-2">When: {formatDateTime(item.slotDate, item.slotTime)}</p>
            <p className="text-sm mb-4">Fee: ${item.amount}</p>
            <div className="flex items-center space-x-4">
              {!item.cancelled ? (
                <motion.img
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-6 h-6 cursor-pointer"
                  whileHover={{ scale: 1.3, rotate: -15 }}
                  onClick={() => cancelAppointment(item._id)}
                />
              ) : (
                <span className="text-red-400">Cancelled</span>
              )}
              {!item.isCompleted ? (
                <motion.img
                  src={assets.tick_icon}
                  alt="Complete"
                  className="w-6 h-6 cursor-pointer"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  onClick={() => completeAppointment(item._id)}
                />
              ) : (
                <span className="text-green-400">Completed</span>
              )}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to={`/video-call/${item._id}`}
                  className="px-4 py-1 bg-blue-600 rounded-md text-xs hover:bg-blue-500"
                >
                  Video Call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DoctorAppointment;
