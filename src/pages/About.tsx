import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiEye, FiTarget, FiAward, FiUsers, FiBookOpen, FiMonitor, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const tabs = ['History', 'Vision & Mission', "Principal's Desk", 'Infrastructure', 'Achievements'];

const milestones = [
  { year: '1994', title: 'Foundation', desc: 'School established in Saram, Tindivanam.' },
  { year: '2000', title: 'Higher Secondary Added', desc: 'Upgraded with Science and Commerce streams.' },
  { year: '2005', title: 'New Science Block', desc: 'Modern laboratories inaugurated.' },
  { year: '2010', title: 'Computer Lab Expansion', desc: '40 systems with high-speed internet.' },
  { year: '2015', title: 'Sports Complex', desc: 'Cricket, basketball, and athletics facilities.' },
  { year: '2020', title: 'Digital Classrooms', desc: 'Smart boards and projectors introduced.' },
  { year: '2024', title: `${new Date().getFullYear() - 1994} Years of Excellence`, desc: '1200+ students and 50+ faculty.' },
];

const infra = [
  { icon: <FiMonitor size={28} />, title: 'Smart Classrooms', desc: 'Projectors and digital boards for interactive learning.' },
  { icon: <FiMonitor size={28} />, title: 'Computer Lab', desc: '40+ computers with high-speed internet.' },
  { icon: <FiTarget size={28} />, title: 'Science Labs', desc: 'Physics, Chemistry, and Biology labs.' },
  { icon: <FiBookOpen size={28} />, title: 'Library', desc: '10,000+ books and e-resources.' },
  { icon: <FiHome size={28} />, title: 'Sports Ground', desc: 'Cricket, football, kabaddi, and athletics.' },
  { icon: <FiHome size={28} />, title: 'Chapel', desc: 'Serene space for prayers and spiritual activities.' },
];

const mgmt = [
  { name: 'Rev. Fr. Joseph Antony', role: 'Correspondent' },
  { name: 'Mrs. Mary Stella', role: 'Principal' },
  { name: 'Mr. Rajesh Kumar', role: 'Vice Principal' },
  { name: 'Rev. Fr. Thomas Xavier', role: 'Secretary' },
  { name: 'Mr. K. Venkatesh', role: 'Treasurer' },
];

export default function About() {
  const { hash } = useLocation();

  const hashToTab: Record<string, number> = {
    '#history': 0,
    '#vision': 1,
    '#principal': 2,
    '#infrastructure': 3,
    '#achievements': 4,
  };

  const [activeTab, setActiveTab] = useState(() => {
    if (hash && hashToTab[hash] !== undefined) {
      return hashToTab[hash];
    }
    return 0;
  });

  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (hash && hashToTab[hash] !== undefined) {
      setActiveTab(hashToTab[hash]);

      const element = document.getElementById('about-tabs');
      if (element) {
        setTimeout(() => {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.scrollY;
          // Offset of 96px for the sticky header
          window.scrollTo({
            top: absoluteElementTop - 96,
            behavior: 'smooth',
          });
        }, 150);
      }
    }
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>About Us — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="History, vision, mission, and infrastructure of St. Francis School, Saram." />
        <meta property="og:title" content="About Us — St. Francis Mat. Hr. School" />
        <meta property="og:description" content="Learn about our history, vision, and campus infrastructure." />
      </Helmet>
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">About Our School</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Three decades of nurturing excellence in education, faith, and character.</p>
            </motion.div>
          </div>
        </section>

        {/* Tabs */}
        <section id="about-tabs" className="bg-white border-b border-gray-100 sticky top-[80px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-0 -mb-px">
              {tabs.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)}
                  className={`px-5 py-4 font-label text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === i ? 'border-secondary text-primary' : 'border-transparent text-gray-mid hover:text-primary'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div ref={ref} className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {activeTab === 0 && (
            <section className="section-container">
              <div className="max-w-4xl mx-auto">
                <h2 className="section-heading">Our Journey</h2><div className="gold-line" />
                <div className="relative mt-12">
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />
                  {milestones.map((m, i) => (
                    <div key={m.year} className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''} pl-12 md:pl-0`}>
                        <div className="card p-6 border border-gray-100 hover:border-secondary/30 transition-colors">
                          <span className="text-secondary font-display font-bold text-2xl">{m.year}</span>
                          <h3 className="font-display font-bold text-primary text-lg mt-1">{m.title}</h3>
                          <p className="text-gray-mid text-sm mt-2 font-body">{m.desc}</p>
                        </div>
                      </div>
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-white shadow-md z-10 mt-6" />
                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 1 && (
            <section className="section-container">
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="card p-8 border-t-4 border-t-primary">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6"><FiEye size={28} /></div>
                  <h2 className="text-2xl font-display font-bold text-primary mb-4">Our Vision</h2>
                  <p className="text-gray-dark font-body leading-relaxed text-lg italic">"To be a centre of holistic education that inspires lifelong learning, fosters spiritual growth, and nurtures responsible citizens."</p>
                </div>
                <div className="card p-8 border-t-4 border-t-secondary">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6"><FiTarget size={28} /></div>
                  <h2 className="text-2xl font-display font-bold text-primary mb-4">Our Mission</h2>
                  <p className="text-gray-dark font-body leading-relaxed text-lg italic">"To provide quality education grounded in values, discipline, and creativity, empowering every student to realize their full potential."</p>
                </div>
              </div>
              <div className="max-w-4xl mx-auto mt-16">
                <h3 className="text-2xl font-display font-bold text-primary text-center mb-8">Core Values</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Faith', 'Excellence', 'Integrity', 'Compassion'].map((v) => (
                    <div key={v} className="text-center p-6 rounded-xl bg-accent hover:bg-primary hover:text-white transition-all duration-300 group cursor-default">
                      <h4 className="font-display font-bold text-lg text-primary group-hover:text-white transition-colors">{v}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 2 && (
            <section className="section-container">
              <div className="max-w-4xl mx-auto">
                <h2 className="section-heading">Principal's Message</h2><div className="gold-line" />
                <div className="card p-8 md:p-12 mt-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 text-center">
                      <div className="w-40 h-48 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto">
                        <span className="text-5xl text-white font-display font-bold">MS</span>
                      </div>
                      <h3 className="font-display font-bold text-primary text-xl mt-4">Mrs. Mary Stella</h3>
                      <p className="text-gray-mid font-label text-sm">Principal</p>
                    </div>
                    <div className="flex-1 space-y-4 text-gray-dark font-body leading-relaxed">
                      <p>Dear Parents and Students,</p>
                      <p>Welcome to St. Francis Mat. Hr. School. For over three decades, our institution has been a beacon of academic excellence and moral education in Tindivanam.</p>
                      <p>We believe education is the holistic development of the child — intellectually, spiritually, emotionally, and physically. Our 50+ qualified teachers create an environment that inspires curiosity and critical thinking.</p>
                      <p>We take pride in our 98% pass rate in Board Examinations while nurturing talents through sports, arts, and cultural activities.</p>
                      <p className="font-semibold mt-6">God Bless,<br />Mrs. Mary Stella, Principal</p>
                    </div>
                  </div>
                </div>
                <div className="mt-16">
                  <h3 className="text-2xl font-display font-bold text-primary text-center mb-8">Management Committee</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full"><thead><tr className="bg-primary text-white">
                      <th className="px-6 py-3 text-left font-label text-sm">Name</th>
                      <th className="px-6 py-3 text-left font-label text-sm">Designation</th>
                    </tr></thead><tbody>
                        {mgmt.map((m, i) => (
                          <tr key={m.name} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 font-body font-semibold text-gray-dark">{m.name}</td>
                            <td className="px-6 py-4 font-body text-gray-mid">{m.role}</td>
                          </tr>
                        ))}
                      </tbody></table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 3 && (
            <section className="section-container">
              <div className="max-w-6xl mx-auto">
                <h2 className="section-heading">Our Infrastructure</h2><div className="gold-line" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {infra.map((item) => (
                    <div key={item.title} className="card card-hover-lift p-8 border border-gray-100 hover:border-secondary/30 group">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">{item.icon}</div>
                      <h3 className="text-xl font-display font-bold text-primary mb-3">{item.title}</h3>
                      <p className="text-gray-mid font-body text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 4 && (
            <section className="section-container">
              <div className="max-w-4xl mx-auto">
                <h2 className="section-heading">Achievements</h2><div className="gold-line" />
                <div className="space-y-6 mt-12">
                  {[
                    { icon: <FiAward />, color: 'border-l-secondary', title: 'Tamil Nadu State Board Affiliation', desc: 'Fully affiliated for classes I through XII.' },
                    { icon: <FiAward />, color: 'border-l-primary', title: '98% Board Pass Rate', desc: '5 consecutive years of outstanding results.' },
                    { icon: <FiUsers />, color: 'border-l-success', title: 'District-Level Sports Champions', desc: 'Awards in cricket, kabaddi, and athletics.' },
                    { icon: <FiAward />, color: 'border-l-secondary', title: '30 Years of Service', desc: 'Thousands of successful alumni since 1994.' },
                  ].map((a) => (
                    <div key={a.title} className={`card p-8 border-l-4 ${a.color}`}>
                      <div className="flex items-start gap-4">
                        <span className="text-secondary flex-shrink-0 mt-1 text-xl">{a.icon}</span>
                        <div>
                          <h3 className="font-display font-bold text-primary text-lg">{a.title}</h3>
                          <p className="text-gray-mid font-body mt-2">{a.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
