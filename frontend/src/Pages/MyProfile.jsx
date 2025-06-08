import React, { useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppContext } from "../Context/AppContext";
import { motion } from "motion/react"
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    userData && (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 shadow-2xl rounded-2xl p-8 mb-6 border border-slate-200/50 backdrop-blur-sm"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mb-8"
        >
          <AnimatePresence mode="wait">
            {isEdit ? (
              <motion.label
                key="edit-image"
                htmlFor="image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <img
                    className="w-36 h-36 rounded-2xl object-cover shadow-lg border-4 border-white group-hover:opacity-80 transition-opacity duration-300"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.img
                      className="w-8 h-8 filter brightness-0 invert"
                      src={assets.upload_icon}
                      alt="Upload"
                      whileHover={{ scale: 1.1 }}
                    />
                  </motion.div>
                </motion.div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </motion.label>
            ) : (
              <motion.img
                key="view-image"
                variants={imageVariants}
                whileHover="hover"
                src={userData.image}
                alt="Profile"
                className="h-36 w-36 rounded-2xl object-cover shadow-lg border-4 border-white cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className="space-y-6">
          {/* Name Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Name
            </label>
            <AnimatePresence mode="wait">
              {isEdit ? (
                <motion.input
                  key="name-input"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 font-medium shadow-sm"
                />
              ) : (
                <motion.h2
                  key="name-display"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-slate-800 bg-white/70 px-4 py-3 rounded-xl shadow-sm"
                >
                  {userData.name}
                </motion.h2>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Email
            </label>
            <p className="text-slate-600 bg-white/70 px-4 py-3 rounded-xl shadow-sm font-medium">
              {userData.email}
            </p>
          </motion.div>

          {/* Phone Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Phone
            </label>
            <p className="text-slate-600 bg-white/70 px-4 py-3 rounded-xl shadow-sm font-medium">
              {userData.phone}
            </p>
          </motion.div>

          {/* Address Fields */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Address
            </label>
            <AnimatePresence mode="wait">
              {isEdit ? (
                <motion.div
                  key="address-inputs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <input
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    type="text"
                    placeholder="Address Line 1"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 font-medium shadow-sm"
                  />
                  <input
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    type="text"
                    placeholder="Address Line 2"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 font-medium shadow-sm"
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="address-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-600 bg-white/70 px-4 py-3 rounded-xl shadow-sm font-medium"
                >
                  {`${userData.address.line1}, ${userData.address.line2}`}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Gender Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Gender
            </label>
            <AnimatePresence mode="wait">
              {isEdit ? (
                <motion.select
                  key="gender-select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 font-medium shadow-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </motion.select>
              ) : (
                <motion.p
                  key="gender-display"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-600 bg-white/70 px-4 py-3 rounded-xl shadow-sm font-medium"
                >
                  {userData.gender}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Date of Birth Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Date of Birth
            </label>
            <AnimatePresence mode="wait">
              {isEdit ? (
                <motion.input
                  key="dob-input"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  type="date"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-slate-700 font-medium shadow-sm"
                />
              ) : (
                <motion.p
                  key="dob-display"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-600 bg-white/70 px-4 py-3 rounded-xl shadow-sm font-medium"
                >
                  {userData.dob}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center"
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-500/30 min-w-[140px]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isEdit ? "save" : "edit"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isEdit ? "Save Changes" : "Edit Profile"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    )
  );
};

export default MyProfile;