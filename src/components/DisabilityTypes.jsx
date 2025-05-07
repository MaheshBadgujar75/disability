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

    // Decorative shapes for visual interest
    const DecorativeShapes = () => (
        <>
            {/* Top left decorative shape */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

            {/* Bottom right decorative shape */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

            {/* Top right small accents */}
            <div className="absolute top-10 right-20 w-16 h-16 bg-yellow-100 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
            <div className="absolute top-20 right-40 w-8 h-8 bg-indigo-200 rounded-full blur-xl opacity-60 pointer-events-none"></div>

            {/* Bottom left small accents */}
            <div className="absolute bottom-20 left-10 w-12 h-12 bg-pink-100 rounded-full blur-xl opacity-60 pointer-events-none"></div>
        </>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 py-28 relative overflow-hidden">
            <DecorativeShapes />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 relative"
                >
                    {/* Animated accent circles */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute top-0 left-1/4 w-6 h-6 rounded-full bg-yellow-300 opacity-70"
                    ></motion.div>

                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                        className="absolute bottom-0 right-1/4 w-8 h-8 rounded-full bg-indigo-300 opacity-70"
                    ></motion.div>

                    <motion.div
                        animate={{
                            x: [0, 10, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                        className="absolute top-12 right-1/3 w-4 h-4 rounded-full bg-pink-300 opacity-70"
                    ></motion.div>

                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-indigo-100 text-indigo-800 px-8 py-3 rounded-full text-sm font-medium inline-block mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        {translations.discover[apiLanguage]}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500 text-transparent"
                    >
                        {translations.title[apiLanguage]}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        {translations.description[apiLanguage]}
                    </motion.p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-wrap justify-center gap-4 mb-14"
                >
                    {Object.entries(translations.filters).map(([category, translation], index) => (
                        <motion.button
                            key={category}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.8 + (index * 0.1)
                            }}
                            onClick={() => setCategoryFilter(category)}
                            className={`px-7 py-3 rounded-full text-base font-medium transition-all duration-300 ${categoryFilter === category
                                ? "bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500 ring-offset-2"
                                : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                            }`}
                        >
                            {translation[apiLanguage]}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Loader / Error Handling */}
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center my-16"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            <div className="w-4 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-16 px-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-100 shadow-lg"
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
                        className="text-center py-16 px-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-100 shadow-lg"
                    >
                        <svg className="w-16 h-16 text-yellow-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-2xl font-semibold text-yellow-700">{translations.noDisabilities[apiLanguage]}</p>
                    </motion.div>
                ) : (
                    <>
                        {/* Disability Cards */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 mb-16"
                        >
                            {disabilityData.disabilities.map((disability, index) => (
                                <motion.div
                                    key={disability._id}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                        transition: { duration: 0.3 }
                                    }}
                                    className="bg-white rounded-2xl overflow-hidden flex flex-col h-full shadow-lg group"
                                >
                                    <div className="h-72 w-full relative overflow-hidden">
                                        {disability.image ? (
                                            <>
                                                <motion.img
                                                    src={disability.image}
                                                    alt={disability.name}
                                                    className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.08 }}
                                                    transition={{ duration: 1 }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
                                                <motion.svg
                                                    animate={{
                                                        rotateZ: [0, 10, 0, -10, 0],
                                                        scale: [1, 1.1, 1, 1.1, 1]
                                                    }}
                                                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                                                    className="w-32 h-32 text-indigo-300"
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
                                            className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 shadow-md"
                                        >
                                            {disability.category || translations.category[apiLanguage]}
                                        </motion.div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow border-t border-gray-100">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                                            {disability.name}
                                        </h3>
                                        <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                                            {disability.shortDescription ||
                                                (disability.description && disability.description.length > 150
                                                    ? `${disability.description.substring(0, 150)}...`
                                                    : disability.description)}
                                        </p>

                                        <Link
                                            to={`/disabilities/${disability._id}`}
                                            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg"
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

                        {/* Pagination */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-between mt-12 bg-white p-6 rounded-2xl shadow-lg border border-indigo-50"
                        >
                            <div className="text-gray-600 mb-4 sm:mb-0 font-medium">
                                {translations.showing[apiLanguage]} <span className="font-bold text-indigo-700">{disabilityData.disabilities.length}</span> {translations.of[apiLanguage]} <span className="font-bold text-indigo-700">{disabilityData.total}</span> {translations.types[apiLanguage]}
                            </div>

                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 transition-colors duration-300 shadow-sm font-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    {translations.pagination.previous[apiLanguage]}
                                </motion.button>

                                <div className="flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold rounded-xl w-12 h-12 shadow-inner">
                                    {page}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPage((prev) => prev + 1)}
                                    disabled={page >= Math.ceil(disabilityData.total / disabilityData.limit)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:from-indigo-300 disabled:to-indigo-300 transition-colors duration-300 shadow-md font-medium"
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