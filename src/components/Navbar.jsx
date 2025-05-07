// Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Menu,
    X,
    Home as HomeIcon,
    Accessibility,
    FileText,
    Languages,
} from "lucide-react";

const translations = {
    english: {
        home: "Home",
        disabilities: "Disabilities",
        governmentSchemes: "Government Schemes",
        disabilityCare: "Disability Care",
    },
    marathi: {
        home: "मुख्यपृष्ठ",
        disabilities: "अपंगता",
        governmentSchemes: "सरकारी योजना",
        disabilityCare: "अपंग काळजी",
    },
    hindi: {
        home: "होम",
        disabilities: "विकलांगता",
        governmentSchemes: "सरकारी योजनाएं",
        disabilityCare: "विकलांग देखभाल",
    },
};

const Navbar = ({ language = "english", setLanguage, toggleLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef(null);

    // Implement default toggleLanguage if not provided
    const handleToggleLanguage = () => {
        if (toggleLanguage) {
            toggleLanguage();
        } else if (setLanguage) {
            // Cycle through languages: english -> marathi -> hindi -> english
            const languageOrder = ["english", "marathi", "hindi"];
            const currentIndex = languageOrder.indexOf(language);
            const nextIndex = (currentIndex + 1) % languageOrder.length;
            setLanguage(languageOrder[nextIndex]);
        }
    };

    // Track scroll position for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const navLinks = [
        { to: "/", icon: <HomeIcon className="stroke-current" />, label: "home" },
        { to: "/DisabilityList", icon: <Accessibility className="stroke-current" />, label: "disabilities" },
        { to: "/schemes", icon: <FileText className="stroke-current" />, label: "governmentSchemes" },
    ];

    // Make sure we're using a valid language key
    const safeLanguage = translations[language] ? language : "english";
    const t = translations[safeLanguage];

    // Next language display text
    const nextLanguageText = () => {
        if (safeLanguage === "english") return "भाषा: मराठी";
        if (safeLanguage === "marathi") return "भाषा: हिंदी";
        return "Language: English";
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/95 backdrop-blur-lg shadow-lg py-2"
                    : "bg-gradient-to-r from-blue-600/95 to-teal-500/95 backdrop-blur-lg py-2"
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold flex items-center gap-3 group"
                    >
                        <div
                            className={`p-2 rounded-full ${
                                scrolled ? "bg-blue-100" : "bg-white/20"
                            } transition-all duration-300`}
                        >
                            <Accessibility
                                className={`${
                                    scrolled ? "text-blue-600" : "text-white"
                                } group-hover:scale-110 transition-all duration-300`}
                                size={28}
                            />
                        </div>
                        <div className="hidden md:flex flex-col">
                            <span
                                className={`font-extrabold ${
                                    scrolled ? "text-blue-600" : "text-white"
                                } transition-all duration-300`}
                            >
                                {t.disabilityCare}
                            </span>
                            <span
                                className={`text-xs font-medium ${
                                    scrolled ? "text-blue-400" : "text-blue-100"
                                } transition-all duration-300`}
                            >
                                Empowering Everyone
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {navLinks.map(({ to, icon, label }, index) => (
                            <Link
                                key={to}
                                to={to}
                                className={`${
                                    scrolled
                                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                        : "text-white hover:text-white hover:bg-white/20"
                                } transition-all flex items-center gap-2 py-2 px-4 rounded-lg font-medium relative group`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <div
                                    className={`${
                                        scrolled
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-white/20 text-white"
                                    } rounded-full p-1 transition-all duration-300`}
                                >
                                    {React.cloneElement(icon, { size: 16 })}
                                </div>
                                <span>{t[label]}</span>
                                {index === 0 && (
                                    <span
                                        className={`absolute -top-1 -right-1 flex h-2 w-2 ${
                                            scrolled ? "bg-blue-500" : "bg-white"
                                        } rounded-full`}
                                    ></span>
                                )}
                            </Link>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={handleToggleLanguage}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
                                scrolled
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                            }`}
                        >
                            <Languages size={18} />
                            <span className="font-medium">
                                {nextLanguageText()}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${
                            scrolled
                                ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                : "text-white hover:bg-white/20"
                        }`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="lg:hidden bg-white shadow-lg border-t border-blue-100 animate-in fade-in slide-in-from-top duration-300"
                >
                    <div className="container mx-auto">
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map(({ to, icon, label }, index) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-3 transition-colors relative"
                                >
                                    <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                        {React.cloneElement(icon, { size: 18 })}
                                    </div>
                                    <span className="font-medium">{t[label]}</span>
                                    {index === 0 && (
                                        <span className="absolute right-4 flex h-2 w-2 bg-blue-500 rounded-full"></span>
                                    )}
                                </Link>
                            ))}

                            {/* Mobile Language Toggle */}
                            <button
                                onClick={() => {
                                    handleToggleLanguage();
                                    setIsOpen(false);
                                }}
                                className="block w-full py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-3 transition-colors"
                            >
                                <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                    <Languages size={18} />
                                </div>
                                <span className="font-medium">
                                    {nextLanguageText()}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;