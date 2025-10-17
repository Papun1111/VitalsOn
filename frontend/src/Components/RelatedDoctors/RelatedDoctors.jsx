import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../../Context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext);
    const [relatedDocs, setRelatedDocs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const filteredDoctors = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelatedDocs(filteredDoctors);
        }
    }, [doctors, speciality, docId]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.08
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        hover: {
            y: -6,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.2
            }
        },
        tap: {
            scale: 0.98
        }
    };

    return (
        <motion.div 
            className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    className="mb-10 space-y-2"
                    variants={headerVariants}
                >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-neutral-900">
                        Recommended Doctors
                    </h1>
                    <p className="text-base text-neutral-600">
                        Explore our trusted list of recommended doctors
                    </p>
                </motion.div>

                {/* Doctors Grid */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                >
                    {relatedDocs.slice(0, 5).map((doctor, index) => (
                        <motion.div 
                            key={index}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden cursor-pointer 
                                border border-neutral-200 hover:border-neutral-300 transition-all duration-200"
                            variants={cardVariants}
                            whileHover="hover"
                            onClick={() => navigate(`/appointment/${doctor._id}`)}
                        >
                            {/* Image Section */}
                            <div className="relative overflow-hidden bg-neutral-50">
                                <motion.img 
                                    src={doctor.image} 
                                    alt={doctor.name} 
                                    className="w-full h-48 object-cover"
                                    variants={imageVariants}
                                />
                                
                                {/* Status Badge */}
                                <motion.div 
                                    className="absolute top-4 right-4"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                                >
                                    <p 
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors duration-200
                                            ${doctor.available ? 
                                                'text-emerald-700 bg-white/90 border border-emerald-200' : 
                                                'text-red-700 bg-white/90 border border-red-200'
                                            }`}
                                    >
                                        {doctor.available ? '● Available' : "● Not Available"}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 space-y-1">
                                <motion.p 
                                    className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 
                                        transition-colors duration-200"
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {doctor.name}
                                </motion.p>
                                <motion.p 
                                    className="text-sm text-neutral-600 group-hover:text-neutral-700 
                                        transition-colors duration-200"
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                >
                                    {doctor.speciality}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* More Button */}
                <motion.div 
                    className="flex justify-center mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <motion.button 
                        className="px-8 py-3 bg-emerald-400 hover:bg-emerald-500 text-neutral-900 rounded-full 
                            font-medium shadow-sm hover:shadow-md transition-all duration-200"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                            navigate("/doctors");
                            window.scrollTo(0, 0);
                        }}
                    >
                        <span className="flex items-center gap-2">
                            See More Doctors
                            <motion.span
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default RelatedDoctors;