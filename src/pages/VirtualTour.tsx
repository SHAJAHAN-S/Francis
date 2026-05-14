import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPlay, FiChevronRight, FiX } from 'react-icons/fi';

const areas = [
  { id: 1, name: 'Main Entrance & Campus', desc: 'The welcoming front gate and campus grounds with lush greenery.', color: 'from-blue-400 to-blue-600' },
  { id: 2, name: 'Smart Classrooms', desc: 'Air-conditioned rooms equipped with projectors and digital boards.', color: 'from-purple-400 to-purple-600' },
  { id: 3, name: 'Science Laboratories', desc: 'Well-equipped Physics, Chemistry, and Biology labs for hands-on learning.', color: 'from-green-400 to-green-600' },
  { id: 4, name: 'Computer Lab', desc: '40+ computers with high-speed internet for digital literacy.', color: 'from-cyan-400 to-cyan-600' },
  { id: 5, name: 'Library & Reading Room', desc: '10,000+ books, journals, and e-resources in a serene environment.', color: 'from-amber-400 to-amber-600' },
  { id: 6, name: 'Sports Ground', desc: 'Expansive playground for cricket, football, kabaddi, and athletics.', color: 'from-red-400 to-red-600' },
  { id: 7, name: 'Chapel', desc: 'Beautiful chapel for daily prayers and spiritual gatherings.', color: 'from-indigo-400 to-indigo-600' },
  { id: 8, name: 'Auditorium', desc: 'Multi-purpose hall for events, cultural programs, and assemblies.', color: 'from-pink-400 to-pink-600' },
];

export default function VirtualTour() {
  const [active, setActive] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Virtual Campus Tour — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Take a virtual tour of St. Francis School campus. Explore classrooms, labs, and facilities." />
        <meta property="og:title" content="Virtual Campus Tour — St. Francis Mat. Hr. School" />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Virtual Campus Tour</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Explore our campus from the comfort of your home.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-container">
          {/* Video Tour CTA */}
          <div className="card p-8 md:p-12 bg-gradient-to-r from-primary via-primary-dark to-primary text-white text-center mb-16 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" /></div>
            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20 cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsVideoModalOpen(true)}>
                <FiPlay size={32} className="text-secondary ml-1" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Watch Our Campus Video Tour</h2>
              <p className="text-white/70 font-body max-w-xl mx-auto mb-6">A 5-minute guided walkthrough of our entire campus showcasing classrooms, labs, sports facilities, and more.</p>
              <button onClick={() => setIsVideoModalOpen(true)} className="btn bg-secondary text-white hover:bg-secondary-light shadow-lg">
                <FiPlay className="mr-1" /> Watch Video Tour
              </button>
            </div>
          </div>

          {/* Interactive Area Explorer */}
          <h2 className="section-heading">Explore Campus Areas</h2><div className="gold-line" />
          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {/* Area List */}
            <div className="lg:col-span-1 space-y-2">
              {areas.map((area, i) => (
                <button key={area.id} onClick={() => setActive(i)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 group ${active === i ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 hover:bg-accent text-gray-dark'}`}>
                  <FiMapPin size={18} className={active === i ? 'text-secondary' : 'text-gray-mid group-hover:text-primary'} />
                  <span className="flex-1 font-label font-medium text-sm">{area.name}</span>
                  <FiChevronRight size={16} className={active === i ? 'text-secondary' : 'text-gray-300'} />
                </button>
              ))}
            </div>

            {/* Area Preview */}
            <div className="lg:col-span-2">
              <div className={`aspect-video rounded-2xl bg-gradient-to-br ${areas[active].color} flex items-center justify-center relative overflow-hidden shadow-lg`}>
                <div className="text-center text-white p-8">
                  <FiMapPin size={48} className="mx-auto mb-4 opacity-40" />
                  <h3 className="font-display font-bold text-2xl mb-2">{areas[active].name}</h3>
                  <p className="text-white/80 font-body">{areas[active].desc}</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white font-label">
                  360° View Coming Soon
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {areas.slice(0, 4).map((a, i) => (
                  <button key={a.id} onClick={() => setActive(i)}
                    className={`aspect-video rounded-lg bg-gradient-to-br ${a.color} opacity-60 hover:opacity-100 transition-opacity ${active === i ? 'ring-2 ring-secondary opacity-100' : ''}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Campus Highlights */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: '3 Acres', label: 'Campus Area' },
              { stat: '30+', label: 'Classrooms' },
              { stat: '3', label: 'Science Labs' },
              { stat: '1', label: 'Sports Ground' },
            ].map(h => (
              <div key={h.label} className="card p-6 text-center border border-gray-100">
                <div className="text-3xl font-display font-bold text-primary">{h.stat}</div>
                <div className="text-sm text-gray-mid font-label uppercase tracking-wider mt-1">{h.label}</div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setIsVideoModalOpen(false)}>
            <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl animate-fade-up" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors">
                <FiX size={24} />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Campus Tour Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
