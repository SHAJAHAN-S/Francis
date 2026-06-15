import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCheck, FiArrowRight, FiAward, FiBookOpen, FiTrendingUp, FiBriefcase } from 'react-icons/fi';

type LevelKey = 'primary' | 'middle' | 'high' | 'hrsec';

interface LevelDetail {
  name: string;
  classes: string;
  age: string;
  icon: React.ReactNode;
  themeColor: string;
  highlights: string[];
}

const levelData: Record<LevelKey, LevelDetail> = {
  primary: {
    name: 'Primary',
    classes: 'Classes I to V',
    age: 'Age 5+ as of June 1st',
    icon: <FiAward size={18} />,
    themeColor: 'text-blue-500 bg-blue-50 border-blue-200',
    highlights: [
      'Activity-based foundation learning model',
      'Phonics-based English speech & reading fluency',
      'Mental math exercises & puzzle-solving skills',
      'Regular creative arts, music & play activities'
    ]
  },
  middle: {
    name: 'Middle',
    classes: 'Classes VI to VIII',
    age: 'Age 10+ with transfer certificate',
    icon: <FiBookOpen size={18} />,
    themeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    highlights: [
      'Introductory science lab and practical exposure',
      'Project-oriented tasks & problem solving',
      'Inter-house debate, literary & quiz programs',
      'Language learning & computer education basics'
    ]
  },
  high: {
    name: 'High School',
    classes: 'Classes IX & X',
    age: 'Age 13+ with entrance assessment',
    icon: <FiTrendingUp size={18} />,
    themeColor: 'text-purple-600 bg-purple-50 border-purple-200',
    highlights: [
      'Rigorous preparation for board examination',
      'Weekly assessments & chapter review tests',
      'Specialized subject teachers & STEM workshops',
      'Career guidance & emotional counseling'
    ]
  },
  hrsec: {
    name: 'Higher Sec.',
    classes: 'Classes XI & XII',
    age: 'Age 15+ based on board marks',
    icon: <FiBriefcase size={18} />,
    themeColor: 'text-amber-600 bg-amber-50 border-amber-200',
    highlights: [
      'Choice of Science and Commerce streams',
      'Foundation coaching for NEET / JEE entrance',
      'Advanced physics, chemistry & computer labs',
      'Comprehensive university admission guidance'
    ]
  }
};

export default function AdmissionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LevelKey>('primary');
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isSessionClosed = sessionStorage.getItem('admission_popup_closed');
    const dismissedUntil = localStorage.getItem('admission_popup_dismissed_until');
    const isDismissed = dismissedUntil && Date.now() < parseInt(dismissedUntil, 10);

    if (!isSessionClosed && !isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('admission_popup_closed', 'true');
    if (dontShowAgain) {
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('admission_popup_dismissed_until', expirationTime.toString());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowAgain]);

  const handleNavigate = (path: string) => {
    handleClose();
    navigate(path);
  };

  const currentLevel = levelData[activeTab];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with strong blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-md cursor-pointer"
          />

          {/* Floating animated ambient circles in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div 
              animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/3 w-72 h-72 bg-secondary/15 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl" 
            />
          </div>

          {/* Asymmetric 3D Overlapping Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-stretch gap-0 md:gap-4 my-auto select-none"
          >
            {/* Glowing outer shadow ring (Desktop only) */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-secondary/40 via-amber-500/20 to-primary/40 opacity-70 blur-xl pointer-events-none hidden md:block" />

            {/* Left Bookmark Card - Floating overlap (Desktop only) */}
            <div className="relative md:w-80 flex-shrink-0 bg-primary-dark rounded-3xl overflow-hidden shadow-2xl border border-secondary/30 hidden md:flex flex-col justify-between p-8 text-white z-20 md:-translate-x-2 md:translate-y-0 translate-y-4 scale-100 md:scale-[1.03] transition-all">
              {/* background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                style={{ backgroundImage: "url('/st.francis-image.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-secondary/35 pointer-events-none" />
              
              {/* crest logo */}
              <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-2xl mb-5 flex items-center justify-center border border-secondary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img src="/logo.png" alt="St. Francis Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-display font-bold text-2xl tracking-wide text-secondary mb-1">ST. FRANCIS</h3>
                <p className="font-label text-xs uppercase tracking-widest text-white/70">Mat. Hr. Sec. School</p>
                <div className="w-12 h-0.5 bg-secondary my-5 rounded-full" />
                <p className="text-sm text-white/80 font-body leading-relaxed max-w-[200px] italic">
                  "Nurturing character, wisdom, and leadership since 1994."
                </p>
              </div>
              
              <div className="relative z-10 text-center text-[10px] text-white/50 font-label tracking-widest uppercase">
                Assisi Nagar, Saram
              </div>
            </div>

            {/* Right Card - Interactive Dashboard Panel */}
            <div className="flex-1 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-between border border-gray-100 z-10 relative overflow-hidden">
              
              {/* Mobile Header (replaces left card on small screens) */}
              <div className="flex items-center gap-3 mb-5 md:hidden border-b border-gray-100 pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl p-1.5 flex items-center justify-center flex-shrink-0">
                  <img src="/logo.png" alt="St. Francis Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-primary leading-tight">St. Francis School</h3>
                  <p className="text-gray-mid text-xs font-label uppercase tracking-wider">Saram, Tindivanam</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100/80 transition-all focus:outline-none focus:ring-2 focus:ring-secondary/40 z-30"
                aria-label="Close dialog"
              >
                <FiX size={20} />
              </button>

              <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 bg-secondary/15 border border-secondary/20 rounded-full px-3 py-1">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-secondary font-label text-[10px] sm:text-xs font-bold uppercase tracking-wider">Admissions Open 2026-27</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-label text-success font-semibold">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-ping" />
                    <span>Live Intake</span>
                  </div>
                </div>

                {/* Title */}
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-display font-bold text-primary mb-5 leading-tight">
                  Discover Our Curriculum
                </h2>

                {/* Innovative Curriculum Explorer Tabs */}
                <div className="flex bg-gray-50 p-1 rounded-xl gap-1 mb-6 border border-gray-100 overflow-x-auto scrollbar-none" role="tablist">
                  {(Object.keys(levelData) as LevelKey[]).map((tabKey) => {
                    const level = levelData[tabKey];
                    const isSelected = activeTab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveTab(tabKey)}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-label font-bold transition-all whitespace-nowrap outline-none ${
                          isSelected 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-gray-mid hover:text-primary hover:bg-gray-100/50'
                        }`}
                      >
                        {level.icon}
                        <span>{level.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explorer Display Card with dynamic height transition */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100/80 mb-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-base font-display font-bold text-primary-dark">
                        {currentLevel.classes}
                      </h4>
                      <p className="text-xs text-gray-mid font-body mt-0.5">Academic Intake Stream</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full border text-[11px] font-label font-semibold self-start sm:self-center ${currentLevel.themeColor}`}>
                      {currentLevel.age}
                    </div>
                  </div>

                  {/* Staggered features list */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLevel.highlights.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-2 text-xs text-gray-dark font-body"
                      >
                        <span className="w-4.5 h-4.5 rounded-full bg-success/10 text-success flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheck size={11} />
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-gray-100 pt-5 mt-auto relative z-10">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
                  <button
                    onClick={() => handleNavigate('/admissions')}
                    className="btn bg-secondary text-white hover:bg-secondary-light shadow-lg hover:shadow-xl text-sm px-6 py-3.5 flex items-center justify-center gap-2 group transition-all duration-300"
                  >
                    <span>Apply Online Today</span>
                    <FiArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => handleNavigate('/admissions#inquiry')}
                    className="btn border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary/5 text-sm px-6 py-3.5 flex items-center justify-center transition-all duration-300"
                  >
                    Submit Admission Enquiry
                  </button>
                </div>

                {/* Sub controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-mid font-body">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none hover:text-gray-dark transition-colors">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-secondary/40 focus:ring-offset-0 focus:ring-2 w-4 h-4 cursor-pointer transition-all"
                    />
                    <span>Don't show this popup again today</span>
                  </label>
                  <button 
                    onClick={handleClose} 
                    className="hover:text-primary hover:underline font-bold transition-all text-left sm:text-right"
                  >
                    Explore School Website &rarr;
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
