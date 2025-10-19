import { motion } from 'framer-motion';

// --- Icon Components (Replaced react-icons to fix build error) ---

const FaUserMd = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12,2A5,5,0,0,0,7,7A5,5,0,0,0,12,12A5,5,0,0,0,17,7A5,5,0,0,0,12,2M9,14V22H5V14H3V12H9V14M15.59,14.41L18.17,17L20.75,14.41L22.17,15.83L19.59,18.41L22.17,21L20.75,22.41L18.17,19.83L15.59,22.41L14.17,21L16.75,18.41L14.17,15.83L15.59,14.41Z" />
  </svg>
);

const FaCalendarCheck = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-full h-full">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <path d="m9 16 2 2 4-4"></path>
  </svg>
);

const FaChartLine = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-full h-full">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const FaLock = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-full h-full">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const FiArrowRight = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-full h-full">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);


const AdminLandingPage = () => {
  // Animation variants are preserved to maintain smooth transitions.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.8 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(163, 230, 53, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Background particles updated to the new accent color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-lime-400/10 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center justify-center text-center py-24 px-4 relative z-10"
      >
        <motion.h1
          variants={headerVariants}
          className="text-6xl md:text-7xl font-bold mb-6 text-slate-100"
        >
          VitalsOn Panel
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-10 max-w-3xl text-zinc-400 leading-relaxed"
        >
          Welcome to VitalsOn Panel, your ultimate admin dashboard for managing healthcare services.
        </motion.p>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-lime-400 text-zinc-900 px-8 py-4 rounded-lg shadow-lg hover:shadow-lime-500/20 transition-shadow duration-300 flex items-center gap-3 text-lg font-bold"
        >
          Get Started 
          <span className="w-6 h-6"><FiArrowRight /></span>
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
        <div className="container mx-auto">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-100">
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaUserMd, title: "Add Doctors", description: "Easily create comprehensive profiles to expand your team of healthcare professionals." },
              { icon: FaCalendarCheck, title: "Manage Appointments", description: "Schedule and organize appointments with an intuitive and user-friendly interface." },
              { icon: FaChartLine, title: "Real-time Analytics", description: "Gain instant insights with live data to monitor system performance and outcomes." },
              { icon: FaLock, title: "Secure Access", description: "Protect your admin panel with robust security measures ensuring safe operations." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700/80 shadow-xl"
              >
                <div className="w-12 h-12 text-5xl mb-6 text-lime-400">
                  <feature.icon />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-100">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 bg-zinc-800/50 relative z-10"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10K+", label: "Appointments Managed" },
              { number: "500+", label: "Healthcare Professionals" },
              { number: "99.9%", label: "System Uptime" }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="p-6">
                <h3 className="text-4xl md:text-5xl font-bold text-lime-400 mb-2">{stat.number}</h3>
                <p className="text-zinc-400 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="py-8 text-center border-t border-zinc-700/60 relative z-10">
        <p className="text-zinc-500">&copy; {new Date().getFullYear()} VitalsOn Panel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLandingPage;

