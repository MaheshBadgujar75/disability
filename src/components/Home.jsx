import React, { useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    AnimatePresence
} from "framer-motion";
import {
    Accessibility,
    Brain,
    GraduationCap,
    Heart,
    Building,
    HomeIcon,
    Eye,
    BookOpen,
    Clock,
    Laptop,
    Globe,
    Layout,
    Briefcase,
    BarChart,
    Scale,
    Activity,
    Languages,
    ChevronDown,
    ArrowRight,
    Menu,
    X
} from "lucide-react";

// Language translations
const translations = {
    english: {
        // Hero section
        heroTitle: "Understanding Disability",
        heroSubtitle:
            "Comprehensive information about disability types, rights, accessibility standards, and key statistics.",
        exploreButton: "Explore Disability Types",
        learnButton: "Learn About Rights",

        // Section titles
        disabilityTypesTitle: "Types of Disabilities",
        disabilityTypesSubtitle:
            "Understanding different disabilities helps create more inclusive environments and appropriate accommodations.",
        educationTitle: "Education and Disability",
        educationSubtitle:
            "Information about educational supports, accommodations, and legal rights for students with disabilities.",
        rightsTitle: "Disability Rights",
        rightsSubtitle:
            "Understanding legal protections and rights for people with disabilities in various settings.",
        accessibilityTitle: "Accessibility Standards",
        accessibilitySubtitle:
            "Key frameworks and guidelines for creating accessible environments, products, and services.",

        // Language toggle
        languageToggle: "भाषा: हिंदी",

        // Disability types
        physicalTitle: "Physical Disabilities",
        physicalDesc:
            "Physical disabilities affect motor function and mobility, including conditions like cerebral palsy, spinal cord injuries, amputation, and muscular dystrophy.",
        sensoryTitle: "Sensory Disabilities",
        sensoryDesc:
            "Sensory disabilities affect one or more senses, including vision loss, hearing impairment, and conditions affecting touch, taste, and smell.",
        intellectualTitle: "Intellectual Disabilities",
        intellectualDesc:
            "Intellectual disabilities involve limitations in intellectual functioning and adaptive behavior, affecting learning, reasoning, problem-solving, and social skills.",
        psychiatricTitle: "Psychiatric Disabilities",
        psychiatricDesc:
            "Psychiatric disabilities include mental health conditions like depression, anxiety, bipolar disorder, and schizophrenia that significantly impact daily functioning.",

        // Education resources
        specialEdTitle: "Special Education",
        specialEdDesc:
            "Information about special education systems, including IEPs, Section 504 plans, and inclusion practices designed to support students with disabilities.",
        earlyIntTitle: "Early Intervention",
        earlyIntDesc:
            "Details on early intervention services for children from birth to age three with developmental delays or disabilities to improve developmental outcomes.",
        assistiveTechTitle: "Assistive Learning Technology",
        assistiveTechDesc:
            "Overview of assistive technologies used in education, including screen readers, speech-to-text software, and alternative input devices.",
        accessCurrTitle: "Accessible Curriculum",
        accessCurrDesc:
            "Information about Universal Design for Learning (UDL) principles and creating accessible educational materials for diverse learning needs.",

        // Rights information
        adaTitle: "Americans with Disabilities Act",
        adaDesc:
            "Key information about the ADA, which prohibits discrimination against individuals with disabilities in all areas of public life.",
        employmentTitle: "Employment Rights",
        employmentDesc:
            "Information about reasonable accommodations, non-discrimination requirements, and resources for employees and employers.",
        housingTitle: "Housing Accessibility",
        housingDesc:
            "Overview of Fair Housing Act provisions related to accessibility requirements and reasonable modifications for people with disabilities.",
        publicAccomTitle: "Public Accommodations",
        publicAccomDesc:
            "Requirements for accessibility in public spaces, businesses, and transportation systems to ensure equal access and participation.",

        // Accessibility standards
        webAccessTitle: "Web Accessibility",
        webAccessDesc:
            "Information about WCAG standards, creating accessible digital content, and evaluating websites for accessibility compliance.",
        universalDesignTitle: "Universal Design",
        universalDesignDesc:
            "Principles of universal design that create environments usable by all people without need for adaptation or specialized design.",
        assistiveTechStdTitle: "Assistive Technology",
        assistiveTechStdDesc:
            "Overview of tools and devices that help people with disabilities perform actions, tasks, and activities that might otherwise be difficult.",
        disabilityStatsTitle: "Disability Statistics",
        disabilityStatsDesc:
            "Key data about disability prevalence, employment rates, education access, and other important metrics for understanding disability issues.",

        // Footer
        footerText: "Promoting accessibility and inclusion for all",
        navigation: "Navigation",
        resources: "Resources",
        contact: "Contact Us",
        newsletter: "Sign up for updates",
        subscribeButton: "Subscribe",
        emailPlaceholder: "Enter your email",
    },
    marathi: {
        // Hero section
        heroTitle: "अपंगत्व समजून घेणे",
        heroSubtitle:
            "अपंगत्वाचे प्रकार, अधिकार, प्रवेशयोग्यता मानके आणि महत्त्वपूर्ण आकडेवारी याविषयी सर्वसमावेशक माहिती.",
        exploreButton: "अपंगत्वाचे प्रकार जाणून घ्या",
        learnButton: "अधिकारांबद्दल शिका",

        // Section titles
        disabilityTypesTitle: "अपंगत्वाचे प्रकार",
        disabilityTypesSubtitle:
            "विविध अपंगत्व समजून घेणे अधिक समावेशक वातावरण आणि योग्य सोयी निर्माण करण्यात मदत करते.",
        educationTitle: "शिक्षण आणि अपंगत्व",
        educationSubtitle:
            "अपंगत्व असलेल्या विद्यार्थ्यांसाठी शैक्षणिक समर्थन, सोयी आणि कायदेशीर अधिकारांबद्दल माहिती.",
        rightsTitle: "अपंगांचे अधिकार",
        rightsSubtitle:
            "विविध परिस्थितींमध्ये अपंगांसाठी कायदेशीर संरक्षण आणि अधिकार समजून घेणे.",
        accessibilityTitle: "प्रवेशयोग्यता मानके",
        accessibilitySubtitle:
            "प्रवेशयोग्य वातावरण, उत्पादने आणि सेवा तयार करण्यासाठी महत्त्वपूर्ण फ्रेमवर्क आणि मार्गदर्शक तत्त्वे.",

        // Language toggle
        languageToggle: "Language: English",

        // Disability types (and other translations follow...)
        physicalTitle: "शारीरिक अपंगत्व",
        physicalDesc:
            "शारीरिक अपंगत्व मोटर फंक्शन आणि हालचालींवर परिणाम करते, ज्यामध्ये सेरेब्रल पाल्सी, स्पायनल कॉर्ड इंजरी, अँप्युटेशन आणि मस्क्युलर डिस्ट्रॉफी यांसारख्या परिस्थिती असतात.",
        sensoryTitle: "संवेदी अपंगत्व",
        sensoryDesc:
            "संवेदी अपंगत्व एक किंवा अधिक इंद्रियांवर परिणाम करते, ज्यामध्ये दृष्टी हानी, श्रवणदोष आणि स्पर्श, चव आणि वास यांना प्रभावित करणाऱ्या परिस्थिती समाविष्ट आहेत.",
        intellectualTitle: "बौद्धिक अपंगत्व",
        intellectualDesc:
            "बौद्धिक अपंगत्वामध्ये बौद्धिक कार्यात आणि अनुकूल वर्तनात मर्यादा असतात, ज्यामुळे शिकणे, कारण शोधणे, समस्या सोडवणे आणि सामाजिक कौशल्य यावर परिणाम होतो.",
        psychiatricTitle: "मानसिक अपंगत्व",
        psychiatricDesc:
            "मानसिक अपंगत्वामध्ये नैराश्य, चिंता, द्विध्रुवी विकार आणि स्किझोफ्रेनिया यांसारख्या मानसिक आरोग्य परिस्थिती समाविष्ट आहेत ज्या दैनंदिन कार्यावर लक्षणीय परिणाम करतात.",

        specialEdTitle: "विशेष शिक्षण",
        specialEdDesc:
            "विशेष शिक्षण प्रणालींबद्दल माहिती, ज्यामध्ये IEPs, कलम 504 योजना आणि अपंगत्व असलेल्या विद्यार्थ्यांना समर्थन देण्यासाठी डिझाइन केलेल्या समावेश पद्धती समाविष्ट आहेत.",
        earlyIntTitle: "लवकर हस्तक्षेप",
        earlyIntDesc:
            "विकासात्मक उशीर किंवा अपंगत्व असलेल्या जन्मापासून तीन वर्षांपर्यंतच्या मुलांसाठी विकासात्मक परिणाम सुधारण्यासाठी लवकर हस्तक्षेप सेवांचा तपशील.",
        assistiveTechTitle: "सहाय्यक शिक्षण तंत्रज्ञान",
        assistiveTechDesc:
            "शिक्षणात वापरल्या जाणाऱ्या सहाय्यक तंत्रज्ञानाचा आढावा, ज्यामध्ये स्क्रीन रीडर्स, स्पीच-टू-टेक्स्ट सॉफ्टवेअर आणि पर्यायी इनपुट डिव्हाइसेस समाविष्ट आहेत.",
        accessCurrTitle: "प्रवेशयोग्य अभ्यासक्रम",
        accessCurrDesc:
            "यूनिव्हर्सल डिझाइन फॉर लर्निंग (UDL) तत्त्वे आणि विविध शिक्षण गरजांसाठी प्रवेशयोग्य शैक्षणिक सामग्री तयार करण्याबद्दल माहिती.",

        adaTitle: "अमेरिकन्स विथ डिसॅबिलिटी अँक्ट",
        adaDesc:
            "ADA बद्दल महत्त्वपूर्ण माहिती, जो सार्वजनिक जीवनाच्या सर्व क्षेत्रांमध्ये अपंगांविरुद्ध भेदभावास प्रतिबंधित करतो.",
        employmentTitle: "रोजगार अधिकार",
        employmentDesc:
            "वाजवी सोयी, गैर-भेदभाव आवश्यकता आणि कर्मचारी आणि नियोक्त्यांसाठी संसाधनांबद्दल माहिती.",
        housingTitle: "गृहनिर्माण प्रवेशयोग्यता",
        housingDesc:
            "अपंगांसाठी प्रवेशयोग्यता आवश्यकता आणि वाजवी बदलांशी संबंधित फेअर हाऊसिंग अँक्ट तरतुदींचा आढावा.",
        publicAccomTitle: "सार्वजनिक सोयी",
        publicAccomDesc:
            "समान प्रवेश आणि सहभाग सुनिश्चित करण्यासाठी सार्वजनिक जागा, व्यवसाय आणि वाहतूक प्रणालींमध्ये प्रवेशयोग्यतेसाठी आवश्यकता.",

        webAccessTitle: "वेब प्रवेशयोग्यता",
        webAccessDesc:
            "WCAG मानकांबद्दल माहिती, प्रवेशयोग्य डिजिटल सामग्री तयार करणे आणि प्रवेशयोग्यता अनुपालनासाठी वेबसाइट्सचे मूल्यांकन करणे.",
        universalDesignTitle: "सार्वत्रिक डिझाइन",
        universalDesignDesc:
            "सार्वत्रिक डिझाइनची तत्त्वे जी अनुकूलन किंवा विशेष डिझाइनची आवश्यकता न करता सर्व लोकांसाठी वापरण्यायोग्य वातावरण तयार करतात.",
        assistiveTechStdTitle: "सहाय्यक तंत्रज्ञान",
        assistiveTechStdDesc:
            "अशी साधने आणि उपकरणांचा आढावा जी अपंगांना कृती, कार्ये आणि क्रियाकलाप करण्यास मदत करतात जे अन्यथा कठीण असू शकतात.",
        disabilityStatsTitle: "अपंगत्व आकडेवारी",
        disabilityStatsDesc:
            "अपंगत्व प्रसार, रोजगार दर, शिक्षण प्रवेश आणि अपंगत्व समस्या समजून घेण्यासाठी इतर महत्त्वपूर्ण मेट्रिक्सबद्दल प्रमुख डेटा.",

        // Footer
        footerText: "सर्वांसाठी प्रवेशयोग्यता आणि समावेशाचा प्रचार",
        navigation: "नेव्हिगेशन",
        resources: "संसाधने",
        contact: "आमच्याशी संपर्क साधा",
        newsletter: "अपडेट्ससाठी साइन अप करा",
        subscribeButton: "सबस्क्राइब करा",
        emailPlaceholder: "आपला ईमेल प्रविष्ट करा",
    },
    hindi: {
        // Hero section
        heroTitle: "विकलांगता को समझना",
        heroSubtitle:
            "विकलांगता के प्रकार, अधिकार, पहुंच मानकों और प्रमुख आंकड़ों के बारे में व्यापक जानकारी।",
        exploreButton: "विकलांगता के प्रकार देखें",
        learnButton: "अधिकारों के बारे में जानें",

        // Section titles
        disabilityTypesTitle: "विकलांगता के प्रकार",
        disabilityTypesSubtitle:
            "विभिन्न विकलांगताओं को समझना अधिक समावेशी वातावरण और उचित समायोजन बनाने में मदद करता है।",
        educationTitle: "शिक्षा और विकलांगता",
        educationSubtitle:
            "विकलांग छात्रों के लिए शैक्षिक सहायता, समायोजन और कानूनी अधिकारों के बारे में जानकारी।",
        rightsTitle: "विकलांगता अधिकार",
        rightsSubtitle:
            "विभिन्न परिस्थितियों में विकलांग लोगों के लिए कानूनी सुरक्षा और अधिकारों को समझना।",
        accessibilityTitle: "पहुंच मानक",
        accessibilitySubtitle:
            "सुलभ वातावरण, उत्पाद और सेवाएं बनाने के लिए प्रमुख ढांचे और दिशानिर्देश।",

        // Language toggle
        languageToggle: "Language: English",

        // Disability types
        physicalTitle: "शारीरिक विकलांगता",
        physicalDesc:
            "शारीरिक विकलांगता मोटर फंक्शन और गतिशीलता को प्रभावित करती है, जिसमें सेरेब्रल पाल्सी, रीढ़ की हड्डी की चोटें, अंग-विच्छेदन और मांसपेशी डिस्ट्रॉफी जैसी स्थितियां शामिल हैं।",
        sensoryTitle: "संवेदी विकलांगता",
        sensoryDesc:
            "संवेदी विकलांगता एक या अधिक इंद्रियों को प्रभावित करती है, जिसमें दृष्टि हानि, श्रवण हानि और स्पर्श, स्वाद और गंध को प्रभावित करने वाली स्थितियां शामिल हैं।",
        intellectualTitle: "बौद्धिक विकलांगता",
        intellectualDesc:
            "बौद्धिक विकलांगता में बौद्धिक कार्य और अनुकूली व्यवहार में सीमाएं शामिल हैं, जो सीखने, तर्क, समस्या-समाधान और सामाजिक कौशल को प्रभावित करती हैं।",
        psychiatricTitle: "मनोचिकित्सा विकलांगता",
        psychiatricDesc:
            "मनोचिकित्सा विकलांगता में अवसाद, चिंता, द्विध्रुवी विकार और सिज़ोफ्रेनिया जैसी मानसिक स्वास्थ्य स्थितियां शामिल हैं जो दैनिक कामकाज को महत्वपूर्ण रूप से प्रभावित करती हैं।",

        // Education resources
        specialEdTitle: "विशेष शिक्षा",
        specialEdDesc:
            "विशेष शिक्षा प्रणालियों के बारे में जानकारी, जिसमें IEPs, धारा 504 योजनाएं और विकलांग छात्रों का समर्थन करने के लिए डिज़ाइन की गई समावेशन प्रथाएं शामिल हैं।",
        earlyIntTitle: "प्रारंभिक हस्तक्षेप",
        earlyIntDesc:
            "विकासात्मक देरी या विकलांगता वाले जन्म से तीन साल तक के बच्चों के लिए विकासात्मक परिणामों को बेहतर बनाने के लिए प्रारंभिक हस्तक्षेप सेवाओं का विवरण।",
        assistiveTechTitle: "सहायक शिक्षण प्रौद्योगिकी",
        assistiveTechDesc:
            "शिक्षा में उपयोग की जाने वाली सहायक प्रौद्योगिकियों का अवलोकन, जिसमें स्क्रीन रीडर, स्पीच-टू-टेक्स्ट सॉफ्टवेयर और वैकल्पिक इनपुट उपकरण शामिल हैं।",
        accessCurrTitle: "सुलभ पाठ्यक्रम",
        accessCurrDesc:
            "यूनिवर्सल डिज़ाइन फॉर लर्निंग (UDL) सिद्धांतों और विविध सीखने की जरूरतों के लिए सुलभ शैक्षिक सामग्री बनाने के बारे में जानकारी।",

        // Rights information
        adaTitle: "अमेरिकन्स विद डिसेबिलिटीज एक्ट",
        adaDesc:
            "ADA के बारे में प्रमुख जानकारी, जो सार्वजनिक जीवन के सभी क्षेत्रों में विकलांग व्यक्तियों के खिलाफ भेदभाव को प्रतिबंधित करता है।",
        employmentTitle: "रोजगार अधिकार",
        employmentDesc:
            "उचित समायोजन, गैर-भेदभावपूर्ण आवश्यकताओं और कर्मचारियों और नियोक्ताओं के लिए संसाधनों के बारे में जानकारी।",
        housingTitle: "आवास पहुंच",
        housingDesc:
            "विकलांग लोगों के लिए पहुंच आवश्यकताओं और उचित संशोधनों से संबंधित फेयर हाउसिंग एक्ट के प्रावधानों का अवलोकन।",
        publicAccomTitle: "सार्वजनिक सुविधाएं",
        publicAccomDesc:
            "समान पहुंच और भागीदारी सुनिश्चित करने के लिए सार्वजनिक स्थानों, व्यवसायों और परिवहन प्रणालियों में पहुंच के लिए आवश्यकताएं।",

        // Accessibility standards
        webAccessTitle: "वेब पहुंच",
        webAccessDesc:
            "WCAG मानकों, सुलभ डिजिटल सामग्री बनाने और पहुंच अनुपालन के लिए वेबसाइटों का मूल्यांकन करने के बारे में जानकारी।",
        universalDesignTitle: "यूनिवर्सल डिज़ाइन",
        universalDesignDesc:
            "यूनिवर्सल डिज़ाइन के सिद्धांत जो अनुकूलन या विशेष डिज़ाइन की आवश्यकता के बिना सभी लोगों द्वारा उपयोग किए जाने वाले वातावरण बनाते हैं।",
        assistiveTechStdTitle: "सहायक प्रौद्योगिकी",
        assistiveTechStdDesc:
            "ऐसे उपकरणों और उपकरणों का अवलोकन जो विकलांग लोगों को क्रियाएं, कार्य और गतिविधियां करने में मदद करते हैं जो अन्यथा मुश्किल हो सकती हैं।",
        disabilityStatsTitle: "विकलांगता आंकड़े",
        disabilityStatsDesc:
            "विकलांगता प्रसार, रोजगार दर, शिक्षा पहुंच और विकलांगता के मुद्दों को समझने के लिए अन्य महत्वपूर्ण मेट्रिक्स के बारे में प्रमुख डेटा।",

        // Footer
        footerText: "सभी के लिए पहुंच और समावेश को बढ़ावा देना",
        navigation: "नेविगेशन",
        resources: "संसाधन",
        contact: "हमसे संपर्क करें",
        newsletter: "अपडेट के लिए साइन अप करें",
        subscribeButton: "सदस्यता लें",
        emailPlaceholder: "अपना ईमेल दर्ज करें",
    },
};

// Modern card component with enhanced animations
const AnimatedCard = ({ section, index, variant = "default" }) => {
    const Icon = section.icon;
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.92,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: index * 0.12,
            },
        },
        hover: {
            scale: 1.04,
            y: -8,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -15 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                delay: index * 0.12 + 0.15,
                damping: 12,
            },
        },
        hover: {
            scale: 1.15,
            y: -5,
            transition: { duration: 0.35 },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.12 + 0.3,
                duration: 0.8,
            },
        },
    };

    // Different card styles based on variant
    const cardStyles = {
        default: `${section.color} p-6 rounded-xl overflow-hidden relative`,
        alternate: `bg-white border-2 ${section.borderColor} p-6 rounded-xl overflow-hidden relative`,
        featured: `${section.color} p-6 rounded-xl overflow-hidden relative border-2 border-white shadow-lg`
    };

    return (
        <motion.div
            ref={ref}
            className={cardStyles[variant]}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            variants={cardVariants}
        >
            <div className="relative z-10">
                <motion.div
                    className={`inline-flex items-center justify-center p-3 mb-4 rounded-full ${variant === 'alternate' ? section.iconBg : 'bg-white/30'}`}
                    variants={iconVariants}
                >
                    <Icon className={`h-8 w-8 ${section.iconColor}`} />
                </motion.div>

                <motion.div variants={textVariants}>
                    <h3 className={`text-xl font-bold mb-3 ${variant === 'alternate' ? section.textColor : 'text-black'}`}>
                        {section.title}
                    </h3>
                    <p className={`${variant === 'alternate' ? 'text-gray-600' : 'text-black'} text-base`}>
                        {section.description}
                    </p>

                    {section.link && (
                        <div className="mt-6">
                            <motion.a
                                href={section.link}
                                className={`inline-flex items-center ${variant === 'alternate' ? 'text-blue-600' : 'text-white'} font-medium`}
                                whileHover={{ x: 5 }}
                            >
                                Learn more <ArrowRight className="ml-2 h-4 w-4" />
                            </motion.a>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Abstract background pattern */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-white/30 -bottom-10 -right-10 absolute"></div>
                <div className="w-24 h-24 rounded-full bg-white/20 bottom-10 -right-6 absolute"></div>
            </div>
        </motion.div>
    );
};

// Section component with animated title
const SectionHeading = ({ title, subtitle, className = "" }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-center max-w-3xl mx-auto px-4 ${className}`}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
        </motion.div>
    );
};

// Main application component
export default function DisabilityInformationApp() {
    const [language, setLanguage] = useState("english");
    const [isNavOpen, setIsNavOpen] = useState(false);
    const t = translations[language];

    // Scroll-linked animations
    const { scrollYProgress } = useScroll();
    const smoothScrollY = useSpring(scrollYProgress, {
        damping: 20,
        stiffness: 100
    });

    const headerScale = useTransform(smoothScrollY, [0, 0.1], [1, 0.95]);
    const headerOpacity = useTransform(smoothScrollY, [0, 0.1], [1, 0.8]);

    // Toggle language
    const toggleLanguage = () => {
        if (language === "english") {
            setLanguage("hindi");
        } else if (language === "hindi") {
            setLanguage("marathi");
        } else {
            setLanguage("english");
        }
    };

    // Define sections with icons and colors
    const disabilityTypes = [
        {
            title: t.physicalTitle,
            description: t.physicalDesc,
            icon: Activity,
            color: "bg-blue-600",
            borderColor: "border-blue-600",
            iconColor: "text-blue-600",
            textColor: "text-blue-600",
            iconBg: "bg-blue-100",
            link: "#physical"
        },
        {
            title: t.sensoryTitle,
            description: t.sensoryDesc,
            icon: Eye,
            color: "bg-purple-600",
            borderColor: "border-purple-600",
            iconColor: "text-purple-600",
            textColor: "text-purple-600",
            iconBg: "bg-purple-100",
            link: "#sensory"
        },
        {
            title: t.intellectualTitle,
            description: t.intellectualDesc,
            icon: Brain,
            color: "bg-green-600",
            borderColor: "border-green-600",
            iconColor: "text-green-600",
            textColor: "text-green-600",
            iconBg: "bg-green-100",
            link: "#intellectual"
        },
        {
            title: t.psychiatricTitle,
            description: t.psychiatricDesc,
            icon: Heart,
            color: "bg-red-600",
            borderColor: "border-red-600",
            iconColor: "text-red-600",
            textColor: "text-red-600",
            iconBg: "bg-red-100",
            link: "#psychiatric"
        }
    ];

    const educationResources = [
        {
            title: t.specialEdTitle,
            description: t.specialEdDesc,
            icon: GraduationCap,
            color: "bg-cyan-600",
            borderColor: "border-cyan-600",
            iconColor: "text-cyan-600",
            textColor: "text-cyan-600",
            iconBg: "bg-cyan-100",
            link: "#specialed"
        },
        {
            title: t.earlyIntTitle,
            description: t.earlyIntDesc,
            icon: Clock,
            color: "bg-amber-600",
            borderColor: "border-amber-600",
            iconColor: "text-amber-600",
            textColor: "text-amber-600",
            iconBg: "bg-amber-100",
            link: "#earlyint"
        },
        {
            title: t.assistiveTechTitle,
            description: t.assistiveTechDesc,
            icon: Laptop,
            color: "bg-emerald-600",
            borderColor: "border-emerald-600",
            iconColor: "text-emerald-600",
            textColor: "text-emerald-600",
            iconBg: "bg-emerald-100",
            link: "#assistivetech"
        },
        {
            title: t.accessCurrTitle,
            description: t.accessCurrDesc,
            icon: BookOpen,
            color: "bg-indigo-600",
            borderColor: "border-indigo-600",
            iconColor: "text-indigo-600",
            textColor: "text-indigo-600",
            iconBg: "bg-indigo-100",
            link: "#curriculum"
        }
    ];

    const rightsInformation = [
        {
            title: t.adaTitle,
            description: t.adaDesc,
            icon: Scale,
            color: "bg-teal-600",
            borderColor: "border-teal-600",
            iconColor: "text-teal-600",
            textColor: "text-teal-600",
            iconBg: "bg-teal-100",
            link: "#ada"
        },
        {
            title: t.employmentTitle,
            description: t.employmentDesc,
            icon: Briefcase,
            color: "bg-pink-600",
            borderColor: "border-pink-600",
            iconColor: "text-pink-600",
            textColor: "text-pink-600",
            iconBg: "bg-pink-100",
            link: "#employment"
        },
        {
            title: t.housingTitle,
            description: t.housingDesc,
            icon: Building,
            color: "bg-orange-600",
            borderColor: "border-orange-600",
            iconColor: "text-orange-600",
            textColor: "text-orange-600",
            iconBg: "bg-orange-100",
            link: "#housing"
        },
        {
            title: t.publicAccomTitle,
            description: t.publicAccomDesc,
            icon: Globe,
            color: "bg-violet-600",
            borderColor: "border-violet-600",
            iconColor: "text-violet-600",
            textColor: "text-violet-600",
            iconBg: "bg-violet-100",
            link: "#public"
        }
    ];

    const accessibilityStandards = [
        {
            title: t.webAccessTitle,
            description: t.webAccessDesc,
            icon: Layout,
            color: "bg-fuchsia-600",
            borderColor: "border-fuchsia-600",
            iconColor: "text-fuchsia-600",
            textColor: "text-fuchsia-600",
            iconBg: "bg-fuchsia-100",
            link: "#webaccess"
        },
        {
            title: t.universalDesignTitle,
            description: t.universalDesignDesc,
            icon: Accessibility,
            color: "bg-sky-600",
            borderColor: "border-sky-600",
            iconColor: "text-sky-600",
            textColor: "text-sky-600",
            iconBg: "bg-sky-100",
            link: "#universaldesign"
        },
        {
            title: t.assistiveTechStdTitle,
            description: t.assistiveTechStdDesc,
            icon: Laptop,
            color: "bg-lime-600",
            borderColor: "border-lime-600",
            iconColor: "text-lime-600",
            textColor: "text-lime-600",
            iconBg: "bg-lime-100",
            link: "#assistivetechstd"
        },
        {
            title: t.disabilityStatsTitle,
            description: t.disabilityStatsDesc,
            icon: BarChart,
            color: "bg-slate-600",
            borderColor: "border-slate-600",
            iconColor: "text-slate-600",
            textColor: "text-slate-600",
            iconBg: "bg-slate-100",
            link: "#stats"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <header className="sticky top-0 z-40 bg-white shadow-sm">
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <a href="#" className="flex items-center">
                        <Accessibility className="h-6 w-6 text-blue-600 mr-2" />
                        <span className="font-bold text-xl text-gray-800">DisabilityInfo</span>
                    </a>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsNavOpen(!isNavOpen)}
                    >
                        {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#disability-types" className="text-gray-600 hover:text-blue-600 font-medium">
                            {t.disabilityTypesTitle}
                        </a>
                        <a href="#education" className="text-gray-600 hover:text-blue-600 font-medium">
                            {t.educationTitle}
                        </a>
                        <a href="#rights" className="text-gray-600 hover:text-blue-600 font-medium">
                            {t.rightsTitle}
                        </a>
                        <a href="#accessibility" className="text-gray-600 hover:text-blue-600 font-medium">
                            {t.accessibilityTitle}
                        </a>
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                            <Languages className="h-5 w-5 mr-1" />
                            {t.languageToggle}
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isNavOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <a
                                    href="#disability-types"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    {t.disabilityTypesTitle}
                                </a>
                                <a
                                    href="#education"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    {t.educationTitle}
                                </a>
                                <a
                                    href="#rights"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    {t.rightsTitle}
                                </a>
                                <a
                                    href="#accessibility"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    {t.accessibilityTitle}
                                </a>
                                <button
                                    onClick={() => {
                                        toggleLanguage();
                                        setIsNavOpen(false);
                                    }}
                                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-100"
                                >
                                    <Languages className="h-5 w-5 mr-2" />
                                    {t.languageToggle}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Hero section */}
            <motion.section
                style={{ scale: headerScale, opacity: headerOpacity }}
                className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-6"
            >
                <div className="container mx-auto max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {t.heroTitle}
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 text-blue-100">
                            {t.heroSubtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a
                                href="#disability-types"
                                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.exploreButton}
                            </motion.a>
                            <motion.a
                                href="#rights"
                                className="px-6 py-3 bg-blue-800 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.learnButton}
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Abstract background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 opacity-20"></div>
                    <div className="absolute top-32 -left-32 w-64 h-64 rounded-full bg-indigo-500 opacity-20"></div>
                    <div className="absolute -bottom-16 right-16 w-48 h-48 rounded-full bg-white opacity-10"></div>
                </div>
            </motion.section>

            {/* Main content */}
            <main className="container mx-auto py-16 px-4">
                {/* Disability Types Section */}
                <section id="disability-types" className="mb-24">
                    <SectionHeading
                        title={t.disabilityTypesTitle}
                        subtitle={t.disabilityTypesSubtitle}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {disabilityTypes.map((type, index) => (
                            <AnimatedCard key={index} section={type} index={index} />
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section id="education" className="mb-24">
                    <SectionHeading
                        title={t.educationTitle}
                        subtitle={t.educationSubtitle}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {educationResources.map((resource, index) => (
                            <AnimatedCard key={index} section={resource} index={index} variant="alternate" />
                        ))}
                    </div>
                </section>

                {/* Rights Section */}
                <section id="rights" className="mb-24">
                    <SectionHeading
                        title={t.rightsTitle}
                        subtitle={t.rightsSubtitle}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rightsInformation.map((right, index) => (
                            <AnimatedCard key={index} section={right} index={index} />
                        ))}
                    </div>
                </section>

                {/* Accessibility Standards Section */}
                <section id="accessibility" className="mb-12">
                    <SectionHeading
                        title={t.accessibilityTitle}
                        subtitle={t.accessibilitySubtitle}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {accessibilityStandards.map((standard, index) => (
                            <AnimatedCard key={index} section={standard} index={index} variant="alternate" />
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <Accessibility className="h-6 w-6 text-blue-400 mr-2" />
                                <span className="font-bold text-xl">DisabilityInfo</span>
                            </div>
                            <p className="text-gray-300">{t.footerText}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">{t.navigation}</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Home</a></li>
                                <li><a href="#disability-types" className="text-gray-300 hover:text-white transition">{t.disabilityTypesTitle}</a></li>
                                <li><a href="#education" className="text-gray-300 hover:text-white transition">{t.educationTitle}</a></li>
                                <li><a href="#rights" className="text-gray-300 hover:text-white transition">{t.rightsTitle}</a></li>
                                <li><a href="#accessibility" className="text-gray-300 hover:text-white transition">{t.accessibilityTitle}</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">{t.resources}</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Research</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Publications</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Community</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition">Support Services</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">{t.contact}</h3>
                            <p className="text-gray-300 mb-4">{t.newsletter}</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder={t.emailPlaceholder}
                                    className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition">
                                    {t.subscribeButton}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">© 2025 DisabilityInfo. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll-to-top button */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: smoothScrollY.get() > 0.1 ? 1 : 0,
                    y: smoothScrollY.get() > 0.1 ? 0 : 10
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronDown className="h-6 w-6 transform rotate-180" />
            </motion.button>
        </div>
    );
}