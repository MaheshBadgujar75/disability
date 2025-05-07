import React, { createContext, useContext, useState } from "react";

// Create a context for language
const LanguageContext = createContext();

// Create a provider component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("english");

    // Function to toggle between languages
    const toggleLanguage = () => {
        if (language === "english") {
            setLanguage("marathi");
        } else if (language === "marathi") {
            setLanguage("hindi");
        } else {
            setLanguage("english");
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
