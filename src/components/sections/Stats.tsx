import { FiAward, FiUsers, FiBookOpen, FiStar, FiActivity } from 'react-icons/fi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCountUp } from '../../hooks/useCountUp';
import type { StatItem } from '../../types';

const FOUNDING_YEAR = 1994;
const yearsOfExcellence = new Date().getFullYear() - FOUNDING_YEAR;

const stats: (StatItem & { iconComponent: React.ReactNode })[] = [
  { label: 'Years of Excellence', value: yearsOfExcellence, suffix: '+', icon: 'award', iconComponent: <FiAward size={32} /> },
  { label: 'Students Enrolled', value: 1200, suffix: '+', icon: 'users', iconComponent: <FiUsers size={32} /> },
  { label: 'Qualified Faculty', value: 50, suffix: '+', icon: 'book', iconComponent: <FiBookOpen size={32} /> },
  { label: '10th Board Pass %', value: 98, suffix: '%', icon: 'star', iconComponent: <FiStar size={32} /> },
  { label: '12th Board Pass %', value: 98, suffix: '%', icon: 'star', iconComponent: <FiStar size={32} /> },
  { label: 'Extracurricular Clubs', value: 15, suffix: '+', icon: 'activity', iconComponent: <FiActivity size={32} /> },
];

function StatCard({ stat, isVisible, index }: { stat: typeof stats[0]; isVisible: boolean; index: number }) {
  const count = useCountUp(stat.value, 2000, 0, isVisible);
  return (
    <div
      className="text-center group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
        {stat.iconComponent}
      </div>
      <div className="text-4xl md:text-5xl font-display font-bold text-secondary mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-sm font-label tracking-wider uppercase text-white/70">
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section ref={ref} className="bg-primary py-20 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Our Achievements in Numbers
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
