import React from 'react';
import { motion } from 'motion/react';
import { FaUserEdit, FaVideo, FaCalendarCheck, FaTachometerAlt, FaUserFriends } from 'react-icons/fa';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DoctorLandingPage = () => {
  // Animation variants (preserved)
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
  const cardVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }, hover: { scale: 1.05, y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)", transition: { duration: 0.3, ease: "easeInOut" } } };
  const buttonVariants = { hover: { scale: 1.05, boxShadow: "0 10px 30px rgba(163, 230, 53, 0.2)" }, tap: { scale: 0.95 } };

  const features = [
    { icon: FaUserEdit, title: "Update Profile", description: "Keep your profile current with the latest details and credentials." },
    { icon: FaVideo, title: "Video Calls", description: "Connect with patients via seamless, high-quality video consultations." },
    { icon: FaCalendarCheck, title: "Appointments", description: "Effortlessly schedule and manage your appointments in one intuitive interface." },
    { icon: FaTachometerAlt, title: "Dashboard", description: "Access real-time insights and analytics to monitor your performance." },
    { icon: FaUserFriends, title: "Patient List", description: "Review and manage your patients' records and appointment history." },
  ];
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-lime-500/10 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-lime-500/10 rounded-full filter blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Section */}
      <motion.header 
        className="relative flex flex-col items-center justify-center text-center py-24 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-6xl font-bold mb-4 text-zinc-100"
          variants={itemVariants}
        >
          Doctor's Portal
        </motion.h1>
        
        <motion.p 
          className="text-xl mb-10 max-w-2xl text-zinc-400"
          variants={itemVariants}
        >
          Welcome to your personal dashboard. Here you can manage appointments, consult with patients, and view your performance—all in one place.
        </motion.p>
        
        <motion.button 
          className="bg-lime-400 text-zinc-900 px-8 py-4 rounded-lg shadow-lg flex items-center gap-3 font-bold text-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={()=>navigate("/doctor-dashboard")}
        >
          Go to Dashboard <FiArrowRight />
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
            className="text-4xl font-bold text-center mb-16 text-zinc-100"
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
                className="cursor-pointer bg-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-xl"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="mb-6 text-lime-400 text-5xl">
                    <feature.icon />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-zinc-100">
                  {feature.title}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Animated Scroll Cue */}
      <motion.div 
        className="text-center py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiOutlineChevronDoubleDown className="mx-auto text-4xl text-lime-400" />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-zinc-700/60">
        <p className="text-zinc-500">
          &copy; {new Date().getFullYear()} Doctor's Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default DoctorLandingPage;