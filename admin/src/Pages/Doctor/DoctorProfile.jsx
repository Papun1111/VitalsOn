import React, { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DoctorContext } from "../../Context/DoctorContext";

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
        getProfileData(); // Re-fetch data to show updated state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (dtoken) getProfileData();
  }, [dtoken, getProfileData]);

  // Animation variants
  const containerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
  const avatarVariants = { hover: { scale: 1.1, rotate: 3, transition: { type: 'spring', stiffness: 300 } } };
  const fieldVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: 'spring' } } };
  const buttonVariants = { hover: { scale: 1.05, y: -2 }, tap: { scale: 0.95 } };

  if (!profileData) {
    return (
        <div className="bg-zinc-900 w-full min-h-screen p-6 flex items-center justify-center">
            <div className="text-lime-400 text-2xl font-semibold animate-pulse">Loading Profile...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 w-full p-4 sm:p-6 flex items-center justify-center">
        <motion.div
            key={isEdit ? 'edit' : 'view'}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl mx-auto p-6 sm:p-8 bg-zinc-800 text-zinc-100 rounded-xl shadow-2xl border border-zinc-700"
        >
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8">
                <motion.img
                    src={profileData.image}
                    alt="Doctor Profile"
                    variants={avatarVariants}
                    whileHover="hover"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-zinc-700 shadow-lg flex-shrink-0"
                />
                <div className="flex-1 space-y-4 w-full">
                    <motion.h1 variants={fieldVariants} className="text-3xl lg:text-4xl font-extrabold text-zinc-100">
                        {profileData.name}
                    </motion.h1>

                    <motion.div variants={fieldVariants} className="flex items-center justify-center md:justify-start flex-wrap gap-x-4 gap-y-2">
                        <p className="text-md text-zinc-400">
                            {profileData.degree} • {profileData.speciality}
                        </p>
                        <span className="px-3 py-1 bg-zinc-700 rounded-full text-sm font-semibold text-zinc-300">
                            {profileData.experience} yrs exp.
                        </span>
                    </motion.div>

                    <motion.div variants={fieldVariants} className="space-y-1">
                        <p className="text-zinc-400 leading-relaxed text-left">
                            {profileData.about}
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={isEdit ? 'editingFields' : 'viewingFields'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 pt-4 border-t border-zinc-700"
                        >
                            {/* Fee */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                <label className="font-semibold text-zinc-300 w-full sm:w-32 flex-shrink-0">Appointment Fee:</label>
                                {isEdit ? (
                                    <input type="number" value={profileData.fee} onChange={(e) => setProfileData((prev) => ({ ...prev, fee: e.target.value }))} className="w-full sm:w-auto px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"/>
                                ) : (
                                    <span className="text-lg font-bold text-lime-400">${profileData.fee}</span>
                                )}
                            </div>

                            {/* Address */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                <label className="font-semibold text-zinc-300 w-full sm:w-32 flex-shrink-0">Address:</label>
                                {isEdit ? (
                                    <div className="w-full space-y-2">
                                        <input type="text" value={profileData.address.line1} onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} placeholder="Line 1" className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"/>
                                        <input type="text" value={profileData.address.line2} onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} placeholder="Line 2" className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"/>
                                    </div>
                                ) : (
                                    <div className="text-zinc-400">
                                        <p>{profileData.address.line1}</p>
                                        <p>{profileData.address.line2}</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Availability */}
                            {isEdit && (
                                <div className="flex items-center gap-3 pt-2">
                                    <label className="font-semibold text-zinc-300">Availability:</label>
                                    <input type="checkbox" checked={profileData.available} onChange={() => setProfileData((prev) => ({ ...prev, available: !prev.available }))} className="h-5 w-5 accent-lime-500 bg-zinc-700 rounded border-zinc-600 cursor-pointer"/>
                                    <span className={`font-semibold ${profileData.available ? 'text-lime-400' : 'text-red-400'}`}>{profileData.available ? 'Available' : 'Unavailable'}</span>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>

                    <motion.div className="mt-6 flex gap-4">
                        <motion.button
                            onClick={isEdit ? updateProfile : () => setIsEdit(true)}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="px-6 py-2 rounded-lg text-zinc-900 font-bold bg-lime-400 hover:bg-lime-500 transition-colors"
                        >
                            {isEdit ? 'Save Profile' : 'Edit Profile'}
                        </motion.button>
                        {isEdit && (
                            <motion.button
                                onClick={() => { setIsEdit(false); getProfileData(); }}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="px-6 py-2 rounded-lg text-zinc-300 font-semibold bg-zinc-700 hover:bg-zinc-600 transition-colors"
                            >
                                Cancel
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default DoctorProfile;

