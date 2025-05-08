// Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    Home as HomeIcon,
    Accessibility,
    FileText,
    Languages,
    ChevronRight,
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
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef(null);

    // For tracking hover states of nav items for enhanced animations
    const [hoveredIndex, setHoveredIndex] = useState(null);

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

    // Check if a nav link is currently active
    const isActiveLink = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
                            } transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-300/50`}
                        >
                            <Accessibility
                                className={`${
                                    scrolled ? "text-blue-600" : "text-white"
                                } group-hover:scale-125 group-hover:rotate-6 transition-all duration-500`}
                                size={28}
                            />
                        </div>
                        <div className="hidden md:flex flex-col">
                            <span
                                className={`font-extrabold ${
                                    scrolled ? "text-blue-600" : "text-white"
                                } transition-all duration-300 group-hover:tracking-wide`}
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
                        {navLinks.map(({ to, icon, label }, index) => {
                            const isActive = isActiveLink(to);

                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`
                                        ${
                                        scrolled
                                            ? isActive
                                                ? "text-blue-600 bg-blue-50"
                                                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                            : isActive
                                                ? "text-white bg-white/20"
                                                : "text-white hover:text-white hover:bg-white/10"
                                    }
                                        transition-all duration-500 flex items-center gap-2 py-2 px-4 rounded-lg font-medium relative overflow-hidden group
                                        ${isActive ? "shadow-md" : ""}
                                    `}
                                >
                                    {/* Mind-blowing hover effect - particle trail */}
                                    <div className={`
                                        absolute inset-0 w-full h-full
                                        ${hoveredIndex === index ? "opacity-100" : "opacity-0"}
                                        transition-opacity duration-300
                                    `}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/70 via-purple-500/70 to-pink-600/70 animate-pulse"></div>
                                        <div className="absolute -inset-full h-full w-1/2 z-5 transform-gpu blur-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-70 animate-[gradient-x_3s_ease_infinite]"></div>
                                        {/* Animated particles */}
                                        <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-blue-300 animate-ping"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-purple-300 animate-pulse"></div>
                                        <div className="absolute top-1/2 left-3/4 w-1 h-1 rounded-full bg-pink-300 animate-ping delay-300"></div>
                                    </div>

                                    {/* Glowing border for active item */}
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-lg animate-pulse">
                                            <div className="absolute inset-0 rounded-lg border-2 border-blue-400 opacity-50"></div>
                                            <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse"></div>
                                        </div>
                                    )}

                                    {/* Active indicator pill */}
                                    {isActive && (
                                        <>
                                            <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-t-lg shadow-lg shadow-blue-500/50"></div>
                                            <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 rounded-t-lg blur-sm animate-pulse"></div>
                                        </>
                                    )}

                                    <div
                                        className={`
                                            ${
                                            scrolled
                                                ? isActive
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-blue-100 text-blue-600"
                                                : isActive
                                                    ? "bg-white/50 text-white"
                                                    : "bg-white/30 text-white"
                                        } 
                                            rounded-full p-1 transition-all duration-500
                                            group-hover:scale-110 group-hover:rotate-3
                                            ${isActive ? "shadow-md shadow-blue-500/50" : ""}
                                        `}
                                    >
                                        {React.cloneElement(icon, { size: 16 })}
                                    </div>

                                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                        {t[label]}
                                        {isActive && (
                                            <span className="inline-block ml-1 text-xs">
                                                <ChevronRight size={14} className="inline animate-pulse" />
                                            </span>
                                        )}
                                    </span>

                                    {/* Animated dot indicator */}
                                    {index === 0 && (
                                        <span
                                            className={`
                                                absolute -top-1 -right-1 flex h-2 w-2
                                                ${scrolled ? "bg-blue-500" : "bg-white"}
                                                rounded-full animate-ping
                                            `}
                                        ></span>
                                    )}
                                </Link>
                            );
                        })}

                        {/* Language Toggle */}
                        <button
                            onClick={handleToggleLanguage}
                            className={`
                                flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-500
                                ${
                                scrolled
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                            }
                                relative overflow-hidden group
                            `}
                        >
                            {/* Button hover effect */}
                            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-purple-600/80 animate-pulse"></div>
                                <div className="absolute -inset-full h-full w-1/2 z-5 transform-gpu blur-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-70 animate-[gradient-x_3s_ease_infinite]"></div>
                                {/* Small glowing orbs */}
                                <div className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full bg-cyan-300 animate-ping"></div>
                                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-blue-300 animate-pulse"></div>
                            </div>

                            <Languages size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-medium relative z-10">
                                {nextLanguageText()}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
                            lg:hidden p-2 rounded-lg transition-colors duration-300
                            ${
                            scrolled
                                ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                : "text-white hover:bg-white/20"
                        }
                            relative overflow-hidden group
                        `}
                    >
                        {/* Button hover effect */}
                        <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/70 via-blue-500/70 to-cyan-500/70 animate-pulse"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-400/50 to-transparent blur-sm"></div>
                        </div>

                        {isOpen ?
                            <X size={24} className="relative z-10 group-hover:rotate-90 transition-transform duration-300" /> :
                            <Menu size={24} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        }
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
                            {navLinks.map(({ to, icon, label }, index) => {
                                const isActive = isActiveLink(to);

                                return (
                                    <Link
                                        key={to}
                                        to={to}
                                        onClick={() => setIsOpen(false)}
                                        className={`
                                            block py-3 px-4 
                                            ${isActive
                                            ? "text-blue-600 bg-blue-50 shadow-md shadow-blue-200/50"
                                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                        } 
                                            rounded-lg flex items-center gap-3 transition-colors relative overflow-hidden
                                        `}
                                    >
                                        {/* Active indicator */}
                                        {isActive && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-teal-400 rounded-r"></div>
                                        )}

                                        <div className={`
                                            ${isActive
                                            ? "bg-blue-500 text-white shadow-md shadow-blue-300/50"
                                            : "bg-blue-100 text-blue-600"
                                        } 
                                            rounded-full p-2 transition-all duration-300
                                        `}>
                                            {React.cloneElement(icon, { size: 18 })}
                                        </div>

                                        <span className="font-medium">
                                            {t[label]}
                                            {isActive && (
                                                <span className="inline-block ml-1 text-xs">
                                                    <ChevronRight size={14} className="inline animate-pulse" />
                                                </span>
                                            )}
                                        </span>

                                        {index === 0 && (
                                            <span className="absolute right-4 flex h-2 w-2 bg-blue-500 rounded-full animate-ping"></span>
                                        )}
                                    </Link>
                                );
                            })}

                            {/* Mobile Language Toggle */}
                            <button
                                onClick={() => {
                                    handleToggleLanguage();
                                    setIsOpen(false);
                                }}
                                className="block w-full py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-3 transition-colors relative overflow-hidden"
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