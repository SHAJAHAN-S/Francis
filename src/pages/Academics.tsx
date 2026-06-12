import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiBookOpen, FiDownload } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import TimetableDownload from '../components/common/TimetableDownload';
import SyllabusDownload from '../components/common/SyllabusDownload';

const levels = ['Primary (I–V)', 'Middle (VI–VIII)', 'High School (IX–X)', 'Hr. Sec. (XI–XII)'];

const curricula: Record<string, { subjects: string[]; highlights: string[] }> = {
  'Primary (I–V)': {
    subjects: ['Tamil', 'English', 'Mathematics', 'Environmental Science', 'General Knowledge', 'Moral Science', 'Computer Basics', 'Art & Craft', 'Physical Education'],
    highlights: ['Activity-based learning', 'Phonics-based English', 'Mental math drills', 'Story-time & reading circles', 'Annual field trips'],
  },
  'Middle (VI–VIII)': {
    subjects: ['Tamil', 'English', 'Mathematics', 'Science', 'Social Science', 'Hindi (optional)', 'Computer Science', 'Moral Science', 'Physical Education', 'Art Education'],
    highlights: ['Lab-based science teaching', 'Project-based learning', 'Inter-house competitions', 'Leadership programs', 'Career awareness sessions'],
  },
  'High School (IX–X)': {
    subjects: ['Tamil', 'English', 'Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Science (History, Geography, Civics, Economics)', 'Computer Applications', 'Physical Education'],
    highlights: ['Board exam preparation', 'Weekly mock tests', 'Special coaching for centum', 'Career guidance workshops', 'Science exhibitions'],
  },
  'Hr. Sec. (XI–XII)': {
    subjects: ['Tamil', 'English', 'Physics', 'Chemistry', 'Mathematics / Biology', 'Computer Science (optional)', 'Accountancy', 'Commerce', 'Economics', 'Business Mathematics'],
    highlights: ['Science & Commerce streams', 'NEET/JEE foundation coaching', 'Practical lab sessions', 'University entrance guidance', 'Competitive exam preparation', 'Industry visits & internships'],
  },
};

export default function Academics() {
  const [activeLevel, setActiveLevel] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const current = curricula[levels[activeLevel]];

  return (
    <>
      <Helmet>
        <title>Academics — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Academic programs from Primary to Higher Secondary, curriculum, and examination details." />
        <meta property="og:title" content="Academics — St. Francis Mat. Hr. School" />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Academics</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Comprehensive curriculum from Class I to XII aligned with Tamil Nadu State Board.</p>
            </motion.div>
          </div>
        </section>

        <section className="bg-white border-b sticky top-[80px] z-30" role="tablist">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-0 -mb-px">
              {levels.map((level, i) => (
                <button key={level} onClick={() => setActiveLevel(i)} role="tab" aria-selected={activeLevel === i}
                  className={`px-6 py-4 font-label text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeLevel === i ? 'border-secondary text-primary' : 'border-transparent text-gray-mid hover:text-primary'}`}>
                  {level}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div ref={ref} className={`section-container transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} role="tabpanel">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="card p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><FiBookOpen size={20} /></div>
                  <h2 className="text-xl font-display font-bold text-primary">Subjects Offered</h2>
                </div>
                <ul className="space-y-3">{current.subjects.map(s => (
                  <li key={s} className="flex items-center gap-3 text-gray-dark font-body"><span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />{s}</li>
                ))}</ul>
              </div>
              <div className="card p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center"><FiBookOpen size={20} /></div>
                  <h2 className="text-xl font-display font-bold text-primary">Key Highlights</h2>
                </div>
                <ul className="space-y-3">{current.highlights.map(h => (
                  <li key={h} className="flex items-center gap-3 text-gray-dark font-body"><span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />{h}</li>
                ))}</ul>
              </div>
            </div>

            <div id="curriculum" className="mt-16">
              <h2 className="section-heading">Examination & Grading</h2><div className="gold-line" />
              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="card p-8 border border-gray-100">
                  <h3 className="font-display font-bold text-primary text-lg mb-4">Examination Pattern</h3>
                  <ul className="space-y-3 text-gray-dark font-body text-sm">
                    {['Quarterly Exams (June)', 'Half-Yearly Exams (October)', 'Annual Exams (March)', 'Unit Tests & Assignments (Monthly)', 'Board Exams for Class X & XII (March/April)'].map(item => (
                      <li key={item} className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="card p-8 border border-gray-100">
                  <h3 className="font-display font-bold text-primary text-lg mb-4">Grading System</h3>
                  <table className="w-full text-sm"><thead><tr className="border-b border-gray-200">
                    <th className="py-2 text-left font-label text-gray-mid">Marks</th><th className="py-2 text-left font-label text-gray-mid">Grade</th>
                  </tr></thead><tbody className="font-body text-gray-dark">
                      {[['91–100', 'A1'], ['81–90', 'A2'], ['71–80', 'B1'], ['61–70', 'B2'], ['51–60', 'C1'], ['41–50', 'C2'], ['33–40', 'D'], ['Below 33', 'E (Fail)']].map(([r, g]) => (
                        <tr key={r} className="border-b border-gray-50"><td className="py-2">{r}</td><td className="py-2 font-semibold">{g}</td></tr>
                      ))}
                    </tbody></table>
                </div>
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <div className="card p-8 border border-gray-100">
                <h3 className="font-display font-bold text-primary text-lg mb-4">Co-curricular Activities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Literary Club', 'Science Club', 'Math Club', 'Eco Club', 'Sports Academy', 'Art & Craft', 'Music & Dance', 'Scout & Guide', 'Debate Society', 'Quiz Team', 'Computer Club', 'Social Service'].map(a => (
                    <div key={a} className="flex items-center gap-2 text-sm text-gray-dark font-body"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />{a}</div>
                  ))}
                </div>
              </div>
              <div className="card p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
                <FiDownload size={40} className="text-primary mb-4" />
                <h3 className="font-display font-bold text-primary text-lg mb-2">Academic Calendar</h3>
                <p className="text-gray-mid font-body text-sm mb-6">Download the complete 2025-26 academic calendar</p>
                <a href="/academic-calendar.pdf" download className="btn btn-primary">Download PDF</a>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <TimetableDownload />
              <SyllabusDownload />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
