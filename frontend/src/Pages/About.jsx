import React from 'react';
import { motion } from "motion/react"
import { assets } from '../assets/assets';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <motion.p 
          className="text-3xl font-semibold transition-all hover:underline hover:text-blue-600"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          About <span className="text-blue-600">Us</span>
        </motion.p>
      </motion.div>

      {/* About Section */}
      <motion.div 
        className="flex flex-col md:flex-row items-center mb-10"
        variants={itemVariants}
      >
        <motion.img
          src={assets.about_image}
          alt="VitalsOn"
          className="w-full md:max-w-sm hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8"
          variants={imageVariants}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.div variants={itemVariants}>
          <motion.p 
            className="text-gray-700 leading-relaxed mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="font-bold text-slate-800">VitalsOn</span> is a streamlined online platform designed to simplify access to
            healthcare services and enhance patient convenience. This user-friendly website offers a seamless interface
            for scheduling appointments with a wide range of healthcare professionals. Whether you need a consultation
            with a general practitioner or a specialist, VitalsOn makes it easy to find the right doctor and book an
            appointment at a time that suits you. The platform is committed to ensuring that patients can access medical
            services quickly and efficiently, making healthcare more accessible than ever.
          </motion.p>
          <motion.p 
            className="text-gray-700 leading-relaxed mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            With <span className="font-bold text-slate-800">VitalsOn</span>, users can browse doctor profiles, check available times,
            and schedule appointments with just a few clicks, eliminating the need to wait in long lines or navigate
            complicated scheduling systems. The website also provides detailed information about each doctor's
            qualifications, areas of expertise, and patient reviews, helping users make informed decisions about their
            healthcare.
          </motion.p>

          <motion.b 
            className="block text-lg text-indigo-700 font-semibold my-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Our Vision
          </motion.b>
          <motion.p 
            className="text-gray-700 leading-relaxed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            The vision of <span className="font-bold text-slate-800">VitalsOn</span> is to transform healthcare accessibility by
            leveraging technology to provide a seamless, secure, and efficient platform that connects patients directly
            with healthcare providers. VitalsOn aims to eliminate barriers to healthcare such as geographic limitations
            and scheduling difficulties, making it easier for everyone to get timely medical attention. By enhancing the
            convenience of accessing health services, VitalsOn aspires to contribute to a healthier, more empowered
            population where quality medical care is just a click away.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div 
        className="text-xl mb-6"
        variants={itemVariants}
      >
        <motion.p 
          className="font-semibold"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Why <span className="text-blue-600">Choose Us</span>
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        variants={containerVariants}
      >
        {/* Efficiency */}
        <motion.div 
          className="p-4 border border-blue-200 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.b 
            className="font-bold text-indigo-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Efficiency
          </motion.b>
          <motion.p 
            className="text-gray-700 leading-relaxed mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            Efficiency in the context of <span className="font-bold text-slate-800">VitalsOn</span> refers to the platform's ability to
            streamline the process of accessing healthcare services, significantly reducing the time and effort required
            for patients to connect with healthcare providers. This is achieved through an intuitive interface that
            simplifies the appointment booking process, allowing patients to find and schedule consultations with
            doctors in just a few clicks.
          </motion.p>
        </motion.div>

        {/* Convenience */}
        <motion.div 
          className="p-4 border border-emerald-200 rounded-md bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.15)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.b 
            className="font-bold text-emerald-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Convenience
          </motion.b>
          <motion.p 
            className="text-gray-700 leading-relaxed mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="font-bold text-slate-800">VitalsOn</span> is designed to maximize convenience for its users, transforming
            the way patients access healthcare services. The platform allows users to manage their healthcare needs from
            the comfort of their homes or while on the go, using any device with internet access. This accessibility is
            crucial for those who may have mobility challenges, limited access to transportation, or tight schedules.
          </motion.p>
        </motion.div>

        {/* Personalization */}
        <motion.div 
          className="p-4 border border-purple-200 rounded-md bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(147, 51, 234, 0.15)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.b 
            className="font-bold text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Personalization
          </motion.b>
          <motion.p 
            className="text-gray-700 leading-relaxed mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <span className="font-bold text-slate-800">VitalsOn</span> emphasizes personalization to enhance the healthcare experience
            for each user. The platform tailors its services to meet the unique needs and preferences of individual
            patients, ensuring that their healthcare journey is both effective and satisfying.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;