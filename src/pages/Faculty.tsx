import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiUser } from 'react-icons/fi';
import { faculty } from '../data/faculty';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const departments = ['All', ...Array.from(new Set(faculty.map(f => f.department)))];

export default function Faculty() {
  const [dept, setDept] = useState('All');
  const [search, setSearch] = useState('');
  const [flipped, setFlipped] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = useMemo(() => {
    return faculty.filter(f => {
      const matchDept = dept === 'All' || f.department === dept;
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.subject.toLowerCase().includes(search.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [dept, search]);

  const leaders = filtered.filter(f => ['Correspondent', 'Principal', 'Vice Principal'].includes(f.designation));
  const others = filtered.filter(f => !['Correspondent', 'Principal', 'Vice Principal'].includes(f.designation));

  return (
    <>
      <Helmet>
        <title>Faculty & Staff — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Meet our dedicated faculty and staff at St. Francis School, Saram." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-0 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Our Faculty</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Dedicated educators shaping the future of our students.</p>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`section-container transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Filters */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-mid" />
              <input type="text" placeholder="Search by name or subject..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body" />
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map(d => (
                <button key={d} onClick={() => setDept(d)}
                  className={`px-4 py-2 rounded-full text-sm font-label font-medium transition-all ${dept === d ? 'bg-primary text-white' : 'bg-gray-100 text-gray-dark hover:bg-gray-200'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Leadership */}
          {leaders.length > 0 && (
            <div className="max-w-5xl mx-auto mb-12">
              <h2 className="text-2xl font-display font-bold text-primary mb-8 text-center">School Leadership</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {leaders.map(member => (
                  <div key={member.id} className="card card-hover-lift border border-gray-100 hover:border-secondary/30 overflow-hidden cursor-pointer"
                    onMouseEnter={() => setFlipped(member.id)} onMouseLeave={() => setFlipped(null)}>
                    {flipped === member.id ? (
                      <div className="p-6 bg-primary text-white min-h-[280px] flex flex-col justify-center animate-fade-in">
                        <h3 className="font-display font-bold text-xl text-secondary mb-3">{member.name}</h3>
                        <p className="text-white/80 font-body text-sm leading-relaxed">{member.bio}</p>
                      </div>
                    ) : (
                      <div className="p-6 text-center min-h-[280px] flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4">
                          <FiUser size={36} className="text-white" />
                        </div>
                        <h3 className="font-display font-bold text-primary text-lg">{member.name}</h3>
                        <p className="text-secondary font-label text-sm font-semibold mt-1">{member.designation}</p>
                        <p className="text-gray-mid text-xs font-body mt-1">{member.qualification}</p>
                        <p className="text-gray-mid text-xs font-body">{member.experience} Experience</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Faculty Grid */}
          <div className="max-w-6xl mx-auto">
            {others.length > 0 && <h2 className="text-2xl font-display font-bold text-primary mb-8 text-center">Teaching Staff</h2>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {others.map(member => (
                <div key={member.id} className="card card-hover-lift border border-gray-100 hover:border-secondary/30 overflow-hidden cursor-pointer"
                  onMouseEnter={() => setFlipped(member.id)} onMouseLeave={() => setFlipped(null)}>
                  {flipped === member.id ? (
                    <div className="p-5 bg-primary text-white min-h-[220px] flex flex-col justify-center animate-fade-in">
                      <h3 className="font-display font-bold text-secondary mb-2">{member.name}</h3>
                      <p className="text-white/80 font-body text-xs leading-relaxed">{member.bio}</p>
                    </div>
                  ) : (
                    <div className="p-5 text-center min-h-[220px] flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-primary-light flex items-center justify-center mb-3">
                        <span className="text-white font-display font-bold text-lg">{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <h3 className="font-display font-bold text-primary text-sm">{member.name}</h3>
                      <p className="text-secondary font-label text-xs font-semibold mt-1">{member.subject}</p>
                      <p className="text-gray-mid text-xs font-body">{member.qualification}</p>
                      <p className="text-gray-mid text-xs font-body">{member.experience}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-mid font-body">No faculty members found matching your criteria.</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
