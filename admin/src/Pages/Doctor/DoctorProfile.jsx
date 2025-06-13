import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const avatarVariants = {
  hover: { scale: 1.1, rotate: 5, transition: { type: 'spring', stiffness: 300 } },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.05, rotate: -2, transition: { type: 'spring', stiffness: 400 } },
  tap: { scale: 0.95, transition: { type: 'spring', stiffness: 500 } },
};

const DoctorProfile = () => {
  const { dtoken, profileData, getProfileData, setProfileData, backendUrl } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dtoken) getProfileData();
  }, [dtoken, getProfileData]);

  if (!profileData) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-full mx-auto p-8 bg-gray-900 text-gray-100 rounded-2xl shadow-2xl"
    >
      <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
        <motion.img
          src={profileData.image}
          alt="Doctor Profile"
          variants={avatarVariants}
          whileHover="hover"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-700 shadow-lg"
        />
        <div className="flex-1 space-y-4 w-full">
          <motion.h1
            variants={fieldVariants}
            className="text-3xl font-extrabold"
          >
            {profileData.name}
          </motion.h1>

          <motion.div
            variants={fieldVariants}
            className="flex items-center space-x-4"
          >
            <p className="text-md text-gray-400">
              {profileData.degree} • {profileData.speciality}
            </p>
            <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
              {profileData.experience} yrs
            </span>
          </motion.div>

          <motion.div variants={fieldVariants} className="space-y-2">
            <p className="font-semibold text-gray-300">About:</p>
            <p className="text-gray-400 leading-relaxed">
              {profileData.about}
            </p>
          </motion.div>

          <AnimatePresence>
            <motion.div
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <label className="font-semibold text-gray-300 w-32">
                Appointment Fee:
              </label>
              {isEdit ? (
                <motion.input
                  type="number"
                  value={profileData.fee}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, fee: e.target.value }))
                  }
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  variants={fieldVariants}
                />
              ) : (
                <motion.span
                  variants={fieldVariants}
                  className="text-lg font-bold"
                >
                  ${profileData.fee}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              variants={fieldVariants}
              className="flex flex-col space-y-2"
            >
              <label className="font-semibold text-gray-300">Address:</label>
              {isEdit ? (
                <div className="space-y-2">
                  <motion.input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    placeholder="Line 1"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    variants={fieldVariants}
                  />
                  <motion.input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    placeholder="Line 2"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    variants={fieldVariants}
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <motion.p variants={fieldVariants}>
                    {profileData.address.line1}
                  </motion.p>
                  <motion.p variants={fieldVariants}>
                    {profileData.address.line2}
                  </motion.p>
                </div>
              )}
            </motion.div>

            <motion.div
              variants={fieldVariants}
              className="flex items-center space-x-2"
            >
              <motion.input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                className="h-5 w-5 text-indigo-500 rounded"
                variants={fieldVariants}
              />
              <label className="text-gray-300 font-medium">Available</label>
            </motion.div>
          </AnimatePresence>

          <motion.div className="mt-6">
            <motion.button
              onClick={isEdit ? updateProfile : () => setIsEdit(true)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                isEdit ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isEdit ? 'Save Profile' : 'Edit Profile'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile;
