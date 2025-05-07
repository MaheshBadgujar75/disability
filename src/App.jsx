import React from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./components/LanguageContext.jsx";
import Navbar from "./components/Navbar.jsx";
import DisabilityList from "./components/DisabilityTypes.jsx";
import Home from "./components/Home.jsx";
// import GovernmentSchemes from "./components/governmentschemes";
// import Footer from "./components/footer";

function App() {
  return (
      <LanguageProvider>s
        <AppContent />
      </LanguageProvider>
  );
}

function AppContent() {
  const { language, toggleLanguage } = useLanguage();

  return (
      <>
        <Navbar
            language={language}
            toggleLanguage={toggleLanguage}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DisabilityList" element={<DisabilityList />} />
          {/*<Route path="/schemes" element={<GovernmentSchemes />} />*/}
        </Routes>
        {/*<Footer />*/}
      </>
  );
}

export default App;