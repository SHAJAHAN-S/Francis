import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.academics': 'Academics',
    'nav.admissions': 'Admissions',
    'nav.faculty': 'Faculty',
    'nav.gallery': 'Gallery',
    'nav.news': 'News',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.alumni': 'Alumni',
    'nav.blog': 'Blog',
    'nav.parentLogin': 'Parent Login',
    // Hero
    'hero.badge': 'Affiliated to Tamil Nadu State Board',
    'hero.title1': 'Nurturing',
    'hero.title2': 'Excellence',
    'hero.title3': 'Since 1994',
    'hero.subtitle': 'St. Francis Matriculation Higher Secondary School, Saram, Tindivanam — Where tradition meets modern education, shaping tomorrow\'s leaders with values, knowledge, and character.',
    'hero.cta1': 'Apply for Admission',
    'hero.cta2': 'Explore Our School',
    'hero.prospectus': 'Download Prospectus',
    // Stats
    'stats.heading': 'Our Achievements in Numbers',
    'stats.years': 'Years of Excellence',
    'stats.students': 'Students Enrolled',
    'stats.faculty': 'Qualified Faculty',
    'stats.passRate': '10th Board Pass %',
    'stats.clubs': 'Extracurricular Clubs',
    // Common
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.submit': 'Submit',
    'common.send': 'Send',
    'common.download': 'Download',
    'common.applyNow': 'Apply Now',
    'common.contactUs': 'Contact Us',
    'common.learnMore': 'Learn More',
    'common.required': 'Required',
    // Home
    'home.quickLinks': 'Quick Links & Resources',
    'home.quickLinksDesc': 'Access important documents and resources quickly',
    'home.ctaTitle': 'Begin Your Child\'s Journey with Us',
    'home.ctaDesc': 'Admissions are open for the academic year 2025-2026. Join our family of 1200+ happy students.',
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.contactUs': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.sitemap': 'Sitemap',
    // About
    'about.heading': 'About Our School',
    'about.subtitle': 'Three decades of nurturing excellence in education, faith, and character.',
    // Admissions
    'admissions.heading': 'Admissions',
    'admissions.open': 'ADMISSIONS OPEN 2025-26',
    'admissions.subtitle': 'Join our family — begin your child\'s journey of excellence.',
    'admissions.process': 'Admission Process',
    'admissions.docs': 'Documents Required',
    'admissions.eligibility': 'Eligibility',
    'admissions.fees': 'Fee Structure',
    'admissions.inquiry': 'Online Inquiry Form',
    'admissions.faq': 'Frequently Asked Questions',
    // Contact
    'contact.heading': 'Contact Us',
    'contact.subtitle': 'We\'d love to hear from you. Reach out anytime.',
    'contact.sendMessage': 'Send us a Message',
    'contact.connect': 'Connect With Us',
    // Testimonials
    'testimonials.heading': 'What Parents & Alumni Say',
    // Features
    'features.heading': 'Why Choose St. Francis?',
    'features.subtitle': 'A holistic educational environment designed for every child\'s success',
    // Gallery
    'gallery.heading': 'Photo Gallery',
    'gallery.subtitle': 'Capturing moments of learning, joy, and achievement.',
    // Faculty
    'faculty.heading': 'Our Faculty',
    'faculty.subtitle': 'Dedicated educators shaping the future of our students.',
    // Events
    'events.heading': 'Events',
    'events.subtitle': 'Stay updated with school events and activities.',
    // News
    'news.heading': 'News & Updates',
    'news.subtitle': 'Stay informed about the latest from St. Francis.',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.academics': 'கல்வி',
    'nav.admissions': 'சேர்க்கை',
    'nav.faculty': 'ஆசிரியர்கள்',
    'nav.gallery': 'புகைப்படத் தொகுப்பு',
    'nav.news': 'செய்திகள்',
    'nav.events': 'நிகழ்வுகள்',
    'nav.contact': 'தொடர்பு',
    'nav.alumni': 'முன்னாள் மாணவர்',
    'nav.blog': 'வலைப்பதிவு',
    'nav.parentLogin': 'பெற்றோர் உள்நுழைவு',
    // Hero
    'hero.badge': 'தமிழ்நாடு மாநில வாரியத்துடன் இணைக்கப்பட்டது',
    'hero.title1': 'சிறப்பை',
    'hero.title2': 'வளர்த்தல்',
    'hero.title3': '1994 முதல்',
    'hero.subtitle': 'புனித பிரான்சிஸ் மெட்ரிக் மேல்நிலைப் பள்ளி, சாரம், திண்டிவனம் — பாரம்பரியமும் நவீன கல்வியும் இணையும் இடம், மதிப்புகள், அறிவு மற்றும் குணநலன் கொண்ட எதிர்கால தலைவர்களை உருவாக்குகிறது.',
    'hero.cta1': 'சேர்க்கைக்கு விண்ணப்பிக்கவும்',
    'hero.cta2': 'எங்கள் பள்ளியை ஆராயுங்கள்',
    'hero.prospectus': 'விவரக் குறிப்பு பதிவிறக்கம்',
    // Stats
    'stats.heading': 'எண்களில் எங்கள் சாதனைகள்',
    'stats.years': 'சிறப்பின் ஆண்டுகள்',
    'stats.students': 'மாணவர்கள் சேர்ந்துள்ளனர்',
    'stats.faculty': 'தகுதி பெற்ற ஆசிரியர்கள்',
    'stats.passRate': '10ம் வகுப்பு தேர்ச்சி %',
    'stats.clubs': 'கூடுதல் பாடநெறி சங்கங்கள்',
    // Common
    'common.readMore': 'மேலும் படிக்க',
    'common.viewAll': 'அனைத்தையும் காண',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.send': 'அனுப்பு',
    'common.download': 'பதிவிறக்கம்',
    'common.applyNow': 'இப்போது விண்ணப்பிக்கவும்',
    'common.contactUs': 'தொடர்பு கொள்ளுங்கள்',
    'common.learnMore': 'மேலும் அறிக',
    'common.required': 'தேவை',
    // Home
    'home.quickLinks': 'விரைவு இணைப்புகள் & ஆதாரங்கள்',
    'home.quickLinksDesc': 'முக்கியமான ஆவணங்கள் மற்றும் ஆதாரங்களை விரைவாக அணுகவும்',
    'home.ctaTitle': 'உங்கள் குழந்தையின் பயணத்தை எங்களுடன் தொடங்குங்கள்',
    'home.ctaDesc': '2025-2026 கல்வியாண்டுக்கான சேர்க்கைகள் திறந்திருக்கின்றன. 1200+ மகிழ்ச்சியான மாணவர்களின் குடும்பத்தில் இணையுங்கள்.',
    // Footer
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.resources': 'ஆதாரங்கள்',
    'footer.contactUs': 'தொடர்பு கொள்ளுங்கள்',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    'footer.privacy': 'தனியுரிமைக் கொள்கை',
    'footer.sitemap': 'தளவரைபடம்',
    // About
    'about.heading': 'எங்கள் பள்ளியைப் பற்றி',
    'about.subtitle': 'கல்வி, நம்பிக்கை மற்றும் குணநலனில் சிறப்பை வளர்க்கும் மூன்று தசாப்தங்கள்.',
    // Admissions
    'admissions.heading': 'சேர்க்கை',
    'admissions.open': 'சேர்க்கை திறப்பு 2025-26',
    'admissions.subtitle': 'எங்கள் குடும்பத்தில் இணையுங்கள் — உங்கள் குழந்தையின் சிறப்பு பயணத்தைத் தொடங்குங்கள்.',
    'admissions.process': 'சேர்க்கை செயல்முறை',
    'admissions.docs': 'தேவையான ஆவணங்கள்',
    'admissions.eligibility': 'தகுதி',
    'admissions.fees': 'கட்டண அமைப்பு',
    'admissions.inquiry': 'ஆன்லைன் விசாரணை படிவம்',
    'admissions.faq': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    // Contact
    'contact.heading': 'தொடர்பு கொள்ளுங்கள்',
    'contact.subtitle': 'உங்களிடமிருந்து கேட்க விரும்புகிறோம். எப்போது வேண்டுமானாலும் தொடர்பு கொள்ளுங்கள்.',
    'contact.sendMessage': 'எங்களுக்கு ஒரு செய்தி அனுப்புங்கள்',
    'contact.connect': 'எங்களுடன் இணையுங்கள்',
    // Testimonials
    'testimonials.heading': 'பெற்றோர் & முன்னாள் மாணவர்கள் என்ன சொல்கிறார்கள்',
    // Features
    'features.heading': 'ஏன் புனித பிரான்சிஸ் பள்ளியை தேர்வு செய்ய வேண்டும்?',
    'features.subtitle': 'ஒவ்வொரு குழந்தையின் வெற்றிக்காக வடிவமைக்கப்பட்ட முழுமையான கல்விச் சூழல்',
    // Gallery
    'gallery.heading': 'புகைப்படத் தொகுப்பு',
    'gallery.subtitle': 'கற்றல், மகிழ்ச்சி மற்றும் சாதனையின் தருணங்களைப் பதிவு செய்தல்.',
    // Faculty
    'faculty.heading': 'எங்கள் ஆசிரியர்கள்',
    'faculty.subtitle': 'மாணவர்களின் எதிர்காலத்தை வடிவமைக்கும் அர்ப்பணிப்புள்ள கல்வியாளர்கள்.',
    // Events
    'events.heading': 'நிகழ்வுகள்',
    'events.subtitle': 'பள்ளி நிகழ்வுகள் மற்றும் செயல்பாடுகளுடன் புதுப்பித்த நிலையில் இருங்கள்.',
    // News
    'news.heading': 'செய்திகள் & புதுப்பிப்புகள்',
    'news.subtitle': 'புனித பிரான்சிஸ் பள்ளியின் சமீபத்திய செய்திகள்.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('sf_lang') as Language) || 'en';
    }
    return 'en';
  });

  const toggleLanguage = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'ta' : 'en';
      localStorage.setItem('sf_lang', next);
      return next;
    });
  }, []);

  const t = useCallback((key: string): string => {
    return translations[lang][key] || translations['en'][key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
