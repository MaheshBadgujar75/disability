import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
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
    },
};

// Card component with smoother animations
const AnimatedCard = ({ section, index }) => {
    const Icon = section.icon;

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
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                delay: index * 0.12 + 0.15,
                damping: 12,
            },
        },
        hover: {
            scale: 1.15,
            transition: { duration: 0.35 },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className={`${section.color} p-6 rounded-xl text-center shadow-lg transition-all overflow-hidden relative`}
        >
            <motion.div className="flex justify-center mb-4" variants={iconVariants}>
                <Icon className={`h-12 w-12 ${section.iconColor}`} />
            </motion.div>
            <h3 className={`text-xl font-semibold mb-3 ${section.textColor}`}>
                {section.title}
            </h3>
            <p className={`${section.textColor} opacity-80`}>{section.description}</p>

            <motion.div
                className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-10 bg-current"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
            />
        </motion.div>
    );
};

// Improved staggered reveal animation for cards
const StaggeredRevealSection = ({
                                    children,
                                    title,
                                    subtitle,
                                    bgClass = "bg-white",
                                }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.15 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: "easeOut" },
        },
    };

    return (
        <div className={`py-16 ${bgClass}`} ref={ref}>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={headerVariants}
                >
                    <h2 className="text-3xl font-bold text-indigo-900">{title}</h2>
                    <p className="text-indigo-700 mt-4 max-w-3xl mx-auto">{subtitle}</p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

const Home = ({ language = "english", setLanguage }) => {
    const t = translations[language];

    // Helper function to create section data based on current language
    const createSectionData = (section) => {
        const data = {
            physical: {
                title: t.physicalTitle,
                description: t.physicalDesc,
                icon: Activity,
                color: "bg-gradient-to-br from-yellow-100 to-yellow-200",
                iconColor: "text-yellow-700",
                textColor: "text-yellow-900",
            },
            sensory: {
                title: t.sensoryTitle,
                description: t.sensoryDesc,
                icon: Eye,
                color: "bg-gradient-to-br from-red-100 to-red-200",
                iconColor: "text-red-700",
                textColor: "text-red-900",
            },
            intellectual: {
                title: t.intellectualTitle,
                description: t.intellectualDesc,
                icon: Brain,
                color: "bg-gradient-to-br from-green-100 to-green-200",
                iconColor: "text-green-700",
                textColor: "text-green-900",
            },
            psychiatric: {
                title: t.psychiatricTitle,
                description: t.psychiatricDesc,
                icon: Heart,
                color: "bg-gradient-to-br from-indigo-100 to-indigo-200",
                iconColor: "text-indigo-700",
                textColor: "text-indigo-900",
            },
            specialEd: {
                title: t.specialEdTitle,
                description: t.specialEdDesc,
                icon: GraduationCap,
                color: "bg-gradient-to-br from-purple-100 to-purple-200",
                iconColor: "text-purple-700",
                textColor: "text-purple-900",
            },
            earlyInt: {
                title: t.earlyIntTitle,
                description: t.earlyIntDesc,
                icon: Clock,
                color: "bg-gradient-to-br from-blue-100 to-blue-200",
                iconColor: "text-blue-700",
                textColor: "text-blue-900",
            },
            assistiveTech: {
                title: t.assistiveTechTitle,
                description: t.assistiveTechDesc,
                icon: Laptop,
                color: "bg-gradient-to-br from-teal-100 to-teal-200",
                iconColor: "text-teal-700",
                textColor: "text-teal-900",
            },
            accessCurr: {
                title: t.accessCurrTitle,
                description: t.accessCurrDesc,
                icon: BookOpen,
                color: "bg-gradient-to-br from-orange-100 to-orange-200",
                iconColor: "text-orange-700",
                textColor: "text-orange-900",
            },
            ada: {
                title: t.adaTitle,
                description: t.adaDesc,
                icon: Scale,
                color: "bg-gradient-to-br from-cyan-100 to-cyan-200",
                iconColor: "text-cyan-700",
                textColor: "text-cyan-900",
            },
            employment: {
                title: t.employmentTitle,
                description: t.employmentDesc,
                icon: Briefcase,
                color: "bg-gradient-to-br from-pink-100 to-pink-200",
                iconColor: "text-pink-700",
                textColor: "text-pink-900",
            },
            housing: {
                title: t.housingTitle,
                description: t.housingDesc,
                icon: HomeIcon,
                color: "bg-gradient-to-br from-emerald-100 to-emerald-200",
                iconColor: "text-emerald-700",
                textColor: "text-emerald-900",
            },
            publicAccom: {
                title: t.publicAccomTitle,
                description: t.publicAccomDesc,
                icon: Building,
                color: "bg-gradient-to-br from-amber-100 to-amber-200",
                iconColor: "text-amber-700",
                textColor: "text-amber-900",
            },
            webAccess: {
                title: t.webAccessTitle,
                description: t.webAccessDesc,
                icon: Globe,
                color: "bg-gradient-to-br from-blue-100 to-blue-200",
                iconColor: "text-blue-700",
                textColor: "text-blue-900",
            },
            universalDesign: {
                title: t.universalDesignTitle,
                description: t.universalDesignDesc,
                icon: Layout,
                color: "bg-gradient-to-br from-violet-100 to-violet-200",
                iconColor: "text-violet-700",
                textColor: "text-violet-900",
            },
            assistiveTechStd: {
                title: t.assistiveTechStdTitle,
                description: t.assistiveTechStdDesc,
                icon: Accessibility,
                color: "bg-gradient-to-br from-rose-100 to-rose-200",
                iconColor: "text-rose-700",
                textColor: "text-rose-900",
            },
            disabilityStats: {
                title: t.disabilityStatsTitle,
                description: t.disabilityStatsDesc,
                icon: BarChart,
                color: "bg-gradient-to-br from-lime-100 to-lime-200",
                iconColor: "text-lime-700",
                textColor: "text-lime-900",
            },
        };

        return section.map((key) => data[key]);
    };

    // Section data definitions
    const disabilityTypes = createSectionData([
        "physical",
        "sensory",
        "intellectual",
        "psychiatric",
    ]);
    const educationResources = createSectionData([
        "specialEd",
        "earlyInt",
        "assistiveTech",
        "accessCurr",
    ]);
    const rightsInformation = createSectionData([
        "ada",
        "employment",
        "housing",
        "publicAccom",
    ]);
    const accessibilityStandards = createSectionData([
        "webAccess",
        "universalDesign",
        "assistiveTechStd",
        "disabilityStats",
    ]);

    // Hero section animation
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 30 });
    const smoothHeroOpacity = useSpring(heroOpacity, {
        stiffness: 50,
        damping: 30,
    });

    const toggleLanguage = () => {
        setLanguage(language === "english" ? "marathi" : "english");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
            {/* Hero Section */}
            <div className="h-screen relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 bg-cover bg-center top-10"
                    style={{
                        y: smoothHeroY,
                        backgroundImage: "url(/HomeSection.jpg)",
                    }}
                />

                <motion.div
                    className="relative h-full flex items-center z-10"
                    style={{ opacity: smoothHeroOpacity }}
                >
                    <div className="max-w-7xl mx-auto px-4 text-center text-black">
                        <motion.h1
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                type: "spring",
                                stiffness: 40,
                                damping: 15,
                            }}
                            className="text-5xl md:text-6xl font-bold mb-6"
                        >
                            {t.heroTitle}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                        >
                            {t.heroSubtitle}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                delay: 0.6,
                                type: "spring",
                                stiffness: 40,
                                damping: 15,
                            }}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="px-8 py-3 bg-white text-black font-medium rounded-lg shadow-lg hover:bg-indigo-50 transition-all"
                            >
                                {t.exploreButton}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
                            >
                                {t.learnButton}
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Disability Types Section */}
            <StaggeredRevealSection
                title={t.disabilityTypesTitle}
                subtitle={t.disabilityTypesSubtitle}
                bgClass="bg-white"
            >
                {disabilityTypes.map((type, index) => (
                    <AnimatedCard key={index} section={type} index={index} />
                ))}
            </StaggeredRevealSection>

            {/* Education Resources Section */}
            <StaggeredRevealSection
                title={t.educationTitle}
                subtitle={t.educationSubtitle}
                bgClass="bg-indigo-50"
            >
                {educationResources.map((resource, index) => (
                    <AnimatedCard key={index} section={resource} index={index} />
                ))}
            </StaggeredRevealSection>

            {/* Rights Information Section */}
            <StaggeredRevealSection
                title={t.rightsTitle}
                subtitle={t.rightsSubtitle}
                bgClass="bg-white"
            >
                {rightsInformation.map((right, index) => (
                    <AnimatedCard key={index} section={right} index={index} />
                ))}
            </StaggeredRevealSection>

            {/* Accessibility Standards Section */}
            <StaggeredRevealSection
                title={t.accessibilityTitle}
                subtitle={t.accessibilitySubtitle}
                bgClass="bg-indigo-50"
            >
                {accessibilityStandards.map((standard, index) => (
                    <AnimatedCard key={index} section={standard} index={index} />
                ))}
            </StaggeredRevealSection>
        </div>
    );
};

export default Home;
