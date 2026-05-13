import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiArrowRight } from 'react-icons/fi';
import { announcements } from '../../data/announcements';
import { formatDate, getCategoryColor } from '../../utils/helpers';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Announcements() {
  const { ref, isVisible } = useScrollAnimation();
  const [hovering, setHovering] = useState(false);

  return (
    <section ref={ref} className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
              <FiBell size={16} />
              <span className="text-sm font-label font-semibold tracking-wider uppercase">Notice Board</span>
            </div>
            <h2 className="section-heading">Latest Announcements</h2>
            <div className="gold-line" />
          </div>

          {/* Scrolling Announcements */}
          <div
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-h-[420px] border border-gray-100"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Gradient masks */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            <div className={`py-4 ${hovering ? '' : 'announcement-scroll'}`}>
              <div className="space-y-0">
                {[...announcements, ...announcements].map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex items-start gap-4 px-6 py-4 hover:bg-accent/50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    {/* Date */}
                    <div className="flex-shrink-0 text-center min-w-[52px]">
                      <div className="text-xs font-label text-gray-mid uppercase">
                        {formatDate(item.date, 'MMM')}
                      </div>
                      <div className="text-2xl font-display font-bold text-primary">
                        {formatDate(item.date, 'dd')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`badge ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        {item.isNew && (
                          <span className="badge bg-red-500 text-white animate-blink">
                            NEW
                          </span>
                        )}
                      </div>
                      <h4 className="font-body font-bold text-gray-dark text-sm leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-mid mt-1 line-clamp-1">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-primary font-label font-semibold text-sm hover:text-secondary transition-colors group"
            >
              View All Announcements
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
