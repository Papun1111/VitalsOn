import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DoctorContext } from "../../Context/DoctorContext";
import { AppContext } from "../../Context/AppContext";
import assets from "../../assets/assets";

const DoctorAppointment = () => {
  const { getAppointments, dtoken, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken, getAppointments]);

  // Helper to format date and time beautifully
  const formatDateTime = (date, time) => {
    const dt = new Date(`${date}T${time}`);
    if (isNaN(dt)) return `${date} ${time}`;
    return dt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  };

  return (
    <div className="p-6 w-full max-w-6xl bg-gray-100 min-h-screen mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">All Appointments</h2>

      {/* Table view for medium and larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">#</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Patient</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Payment</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Age</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Date &amp; Time</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Fee</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap flex items-center">
                  <img
                    src={item.userData.image}
                    alt="patient"
                    className="w-10 h-10 rounded-full mr-2 object-cover"
                  />
                  <span className="overflow-hidden text-ellipsis">{item.userData.name}</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{item.payment ? "Online" : "Cash"}</td>
                <td className="px-4 py-2 whitespace-nowrap">{calculateAge(item.userData.dob)}</td>
                <td className="px-4 py-2 whitespace-nowrap">{formatDateTime(item.slotDate, item.slotTime)}</td>
                <td className="px-4 py-2 whitespace-nowrap">${item.amount}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {!item.cancelled ? (
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <span className="text-red-500 text-sm font-medium">Cancelled</span>
                    )}
                    {!item.isCompleted ? (
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Complete"
                        className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <span className="text-green-500 text-sm font-medium">Completed</span>
                    )}
                    <Link
                      to={`/video-call/${item._id}`}
                      className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300 whitespace-nowrap"
                    >
                      Video Call
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden space-y-4">
        {appointments.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <img
                  src={item.userData.image}
                  alt="patient"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>
              <span className="font-bold text-lg">{index + 1}.</span>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-600">Payment: {item.payment ? "Online" : "Cash"}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-600">Date &amp; Time:</p>
              <p className="text-sm">{formatDateTime(item.slotDate, item.slotTime)}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-600">Fee:</p>
              <p className="text-sm">${item.amount}</p>
            </div>
            <div className="flex items-center space-x-3">
              {!item.cancelled ? (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <span className="text-red-500 text-sm font-medium">Cancelled</span>
              )}
              {!item.isCompleted ? (
                <img
                  onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  alt="Complete"
                  className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <span className="text-green-500 text-sm font-medium">Completed</span>
              )}
              <Link
                to={`/video-call/${item._id}`}
                className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300 whitespace-nowrap"
              >
                Video Call
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
