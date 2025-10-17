import React, { useContext, useState } from "react";
// Corrected the import to use the standard framer-motion package
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  // All your original state and logic are preserved
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

  // All your original animation variants are preserved
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  return (
    // Inspired Styling: Clean off-white background for the page context.
    <div className="bg-[#FBF9F6] min-h-screen py-12 md:py-20">
      {userData && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // Inspired Styling: A clean white card with subtle border and shadow, centered on the page.
          className="max-w-2xl mx-auto bg-white shadow-sm rounded-2xl p-8 border border-gray-200/80"
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
                  className="relative cursor-pointer group"
                >
                  <img
                    // Inspired Styling: Clean image presentation.
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md group-hover:opacity-80 transition-opacity"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile Preview"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                      className="w-8 h-8 filter invert"
                      src={assets.upload_icon}
                      alt="Upload"
                    />
                  </div>
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
                  src={userData.image}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover shadow-md border-4 border-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-6">
            {/* Form Fields */}
            {[
              { label: "Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email", readOnly: true },
              { label: "Phone", key: "phone", type: "tel" },
              { label: "Address Line 1", key: "address.line1", type: "text" },
              { label: "Address Line 2", key: "address.line2", type: "text" },
              { label: "Gender", key: "gender", type: "select", options: ["Male", "Female"] },
              { label: "Date of Birth", key: "dob", type: "date" },
            ].map(field => (
              <motion.div variants={itemVariants} className="space-y-1" key={field.key}>
                {/* Inspired Styling: Understated, uppercase labels. */}
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {field.label}
                </label>
                <AnimatePresence mode="wait">
                  {isEdit && !field.readOnly ? (
                    <motion.div
                      key={`${field.key}-input`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {field.type === 'select' ? (
                        <select
                          value={userData.gender}
                          onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition text-gray-700 font-medium"
                        >
                          {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={field.key.includes('.') ? userData.address[field.key.split('.')[1]] : userData[field.key]}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (field.key.includes('.')) {
                              const [parent, child] = field.key.split('.');
                              setUserData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
                            } else {
                              setUserData(prev => ({ ...prev, [field.key]: value }));
                            }
                          }}
                          // Inspired Styling: Clean input fields with a simple border and focus state.
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition text-gray-700 font-medium"
                        />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${field.key}-display`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      // Inspired Styling: Displaying data in a clean, readable format.
                      className="text-gray-800 font-medium bg-gray-50/80 px-4 py-2.5 rounded-lg"
                    >
                      {field.key.includes('.') ? `${userData.address.line1}, ${userData.address.line2}` : userData[field.key]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            // A simple trick to only render the combined address once
            )).filter(field => !isEdit ? field.key !== 'address.line2' : true)}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex justify-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
              // Inspired Styling: Matches the primary button style from other pages.
              className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-lg transition-colors duration-300 min-w-[160px]"
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
      )}
    </div>
  );
};

export default MyProfile;