import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import assets from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { backendUrl, atoken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!docImg) {
        toast.error("Image not selected");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("fee", fee);
      formData.append("about", about);
      formData.append("address1", address1);
      formData.append("address2", address2);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Error adding doctor:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred while adding the doctor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDocImg(null);
    setName("");
    setEmail("");
    setPassword("");
    setExperience("1 Year");
    setFee("");
    setAbout("");
    setSpeciality("General physician");
    setDegree("");
    setAddress1("");
    setAddress2("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const imageUploadVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    focus: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="w-full mx-auto px-6 py-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        variants={titleVariants}
      >
        Add Doctor
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Upload */}
        <motion.div 
          className="col-span-1 md:col-span-2"
          variants={inputVariants}
        >
          <motion.label
            htmlFor="doc-img"
            className="block w-full max-w-xs mx-auto cursor-pointer"
            variants={imageUploadVariants}
            whileHover="hover"
          >
            <motion.div 
              className="relative border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-gray-800 to-gray-700"
              whileHover={{
                borderColor: "#3B82F6",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
              }}
            >
              <div className="text-center">
                <motion.img
                  src={
                    docImg ? URL.createObjectURL(docImg) : assets.upload_area
                  }
                  alt="Upload"
                  className="w-28 h-28 mx-auto mb-4 rounded-full object-cover border-4 border-gray-600"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.p 
                  className="text-sm text-gray-300 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Upload doctor picture
                </motion.p>
              </div>
            </motion.div>
          </motion.label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
          />
        </motion.div>

        {/* Left Column Inputs */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
        >
          {[
            { label: "Your Name", value: name, setter: setName, type: "text", placeholder: "Enter your name", id: "name" },
            { label: "Your Email", value: email, setter: setEmail, type: "email", placeholder: "Enter your email", id: "email" },
            { label: "Doctor Password", value: password, setter: setPassword, type: "password", placeholder: "Enter your password", id: "password" },
            { label: "Fee", value: fee, setter: setFee, type: "number", placeholder: "Fee", id: "fee" }
          ].map((field, index) => (
            <motion.div key={field.id} variants={inputVariants}>
              <motion.label
                htmlFor={field.id}
                className="block text-sm font-semibold text-gray-200 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {field.label}
              </motion.label>
              <motion.input
                value={field.value}
                type={field.type}
                id={field.id}
                name={field.id}
                required={field.id !== "fee"}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder={field.placeholder}
                variants={inputVariants}
                whileFocus="focus"
              />
            </motion.div>
          ))}

          <motion.div variants={inputVariants}>
            <motion.label
              htmlFor="experience"
              className="block text-sm font-semibold text-gray-200 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Experience
            </motion.label>
            <motion.select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              name="experience"
              id="experience"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              variants={inputVariants}
              whileFocus="focus"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`} className="bg-gray-700">
                  {`${i + 1} Year`}
                </option>
              ))}
            </motion.select>
          </motion.div>
        </motion.div>

        {/* Right Column Inputs */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
        >
          <motion.div variants={inputVariants}>
            <motion.label
              htmlFor="speciality"
              className="block text-sm font-semibold text-gray-200 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Speciality
            </motion.label>
            <motion.select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              name="speciality"
              id="speciality"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              variants={inputVariants}
              whileFocus="focus"
            >
              {[
                "General physician",
                "Gynecologist", 
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroenterologist"
              ].map((spec) => (
                <option key={spec} value={spec} className="bg-gray-700">
                  {spec}
                </option>
              ))}
            </motion.select>
          </motion.div>

          {[
            { label: "Education", value: degree, setter: setDegree, placeholder: "Education", id: "education" },
            { label: "Address", value: address1, setter: setAddress1, placeholder: "Address 1", id: "address1", required: true },
            { label: "", value: address2, setter: setAddress2, placeholder: "Address 2", id: "address2" }
          ].map((field, index) => (
            <motion.div key={field.id} variants={inputVariants}>
              {field.label && (
                <motion.label
                  htmlFor={field.id}
                  className="block text-sm font-semibold text-gray-200 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                >
                  {field.label}
                </motion.label>
              )}
              <motion.input
                value={field.value}
                type="text"
                id={field.id}
                name={field.id}
                required={field.required}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder={field.placeholder}
                variants={inputVariants}
                whileFocus="focus"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* About Doctor Textarea */}
        <motion.div 
          className="col-span-1 md:col-span-2"
          variants={inputVariants}
        >
          <motion.label
            htmlFor="about"
            className="block text-sm font-semibold text-gray-200 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            About Doctor
          </motion.label>
          <motion.textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            name="about"
            id="about"
            rows={5}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
            placeholder="Write about doctor"
            variants={inputVariants}
            whileFocus="focus"
          />
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.div 
        className="mt-10 text-center"
        variants={buttonVariants}
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="loading"
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  variants={loadingVariants}
                  animate="animate"
                />
                <span>Adding Doctor...</span>
              </motion.div>
            ) : (
              <motion.span
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Add Doctor
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default AddDoctor;