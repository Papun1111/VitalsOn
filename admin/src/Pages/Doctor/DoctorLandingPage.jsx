import React from 'react';
import { motion } from 'motion/react';
import { FaUserEdit, FaVideo, FaCalendarCheck, FaTachometerAlt, FaUserFriends } from 'react-icons/fa';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const DoctorLandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.2,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const features = [
    {
      icon: FaUserEdit,
      title: "Update Profile",
      description: "Keep your profile current with the latest details and credentials.",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: FaVideo,
      title: "Video Calls",
      description: "Connect with your patients via seamless, high-quality video consultations.",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: FaCalendarCheck,
      title: "Appointments",
      description: "Effortlessly schedule and manage your appointments in one intuitive interface.",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: FaTachometerAlt,
      title: "Dashboard",
      description: "Access real-time insights and analytics to monitor your performance.",
      color: "from-orange-600 to-red-600"
    },
    {
      icon: FaUserFriends,
      title: "Patient List",
      description: "Review and manage your patients' records and appointment history effortlessly.",
      color: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.header 
        className="relative flex flex-col items-center justify-center text-center py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <motion.h1 
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Doctor's Portal
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-xl mb-8 max-w-2xl text-gray-300"
          variants={itemVariants}
        >
          Welcome to your personal dashboard. Here you can update your profile, video call with patients, manage appointments, view your dashboard, and access your patient list—all in one place.
        </motion.p>
        
        <motion.button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-semibold"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Get Started 
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FiArrowRight />
          </motion.div>
        </motion.button>
      </motion.header>

      {/* Features Section */}
      <motion.section 
        className="relative py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Your Key Tools
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer bg-gradient-to-br ${feature.color} bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl`}
                variants={cardVariants}
                whileHover="hover"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="mb-6"
                >
                  <feature.icon className="text-5xl text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-white"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {feature.description}
                </motion.p>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 rounded-2xl`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Animated Scroll Cue */}
      <motion.section 
        className="text-center py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <HiOutlineChevronDoubleDown className="mx-auto text-4xl text-blue-400" />
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-8 text-center bg-gradient-to-r from-slate-900 to-gray-900 border-t border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p 
          className="text-gray-400"
          whileHover={{ color: "#ffffff" }}
          transition={{ duration: 0.3 }}
        >
          &copy; {new Date().getFullYear()} Doctor's Portal. All rights reserved.
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default DoctorLandingPage;