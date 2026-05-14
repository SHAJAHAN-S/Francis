import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiUser, FiSend, FiAward, FiBriefcase, FiMapPin } from 'react-icons/fi';
import { alumniData } from '../data/alumni';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const batches = ['All', ...Array.from(new Set(alumniData.map(a => a.batch))).sort((a, b) => b - a).map(String)];

export default function Alumni() {
  const [batch, setBatch] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const filtered = batch === 'All' ? alumniData : alumniData.filter(a => a.batch === Number(batch));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => { setFormSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Alumni Network — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Connect with alumni of St. Francis School. Success stories and registration." />
        <meta property="og:title" content="Alumni Network — St. Francis Mat. Hr. School" />
        <meta property="og:description" content="Discover the inspiring journeys of our alumni." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-10 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Alumni Network</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Celebrating the achievements of our former students.</p>
              <button onClick={() => setShowForm(true)} className="btn bg-secondary text-white hover:bg-secondary-light shadow-lg mt-6">Join Alumni Network</button>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <section className="py-12 bg-accent">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[{ label: 'Alumni Worldwide', value: '5,000+' }, { label: 'Countries', value: '12' }, { label: 'Batch Years', value: `${new Date().getFullYear() - 1994}` }, { label: 'Active Members', value: '1,200+' }].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-display font-bold text-primary">{s.value}</div>
                  <div className="text-sm text-gray-mid font-label uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="section-container">
            <h2 className="section-heading">Success Stories</h2><div className="gold-line" />
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {batches.map(b => (
                <button key={b} onClick={() => setBatch(b)} className={`px-4 py-2 rounded-full text-sm font-label font-medium transition-all ${batch === b ? 'bg-primary text-white' : 'bg-gray-100 text-gray-dark hover:bg-gray-200'}`}>
                  {b === 'All' ? 'All Batches' : `Batch of ${b}`}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {filtered.map(alumni => (
                <div key={alumni.id} className="card card-hover-lift p-8 border border-gray-100 hover:border-secondary/30">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                      <FiUser size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-primary text-lg">{alumni.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-secondary font-label"><FiAward size={14} /><span>Batch of {alumni.batch}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-mid font-body">
                    <span className="flex items-center gap-1"><FiBriefcase size={12} />{alumni.currentRole}</span>
                    <span className="flex items-center gap-1"><FiMapPin size={12} />{alumni.company}</span>
                  </div>
                  <p className="text-gray-dark font-body text-sm leading-relaxed italic">"{alumni.story}"</p>
                </div>
              ))}
            </div>
            {filtered.length === 0 && <p className="text-center py-16 text-gray-mid font-body">No alumni found for the selected batch.</p>}
          </section>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-8">
                <h2 className="text-2xl font-display font-bold text-primary mb-6">Join Alumni Network</h2>
                {formSubmitted ? (
                  <div className="bg-success/10 border border-success text-success rounded-lg p-4 text-center font-body">✓ Registration successful!</div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    {[{ l: 'Full Name *', t: 'text', r: true }, { l: 'Email *', t: 'email', r: true }, { l: 'Phone', t: 'tel', r: false }, { l: 'Batch Year *', t: 'number', r: true }, { l: 'Current Designation', t: 'text', r: false }, { l: 'Organization', t: 'text', r: false }].map(f => (
                      <div key={f.l}>
                        <label className="block text-sm font-label font-medium text-gray-dark mb-1">{f.l}</label>
                        <input type={f.t} required={f.r} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body text-sm" />
                      </div>
                    ))}
                    <button type="submit" className="btn btn-primary w-full py-3"><FiSend className="mr-2" />Register</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
