// DisabilityList.js
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "./LanguageContext";

const DisabilityList = () => {
    const { language } = useLanguage();

    // Map your context language values to API language parameter values
    const languageMapping = {
        english: "en",
        marathi: "mr",
        hindi: "hi"
    };

    const apiLanguage = languageMapping[language];

    const [disabilityData, setDisabilityData] = useState({
        disabilities: [],
        total: 0,
        limit: 6,
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("all");

    const fetchDisabilities = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            let url = `http://localhost:5000/api/disabilitiestypes?page=${page}&limit=${disabilityData.limit}&language=${apiLanguage}`;
            if (categoryFilter !== "all") url += `&category=${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}`;

            const { data } = await axios.get(url);
            setDisabilityData({
                disabilities: data.data || [],
                total: data.total || 0,
                limit: data.limit || 6,
            });
        } catch (err) {
            setError(`Error fetching data: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    }, [page, categoryFilter, apiLanguage, disabilityData.limit]);

    useEffect(() => {
        fetchDisabilities();
    }, [fetchDisabilities]);

    const translations = {
        title: { en: "Types of Disabilities", hi: "विकलांगता के प्रकार", mr: "अपंगत्वाचे प्रकार" },
        learnMore: { en: "Learn More", hi: "और जानें", mr: "अधिक जाणून घ्या" },
        pagination: { previous: { en: "Previous", hi: "पिछला", mr: "मागील" }, next: { en: "Next", hi: "अगला", mr: "पुढील" } },
        discover: { en: "Discover & Understand", hi: "खोजें और समझें", mr: "शोधा आणि समजून घ्या" },
        filters: {
            all: { en: "All Types", hi: "सभी प्रकार", mr: "सर्व प्रकार" },
            Physical: { en: "Physical", hi: "शारीरिक", mr: "शारीरिक" },
            Sensory: { en: "Sensory", hi: "संवेदी", mr: "संवेदी" },
            Cognitive: { en: "Cognitive", hi: "संज्ञानात्मक", mr: "संज्ञानात्मक" }
        },
        showing: { en: "Showing", hi: "दिखा रहा है", mr: "दर्शवत आहे" },
        of: { en: "of", hi: "में से", mr: "पैकी" },
        types: { en: "types", hi: "प्रकार", mr: "प्रकार" },
        description: {
            en: "Explore different types of disabilities and learn how to better understand and support individuals with various needs.",
            hi: "विभिन्न प्रकार की विकलांगताओं का पता लगाएं और विभिन्न आवश्यकताओं वाले व्यक्तियों को बेहतर ढंग से समझने और समर्थन करने का तरीका जानें।",
            mr: "विविध प्रकारच्या अपंगत्वांचा शोध घ्या आणि विविध गरजा असलेल्या व्यक्तींना चांगल्या प्रकारे समजून घेण्यासाठी आणि त्यांना समर्थन देण्यासाठी शिका."
        },
        category: { en: "General", hi: "सामान्य", mr: "सामान्य" },
        noDisabilities: { en: "No disabilities found for this selection.", hi: "इस चयन के लिए कोई विकलांगता नहीं मिली।", mr: "या निवडीसाठी कोणतीही अपंगता आढळली नाही." },
        error: { en: "Error fetching data", hi: "डेटा प्राप्त करने में त्रुटि", mr: "डेटा आणण्यात त्रुटी" }
    };

    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    // Updated decorative shapes with blue and white color scheme
    const DecorativeShapes = () => (
        <>
            {/* Left top decorative shape */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

            {/* Right bottom decorative shape */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

            {/* Center accent */}
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

            {/* Small accents */}
            <div className="absolute top-20 right-10 w-16 h-16 bg-blue-100 rounded-full blur-xl opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-60 pointer-events-none"></div>
        </>
    );

    return (
        <div className="min-h-screen bg-white py-32 relative overflow-hidden">
            <DecorativeShapes />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20 relative"
                >
                    {/* Animated accent circles */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute top-0 left-1/4 w-6 h-6 rounded-full bg-blue-300 opacity-70"
                    ></motion.div>

                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                        className="absolute bottom-0 right-1/4 w-8 h-8 rounded-full bg-blue-300 opacity-70"
                    ></motion.div>

                    <motion.div
                        animate={{
                            x: [0, 10, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                        className="absolute top-12 right-1/3 w-4 h-4 rounded-full bg-blue-300 opacity-70"
                    ></motion.div>

                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-blue-50 text-blue-800 px-8 py-3 rounded-full text-sm font-medium inline-block mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        {translations.discover[apiLanguage]}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-blue-700"
                    >
                        {translations.title[apiLanguage]}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        {translations.description[apiLanguage]}
                    </motion.p>
                </motion.div>

                {/* Category Filters - Enhanced with blue and white color scheme */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-wrap justify-center gap-5 mb-16"
                >
                    {Object.entries(translations.filters).map(([category, translation], index) => (
                        <motion.button
                            key={category}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.2)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.8 + (index * 0.1)
                            }}
                            onClick={() => setCategoryFilter(category)}
                            className={`px-8 py-4 rounded-full text-base font-medium transition-all duration-300 ${
                                categoryFilter === category
                                    ? "bg-blue-600 text-white shadow-xl ring-2 ring-blue-400 ring-offset-2"
                                    : "bg-white text-slate-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-slate-100"
                            }`}
                        >
                            {translation[apiLanguage]}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Loader / Error Handling - Enhanced */}
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center my-20"
                    >
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-5 h-5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            <div className="w-5 h-5 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-16 px-8 bg-red-50 rounded-3xl border border-red-100 shadow-xl"
                    >
                        <svg className="w-16 h-16 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-2xl font-semibold text-red-700 mb-2">{translations.error[apiLanguage]}</p>
                        <p className="text-red-600">{error}</p>
                    </motion.div>
                ) : disabilityData.disabilities.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-16 px-8 bg-blue-50 rounded-3xl border border-blue-100 shadow-xl"
                    >
                        <svg className="w-16 h-16 text-blue-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-2xl font-semibold text-blue-700">{translations.noDisabilities[apiLanguage]}</p>
                    </motion.div>
                ) : (
                    <>
                        {/* Disability Cards - Redesigned with blue and white color scheme */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
                        >
                            {disabilityData.disabilities.map((disability, index) => (
                                <motion.div
                                    key={disability._id}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -10,
                                        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.2)",
                                        transition: { duration: 0.3 }
                                    }}
                                    className="bg-white rounded-3xl overflow-hidden flex flex-col h-full shadow-xl group border border-slate-100"
                                >
                                    <div className="h-64 w-full relative overflow-hidden">
                                        {disability.image ? (
                                            <>
                                                <motion.img
                                                    src={disability.image}
                                                    alt={disability.name}
                                                    className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 1 }}
                                                />
                                                <div className="absolute inset-0 bg-blue-900/30"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full bg-blue-50 flex items-center justify-center overflow-hidden">
                                                <motion.svg
                                                    animate={{
                                                        rotateZ: [0, 10, 0, -10, 0],
                                                        scale: [1, 1.1, 1, 1.1, 1]
                                                    }}
                                                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                                                    className="w-32 h-32 text-blue-300"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </motion.svg>
                                            </div>
                                        )}

                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                            className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold text-blue-700 shadow-lg"
                                        >
                                            {disability.category || translations.category[apiLanguage]}
                                        </motion.div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow border-t border-slate-100">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                            {disability.name}
                                        </h3>
                                        <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                                            {disability.shortDescription ||
                                                (disability.description && disability.description.length > 150
                                                    ? `${disability.description.substring(0, 150)}...`
                                                    : disability.description)}
                                        </p>

                                        <Link
                                            to={`/disabilities/${disability._id}`}
                                            className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 text-center font-medium shadow-lg hover:bg-blue-700"
                                        >
                                            {translations.learnMore[apiLanguage]}
                                            <motion.svg
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </motion.svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination - Enhanced with blue and white color scheme */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-between mt-12 bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                        >
                            <div className="text-slate-600 mb-6 sm:mb-0 font-medium text-lg">
                                {translations.showing[apiLanguage]} <span className="font-bold text-blue-600">{disabilityData.disabilities.length}</span> {translations.of[apiLanguage]} <span className="font-bold text-blue-600">{disabilityData.total}</span> {translations.types[apiLanguage]}
                            </div>

                            <div className="flex gap-5">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 transition-colors duration-300 shadow-md font-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    {translations.pagination.previous[apiLanguage]}
                                </motion.button>

                                <div className="flex items-center justify-center bg-blue-50 text-blue-700 font-bold rounded-xl w-14 h-14 shadow-inner">
                                    {page}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPage((prev) => prev + 1)}
                                    disabled={page >= Math.ceil(disabilityData.total / disabilityData.limit)}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-xl hover:bg-blue-700 disabled:bg-slate-300 transition-all duration-300 shadow-lg font-medium"
                                >
                                    {translations.pagination.next[apiLanguage]}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DisabilityList;