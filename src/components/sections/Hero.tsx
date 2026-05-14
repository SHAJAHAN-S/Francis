import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

const FOUNDING_YEAR = 1994;

export default function Hero() {
  const { t } = useLanguage();
  const yearsOfExcellence = new Date().getFullYear() - FOUNDING_YEAR;

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden" role="banner">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
                <defs>
                  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2172B8"/>
                    <stop offset="50%" style="stop-color:#00457E"/>
                    <stop offset="100%" style="stop-color:#2172B8"/>
                  </linearGradient>
                </defs>
                <rect fill="url(#bg)" width="1920" height="1080"/>
                <g opacity="0.1" fill="#C8922A">
                  <circle cx="200" cy="200" r="150"/>
                  <circle cx="1700" cy="800" r="200"/>
                  <circle cx="960" cy="540" r="100"/>
                </g>
              </svg>
            `)}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-dark/90 to-primary/85" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-secondary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-secondary/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Affiliation badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-label tracking-wider">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            {t('hero.title1')}{' '}
            <span className="text-secondary">{t('hero.title2')}</span>{' '}
            {t('hero.title3')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/80 font-body leading-relaxed mb-10 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/admissions"
              className="btn bg-secondary text-white hover:bg-secondary-light shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 text-base px-8 py-4"
            >
              {t('hero.cta1')}
              <FiArrowRight className="ml-1" />
            </Link>
            <Link
              to="/about"
              className="btn border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm text-base px-8 py-4"
            >
              {t('hero.cta2')}
            </Link>
            <a
              href="/school-prospectus.pdf"
              download
              className="btn border-2 border-secondary/40 text-secondary hover:bg-secondary/10 backdrop-blur-sm text-base px-6 py-4"
            >
              <FiDownload className="mr-1" />
              {t('hero.prospectus')}
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10"
          >
            {[
              { value: `${yearsOfExcellence}+`, label: 'Years' },
              { value: '1200+', label: 'Students' },
              { value: '98%', label: 'Pass Rate' },
              { value: '50+', label: 'Faculty' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-secondary">{stat.value}</div>
                <div className="text-sm text-white/60 font-label tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
