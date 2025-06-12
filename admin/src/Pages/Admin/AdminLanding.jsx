
import { motion } from 'motion/react';
import { FaUserMd, FaCalendarCheck, FaChartLine, FaLock } from 'react-icons/fa';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const AdminLandingPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      rotateY: 5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, #0f172a, #1e293b, #334155)",
        "linear-gradient(45deg, #1e293b, #334155, #475569)",
        "linear-gradient(45deg, #0f172a, #1e293b, #334155)"
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      variants={backgroundVariants}
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center justify-center text-center py-20 px-4 relative z-10"
      >
        <motion.h1
          variants={headerVariants}
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
        >
          VitalsOn Panel
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 max-w-3xl text-slate-300 leading-relaxed"
        >
          Welcome to VitalsOn Panel, your ultimate admin dashboard for managing healthcare services. 
          Easily add doctors, organize appointments, and monitor real-time analytics—all in one place.
        </motion.p>
        
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 text-lg font-semibold"
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-20 px-4 relative z-10"
      >
        <motion.div variants={itemVariants} className="container mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent"
          >
            Key Features
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: FaUserMd,
                title: "Add Doctors",
                description: "Easily create comprehensive profiles to expand your team of healthcare professionals.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: FaCalendarCheck,
                title: "Manage Appointments",
                description: "Schedule and organize appointments with an intuitive and user-friendly interface.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: FaChartLine,
                title: "Real-time Analytics",
                description: "Gain instant insights with live data to monitor system performance and outcomes.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: FaLock,
                title: "Secure Access",
                description: "Protect your admin panel with robust security measures ensuring safe operations.",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden group"
              >
                {/* Card background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`text-5xl mb-6 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent relative z-10`}
                >
                  <feature.icon />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Animated Scroll Cue */}
      <motion.section
        variants={floatingVariants}
        animate="animate"
        className="text-center py-10 relative z-10"
      >
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="inline-block"
        >
          <HiOutlineChevronDoubleDown className="mx-auto text-4xl text-blue-400" />
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm relative z-10"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10K+", label: "Appointments Managed" },
              { number: "500+", label: "Healthcare Professionals" },
              { number: "99.9%", label: "System Uptime" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6"
              >
                <motion.h3
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-blue-400 mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-slate-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 text-center bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 relative z-10"
      >
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-slate-400"
        >
          &copy; {new Date().getFullYear()} VitalsOn Panel. All rights reserved.
        </motion.p>
      </motion.footer>
    </motion.div>
  );
};

export default AdminLandingPage;