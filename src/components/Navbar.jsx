// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import icons from react-icons library
// You'll need to install this package: npm install react-icons
import { FaHome, FaAccessibleIcon, FaFileAlt, FaBars, FaTimes, FaLanguage } from 'react-icons/fa';

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

// This component now accepts language, setLanguage, and toggleLanguage as props
function Navbar({ language, setLanguage, toggleLanguage }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { to: "/", icon: <FaHome />, label: "home" },
        {
            to: "/DisabilityList",
            icon: <FaAccessibleIcon />,
            label: "disabilities",
        },
        {
            to: "/schemes",
            icon: <FaFileAlt />,
            label: "governmentSchemes",
        },
    ];

    const t = translations[language];

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
                            <FaAccessibleIcon
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

                    {/* Right side - Navigation Links and Language Selector */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Navigation Links - Now on right side */}
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
                                    {React.cloneElement(icon, {
                                        size: 16,
                                        className: `${scrolled ? "text-blue-600" : "text-white"}`
                                    })}
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

                        {/* Language Toggle Button */}
                        <button
                            onClick={toggleLanguage}
                            className={`
                flex items-center gap-2 rounded-full px-4 py-2 transition-all
                ${
                                scrolled
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                            }
              `}
                        >
                            <FaLanguage size={18} />
                            <span className="font-medium">
                {language === "english"
                    ? "भाषा: मराठी"
                    : language === "marathi"
                        ? "भाषा: हिंदी"
                        : "Language: English"}
              </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
              lg:hidden p-2 rounded-lg transition-colors
              ${
                            scrolled
                                ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                : "text-white hover:bg-white/20"
                        }
            `}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white shadow-lg border-t border-blue-100 animate-in fade-in slide-in-from-top duration-300">
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

                            {/* Language Toggle for Mobile */}
                            <button
                                onClick={toggleLanguage}
                                className="block w-full py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-3 transition-colors"
                            >
                                <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                    <FaLanguage size={18} />
                                </div>
                                <span className="font-medium">
                  {language === "english"
                      ? "भाषा: मराठी"
                      : language === "marathi"
                          ? "भाषा: हिंदी"
                          : "Language: English"}
                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;