import { FiAward, FiHeart, FiCpu, FiTarget, FiBookOpen, FiShield } from 'react-icons/fi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const features = [
  {
    icon: <FiAward size={28} />,
    title: 'Academic Excellence',
    description: 'Consistently achieving 98%+ pass rate in Board Examinations with numerous district toppers and centum scorers.',
    color: 'from-blue-500 to-primary',
  },
  {
    icon: <FiHeart size={28} />,
    title: 'Value-Based Education',
    description: 'Rooted in the teachings of St. Francis, we nurture character, compassion, and integrity alongside academics.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: <FiCpu size={28} />,
    title: 'Science & Computer Labs',
    description: 'State-of-the-art laboratories equipped with modern instruments and 40+ computers for hands-on learning.',
    color: 'from-emerald-500 to-green-600',
  },
  {
    icon: <FiTarget size={28} />,
    title: 'Sports & Co-curriculars',
    description: '15+ clubs and activities including cricket, kabaddi, athletics, music, dance, and arts to develop all-round talents.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: <FiBookOpen size={28} />,
    title: 'Well-Stocked Library',
    description: 'A rich collection of 10,000+ books, journals, and digital resources fostering a love for reading and research.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Safe & Inclusive Campus',
    description: 'CCTV monitored campus with trained security, anti-bullying policies, and a welcoming environment for all students.',
    color: 'from-cyan-500 to-teal-600',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="section-heading">Why Choose St. Francis?</h2>
            <div className="gold-line" />
            <p className="section-subheading">
              We provide a nurturing environment where every child discovers their potential and grows into a confident, responsible individual.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group card card-hover-lift p-8 border border-gray-100 hover:border-secondary/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-mid font-body leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
