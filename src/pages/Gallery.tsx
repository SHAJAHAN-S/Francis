import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';
import { galleryImages } from '../data/gallery';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categories = ['All', 'Campus', 'Sports', 'Events', 'Cultural', 'Academics'];
const years = ['All', ...Array.from(new Set(galleryImages.map(g => g.year))).sort((a, b) => b - a).map(String)];

const colors: Record<string, string> = {
  Campus: 'from-blue-400 to-blue-600',
  Sports: 'from-red-400 to-red-600',
  Events: 'from-purple-400 to-purple-600',
  Cultural: 'from-pink-400 to-pink-600',
  Academics: 'from-green-400 to-green-600',
};

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [year, setYear] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = useMemo(() => {
    return galleryImages.filter(img => {
      const matchCat = category === 'All' || img.category === category;
      const matchYear = year === 'All' || img.year === Number(year);
      return matchCat && matchYear;
    });
  }, [category, year]);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);
  const currentIndex = filtered.findIndex(img => img.id === lightbox);
  const navigateLB = (dir: number) => {
    const newIndex = (currentIndex + dir + filtered.length) % filtered.length;
    setLightbox(filtered[newIndex].id);
  };

  return (
    <>
      <Helmet>
        <title>Gallery — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Photo gallery of events, sports, campus, and activities at St. Francis School." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-10 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Photo Gallery</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Capturing moments of learning, joy, and achievement.</p>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`section-container transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-label font-medium transition-all ${category === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-dark hover:bg-gray-200'}`}>
                  {c}
                </button>
              ))}
            </div>
            <select value={year} onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 font-body text-sm focus:border-primary outline-none">
              {years.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>)}
            </select>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div key={img.id} onClick={() => openLightbox(img.id)}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer card-hover-lift"
                style={{ animationDelay: `${i * 50}ms` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${colors[img.category] || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                  <FiImage size={40} className="text-white/30" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                    <span className="text-xs text-white/80 font-label uppercase tracking-wider">{img.category} · {img.year}</span>
                    <p className="text-white font-body text-sm mt-1">{img.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-mid font-body">No images found for the selected filters.</div>
          )}
        </div>

        {/* Lightbox */}
        {lightbox !== null && currentIndex >= 0 && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-secondary p-2 z-50" aria-label="Close">
              <FiX size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigateLB(-1); }}
              className="absolute left-4 text-white hover:text-secondary p-2" aria-label="Previous">
              <FiChevronLeft size={32} />
            </button>
            <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className={`aspect-video rounded-xl bg-gradient-to-br ${colors[filtered[currentIndex].category] || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                <div className="text-center text-white">
                  <FiImage size={64} className="mx-auto mb-4 opacity-30" />
                  <p className="font-display text-xl">{filtered[currentIndex].caption}</p>
                  <p className="text-white/60 font-label text-sm mt-2">{filtered[currentIndex].category} · {filtered[currentIndex].year}</p>
                </div>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); navigateLB(1); }}
              className="absolute right-4 text-white hover:text-secondary p-2" aria-label="Next">
              <FiChevronRight size={32} />
            </button>
          </div>
        )}
      </main>
    </>
  );
}
