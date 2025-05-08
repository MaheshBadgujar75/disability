import React, { useState } from "react";
import {
    Heart,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Users,
    HandHeart,
    BookOpen,
    Calendar
} from "lucide-react";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log("Subscribing with email:", email);
        setEmail("");
        // Would typically make an API call here
    };

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 to-indigo-950 text-white overflow-hidden">

            <div className="absolute inset-0 w-full h-full z-0">
                <div
                    className="w-full h-full bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage: "url('/FooterImage.png')",
                        backgroundBlendMode: "overlay",
                        backgroundSize: "cover",
                    }}
                    aria-hidden="true"
                ></div>
            </div>


            <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand column */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <Heart className="h-8 w-8 text-red-500 fill-current animate-pulse" />
                            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                DisabilityCare
                            </span>
                        </div>
                        <p className="mt-4 text-gray-300 leading-relaxed">
                            Empowering individuals with disabilities through information,
                            support, and community connection.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-400 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-400 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-400 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-400 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 inline-block pb-2 border-b-2 border-indigo-500">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Disabilities", icon: <Users className="h-4 w-4" /> },
                                { name: "Government Schemes", icon: <BookOpen className="h-4 w-4" /> },
                                { name: "Resources", icon: <BookOpen className="h-4 w-4" /> },
                                { name: "Support", icon: <HandHeart className="h-4 w-4" /> },
                                { name: "Community", icon: <Users className="h-4 w-4" /> },
                                { name: "Events", icon: <Calendar className="h-4 w-4" /> },
                            ].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={`/${item.name.toLowerCase().replace(" ", "-")}`}
                                        className="text-gray-300 hover:text-indigo-400 flex items-center group transition-all"
                                    >
                                        <span className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300 mr-0 group-hover:mr-2">
                                            {item.icon}
                                        </span>
                                        <span>{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Us column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 inline-block pb-2 border-b-2 border-indigo-500">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 group">
                                <Phone className="h-5 w-5 text-indigo-400 mt-1 group-hover:animate-bounce" />
                                <div>
                                    <p className="text-gray-300">Call us at:</p>
                                    <a href="tel:+918850121112" className="hover:text-indigo-400 transition-colors">
                                        +91 8850121112
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3 group">
                                <Mail className="h-5 w-5 text-indigo-400 mt-1 group-hover:animate-bounce" />
                                <div>
                                    <p className="text-gray-300">Email us at:</p>
                                    <a
                                        href="mailto:connect@disabilityinfos.com"
                                        className="hover:text-indigo-400 transition-colors"
                                    >
                                        connect@disabilityinfos.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-indigo-400 mt-1" />
                                <div>
                                    <p className="text-gray-300">Find us at:</p>
                                    <p>Mumbai, India</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter column */}
                    <div className="backdrop-blur-sm bg-indigo-900 bg-opacity-20 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-6 inline-block pb-2 border-b-2 border-indigo-500">
                            Newsletter
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Stay updated with the latest information, schemes, and community
                            events.
                        </p>
                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    aria-label="Email for newsletter"
                                />
                            </div>
                            <button
                                onClick={handleSubscribe}
                                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium"
                            >
                                Subscribe
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-gray-400">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                    <p>&copy; 2024 3Idiots IT Services. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a
                            href="/privacy"
                            className="hover:text-indigo-400 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms"
                            className="hover:text-indigo-400 transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="/accessibility"
                            className="hover:text-indigo-400 transition-colors font-medium"
                        >
                            Accessibility
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;