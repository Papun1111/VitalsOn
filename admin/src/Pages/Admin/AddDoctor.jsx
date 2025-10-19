import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import assets from '../../assets/assets';
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

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

  // Animation variants (preserved)
  const containerVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.05 } } };
  const titleVariants = { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150 } } };
  const inputVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring" } }, focus: { scale: 1.02, transition: { type: "spring" } } };
  const buttonVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring" } }, hover: { scale: 1.05, y: -2 }, tap: { scale: 0.95 } };
  const loadingVariants = { animate: { rotate: 360, transition: { duration: 1, repeat: Infinity, ease: "linear" } } };

  return (
    <div className="min-h-screen bg-zinc-900 w-full p-6 flex items-center justify-center">
        <motion.form
            onSubmit={onSubmitHandler}
            className="w-full max-w-4xl mx-auto p-8 bg-zinc-800 rounded-xl shadow-2xl border border-zinc-700"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 
                className="text-4xl font-bold text-center mb-10 text-zinc-100"
                variants={titleVariants}
            >
                Add New Doctor
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Image Upload */}
                <motion.div 
                    className="col-span-1 md:col-span-2"
                    variants={inputVariants}
                >
                    <label
                        htmlFor="doc-img"
                        className="block w-full max-w-xs mx-auto cursor-pointer"
                    >
                        <motion.div 
                            className="relative border-2 border-dashed border-zinc-600 rounded-lg p-6 hover:border-lime-500 transition-colors duration-300 bg-zinc-700/50"
                            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                        >
                            <div className="text-center">
                                <img
                                    src={ docImg ? URL.createObjectURL(docImg) : assets.upload_area }
                                    alt="Upload"
                                    className="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-4 border-zinc-600"
                                />
                                <p className="text-sm text-zinc-400 font-medium">
                                    Upload doctor picture
                                </p>
                            </div>
                        </motion.div>
                    </label>
                    <input
                        onChange={(e) => setDocImg(e.target.files[0])}
                        type="file"
                        id="doc-img"
                        hidden
                        accept="image/*"
                    />
                </motion.div>

                {/* Left Column Inputs */}
                <div className="space-y-6">
                    {[
                        { label: "Doctor's Name", value: name, setter: setName, type: "text", id: "name" },
                        { label: "Doctor's Email", value: email, setter: setEmail, type: "email", id: "email" },
                        { label: "Password", value: password, setter: setPassword, type: "password", id: "password" },
                        { label: "Consultation Fee", value: fee, setter: setFee, type: "number", id: "fee" }
                    ].map((field) => (
                        <motion.div key={field.id} variants={inputVariants}>
                            <label htmlFor={field.id} className="block text-sm font-semibold text-zinc-300 mb-2">{field.label}</label>
                            <motion.input
                                value={field.value}
                                type={field.type}
                                id={field.id}
                                name={field.id}
                                required
                                onChange={(e) => field.setter(e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-colors duration-300"
                                whileFocus="focus"
                            />
                        </motion.div>
                    ))}

                    <motion.div variants={inputVariants}>
                        <label htmlFor="experience" className="block text-sm font-semibold text-zinc-300 mb-2">Experience</label>
                        <motion.select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            name="experience"
                            id="experience"
                            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-colors duration-300"
                            whileFocus="focus"
                        >
                            {[...Array(20)].map((_, i) => <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>)}
                        </motion.select>
                    </motion.div>
                </div>

                {/* Right Column Inputs */}
                <div className="space-y-6">
                    <motion.div variants={inputVariants}>
                        <label htmlFor="speciality" className="block text-sm font-semibold text-zinc-300 mb-2">Speciality</label>
                        <motion.select
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            name="speciality"
                            id="speciality"
                            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-colors duration-300"
                            whileFocus="focus"
                        >
                            {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => <option key={spec} value={spec}>{spec}</option>)}
                        </motion.select>
                    </motion.div>

                    {[
                        { label: "Education / Degree", value: degree, setter: setDegree, id: "education" },
                        { label: "Clinic Address Line 1", value: address1, setter: setAddress1, id: "address1", required: true },
                        { label: "Clinic Address Line 2", value: address2, setter: setAddress2, id: "address2" }
                    ].map((field) => (
                        <motion.div key={field.id} variants={inputVariants}>
                            <label htmlFor={field.id} className="block text-sm font-semibold text-zinc-300 mb-2">{field.label}</label>
                            <motion.input
                                value={field.value}
                                type="text"
                                id={field.id}
                                name={field.id}
                                required={field.required}
                                onChange={(e) => field.setter(e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-colors duration-300"
                                whileFocus="focus"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* About Doctor Textarea */}
                <motion.div className="col-span-1 md:col-span-2" variants={inputVariants}>
                    <label htmlFor="about" className="block text-sm font-semibold text-zinc-300 mb-2">About Doctor</label>
                    <motion.textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        name="about"
                        id="about"
                        rows={4}
                        className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none transition-colors duration-300"
                        placeholder="Write a brief bio for the doctor"
                        whileFocus="focus"
                    />
                </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div className="mt-10 text-center" variants={buttonVariants}>
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full md:w-auto px-8 py-4 bg-lime-400 text-zinc-900 font-bold rounded-lg shadow-lg hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-500/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <AnimatePresence mode="wait">
                        {isSubmitting ? (
                            <motion.div key="loading" className="flex items-center justify-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <motion.div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full" variants={loadingVariants} animate="animate"/>
                                <span>Adding Doctor...</span>
                            </motion.div>
                        ) : (
                            <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                Add Doctor
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>
        </motion.form>
    </div>
  );
};

export default AddDoctor;