// GovernmentSchemes.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "./LanguageContext";

const GovernmentSchemes = () => {
    const { language } = useLanguage();

    // Map context language values to API language parameter values
    const languageMapping = useMemo(() => ({
        english: "en",
        marathi: "mr",
        hindi: "hi"
    }), []);

    const apiLanguage = languageMapping[language] || "en";

    const [schemesData, setSchemesData] = useState({
        schemes: [],
        total: 0,
        limit: 6,
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Translations object - moved to useMemo for performance
    const translations = useMemo(() => ({
        title: { en: "Government Schemes", hi: "सरकारी योजनाएँ", mr: "शासकीय योजना" },
        learnMore: { en: "Learn More", hi: "और जानें", mr: "अधिक जाणून घ्या" },
        pagination: { previous: { en: "Previous", hi: "पिछला", mr: "मागील" }, next: { en: "Next", hi: "अगला", mr: "पुढील" } },
        discover: { en: "Support & Benefits", hi: "समर्थन और लाभ", mr: "समर्थन आणि लाभ" },
        filters: {
            all: { en: "All Schemes", hi: "सभी योजनाएं", mr: "सर्व योजना" },
            Financial: { en: "Financial", hi: "वित्तीय", mr: "आर्थिक" },
            Education: { en: "Education", hi: "शिक्षा", mr: "शिक्षण" },
            Employment: { en: "Employment", hi: "रोजगार", mr: "रोजगार" },
            Healthcare: { en: "Healthcare", hi: "स्वास्थ्य देखभाल", mr: "आरोग्य सेवा" }
        },
        showing: { en: "Showing", hi: "दिखा रहा है", mr: "दर्शवत आहे" },
        of: { en: "of", hi: "में से", mr: "पैकी" },
        schemes: { en: "schemes", hi: "योजनाएँ", mr: "योजना" },
        description: {
            en: "Explore government schemes and benefits available for persons with disabilities, and learn how to access these support services.",
            hi: "विकलांग व्यक्तियों के लिए उपलब्ध सरकारी योजनाओं और लाभों का पता लगाएं, और इन सहायता सेवाओं तक पहुंचने का तरीका जानें।",
            mr: "दिव्यांग व्यक्तींसाठी उपलब्ध असलेल्या शासकीय योजना आणि लाभांचा शोध घ्या आणि या समर्थन सेवांमध्ये प्रवेश कसा करावा हे शिका."
        },
        category: { en: "General", hi: "सामान्य", mr: "सामान्य" },
        noSchemes: { en: "No schemes found for this selection.", hi: "इस चयन के लिए कोई योजना नहीं मिली।", mr: "या निवडीसाठी कोणतीही योजना आढळली नाही." },
        error: { en: "Error fetching data", hi: "डेटा प्राप्त करने में त्रुटि", mr: "डेटा आणण्यात त्रुटी" }
    }), []);

    // Fetch schemes data from API
    const fetchSchemeData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            let url = `http://localhost:5000/api/governmentschemes?page=${page}&limit=${schemesData.limit}&language=${apiLanguage}`;
            if (categoryFilter !== "all") url += `&category=${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}`;

            const response = await axios.get(url);
            console.log("API Response:", response.data);

            // Fix: correctly structure the data from the API response
            setSchemesData({
                schemes: response.data.data || [],
                total: response.data.total || 0,
                limit: response.data.limit || 6,
            });
        } catch (err) {
            console.error("API Error:", err);
            setError(`Error fetching data: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    }, [page, categoryFilter, apiLanguage, schemesData.limit]);

    useEffect(() => {
        fetchSchemeData();
    }, [fetchSchemeData]);

    // Animation variants - moved to useMemo for performance
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }), []);

    // Decorative shapes component - memoized for performance
    const DecorativeShapes = React.memo(() => (
        <>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            <div className="absolute top-20 right-10 w-16 h-16 bg-blue-100 rounded-full blur-xl opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-60 pointer-events-none"></div>
        </>
    ));

    // Pagination calculation
    const totalPages = useMemo(() =>
            Math.ceil(schemesData.total / schemesData.limit) || 1
        , [schemesData.total, schemesData.limit]);

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

                {/* Category Filters */}
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
                            onClick={() => {
                                setCategoryFilter(category);
                                setPage(1); // Reset page when changing category
                            }}
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

                {/* Loader / Error Handling */}
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
                ) : !schemesData?.schemes?.length ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-16 px-8 bg-blue-50 rounded-3xl border border-blue-100 shadow-xl"
                    >
                        <svg className="w-16 h-16 text-blue-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-2xl font-semibold text-blue-700">{translations.noSchemes[apiLanguage]}</p>
                    </motion.div>
                ) : (
                    <>
                        {/* Schemes Cards */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
                        >
                            {schemesData.schemes.map((scheme, index) => (
                                <motion.div
                                    key={scheme._id || index}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -10,
                                        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.2)",
                                        transition: { duration: 0.3 }
                                    }}
                                    className="bg-white rounded-3xl overflow-hidden flex flex-col h-full shadow-xl group border border-slate-100"
                                >
                                    <div className="h-64 w-full relative overflow-hidden">
                                        {scheme.image ? (
                                            <>
                                                <motion.img
                                                    src={scheme.image}
                                                    alt={scheme.name}
                                                    className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 1 }}
                                                    loading="lazy"
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
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                                </motion.svg>
                                            </div>
                                        )}

                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                            className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold text-blue-700 shadow-lg"
                                        >
                                            {scheme.category || translations.category[apiLanguage]}
                                        </motion.div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow border-t border-slate-100">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                            {scheme.name}
                                        </h3>
                                        <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                                            {scheme.shortDescription ||
                                                (scheme.description && scheme.description.length > 150
                                                    ? `${scheme.description.substring(0, 150)}...`
                                                    : scheme.description)}
                                        </p>

                                        <Link
                                            to={`/schemes/${scheme._id}`}
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

                        {/* Pagination */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-between mt-12 bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                        >
                            <div className="text-slate-600 mb-6 sm:mb-0 font-medium text-lg">
                                {translations.showing[apiLanguage]} <span className="font-bold text-blue-600">{schemesData.schemes.length}</span> {translations.of[apiLanguage]} <span className="font-bold text-blue-600">{schemesData.total}</span> {translations.schemes[apiLanguage]}
                            </div>

                            <div className="flex gap-5">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className={`flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-md font-medium transition-colors duration-300 ${
                                        page === 1
                                            ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                                            : "text-slate-700 hover:bg-slate-50"
                                    }`}
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
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={page >= totalPages}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg font-medium transition-all duration-300 ${
                                        page >= totalPages
                                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:shadow-xl hover:bg-blue-700"
                                    }`}
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

export default GovernmentSchemes;