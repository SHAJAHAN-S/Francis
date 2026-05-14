import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiDownload, FiX } from 'react-icons/fi';
import { events } from '../data/events';
import { formatDate, isFutureDate, getCategoryColor, downloadICS } from '../utils/helpers';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SocialShare from '../components/common/SocialShare';
import { EventSchema } from '../components/common/SchemaMarkup';

export default function Events() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [modal, setModal] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const upcoming = useMemo(() => events.filter(e => isFutureDate(e.date)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), []);
  const past = useMemo(() => events.filter(e => !isFutureDate(e.date)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);
  const selected = modal !== null ? events.find(e => e.id === modal) : null;

  const months = useMemo(() => {
    const m: Record<string, typeof events> = {};
    events.forEach(e => {
      const key = formatDate(e.date, 'MMMM yyyy');
      if (!m[key]) m[key] = [];
      m[key].push(e);
    });
    return m;
  }, []);

  return (
    <>
      <Helmet>
        <title>Events — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Upcoming and past events at St. Francis School, Saram." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Events</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Stay updated with school events and activities.</p>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`section-container transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* View Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button onClick={() => setView('list')} className={`px-6 py-2 rounded-md text-sm font-label font-medium transition-all ${view === 'list' ? 'bg-white shadow text-primary' : 'text-gray-mid'}`}>List View</button>
              <button onClick={() => setView('calendar')} className={`px-6 py-2 rounded-md text-sm font-label font-medium transition-all ${view === 'calendar' ? 'bg-white shadow text-primary' : 'text-gray-mid'}`}>Calendar View</button>
            </div>
          </div>

          {view === 'list' ? (
            <>
              {/* Upcoming */}
              {upcoming.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-display font-bold text-primary mb-8">Upcoming Events</h2>
                  <div className="space-y-4">
                    {upcoming.map(event => (
                      <div key={event.id} onClick={() => setModal(event.id)}
                        className="card card-hover-lift p-6 border border-gray-100 hover:border-secondary/30 cursor-pointer flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 text-center md:w-20">
                          <div className="text-sm font-label text-gray-mid uppercase">{formatDate(event.date, 'MMM')}</div>
                          <div className="text-3xl font-display font-bold text-primary">{formatDate(event.date, 'dd')}</div>
                        </div>
                        <div className="flex-1">
                          <span className={`badge ${getCategoryColor(event.category)} mb-2`}>{event.category}</span>
                          <h3 className="font-display font-bold text-primary text-lg">{event.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-mid font-body">
                            <span className="flex items-center gap-1"><FiClock size={14} />{event.time}</span>
                            <span className="flex items-center gap-1"><FiMapPin size={14} />{event.venue}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button onClick={(e) => { e.stopPropagation(); downloadICS(event.title, event.date, event.time, event.venue, event.description); }}
                            className="btn btn-outline-primary text-xs px-3 py-2"><FiDownload size={14} />Add to Cal</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past */}
              {past.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-primary mb-8">Past Events</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {past.map(event => (
                      <div key={event.id} onClick={() => setModal(event.id)}
                        className="card p-6 border border-gray-100 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                        <span className={`badge ${getCategoryColor(event.category)} mb-2`}>{event.category}</span>
                        <h3 className="font-display font-bold text-primary">{event.title}</h3>
                        <div className="flex gap-4 mt-2 text-xs text-gray-mid font-body">
                          <span className="flex items-center gap-1"><FiCalendar size={12} />{formatDate(event.date)}</span>
                          <span className="flex items-center gap-1"><FiMapPin size={12} />{event.venue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Calendar View */
            <div className="space-y-10">
              {Object.entries(months).map(([month, evts]) => (
                <div key={month}>
                  <h3 className="text-xl font-display font-bold text-primary mb-4 flex items-center gap-2"><FiCalendar className="text-secondary" />{month}</h3>
                  <div className="space-y-3">
                    {evts.map(event => (
                      <div key={event.id} onClick={() => setModal(event.id)}
                        className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-accent cursor-pointer transition-colors">
                        <div className="w-12 text-center">
                          <div className="text-lg font-display font-bold text-primary">{formatDate(event.date, 'dd')}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-body font-semibold text-gray-dark text-sm">{event.title}</h4>
                          <p className="text-xs text-gray-mid">{event.time} · {event.venue}</p>
                        </div>
                        <span className={`badge ${getCategoryColor(event.category)} text-xs`}>{event.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-fade-up" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className={`badge ${getCategoryColor(selected.category)}`}>{selected.category}</span>
                  <button onClick={() => setModal(null)} className="text-gray-mid hover:text-primary"><FiX size={20} /></button>
                </div>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">{selected.title}</h2>
                <div className="space-y-3 text-sm text-gray-dark font-body mb-6">
                  <div className="flex items-center gap-3"><FiCalendar className="text-secondary" />{formatDate(selected.date, 'EEEE, MMMM dd, yyyy')}</div>
                  <div className="flex items-center gap-3"><FiClock className="text-secondary" />{selected.time}</div>
                  <div className="flex items-center gap-3"><FiMapPin className="text-secondary" />{selected.venue}</div>
                </div>
                <p className="text-gray-mid font-body leading-relaxed mb-6">{selected.description}</p>
                <button onClick={() => downloadICS(selected.title, selected.date, selected.time, selected.venue, selected.description)}
                  className="btn btn-primary w-full"><FiDownload className="mr-2" />Add to Calendar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
