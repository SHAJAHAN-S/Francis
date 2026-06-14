import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiDownload, FiImage, FiCalendar, FiFileText, FiClock, FiVideo } from 'react-icons/fi';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Announcements from '../components/sections/Announcements';
import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const quickLinks = [
  { icon: <FiDownload size={24} />, label: 'Admission Form', desc: 'Download application form', path: '/admissions', color: 'from-blue-500 to-primary' },
  { icon: <FiImage size={24} />, label: 'Photo Gallery', desc: 'View school gallery', path: '/gallery', color: 'from-green-500 to-emerald-600' },
  { icon: <FiCalendar size={24} />, label: 'Academic Calendar', desc: '2025-26 calendar', path: '/academics#curriculum', color: 'from-purple-500 to-violet-600' },
  { icon: <FiFileText size={24} />, label: 'Holiday List', desc: 'Annual holiday schedule', path: '/events', color: 'from-orange-500 to-amber-600' },
  { icon: <FiClock size={24} />, label: 'Exam Timetable', desc: 'Upcoming exam schedule', path: '/academics#curriculum', color: 'from-rose-500 to-pink-600' },
  { icon: <FiVideo size={24} />, label: 'Virtual Tour', desc: 'Explore our campus', path: '/virtual-tour', color: 'from-cyan-500 to-teal-600' },
];

export default function Home() {
  const { ref: quickRef, isVisible: quickVisible } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>ST. Francis Mat. Hr. School | Saram, Tindivanam — Nurturing Excellence</title>
        <meta name="description" content="St. Francis Matriculation Higher Secondary School, Saram, Tindivanam. Affiliated to Tamil Nadu State Board. Nurturing excellence in education since 1994." />
        <meta property="og:title" content="ST. Francis Mat. Hr. School | Saram, Tindivanam" />
        <meta property="og:description" content="Nurturing Excellence in Education since 1994. Admissions Open for 2025-26." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        <Hero />
        <Stats />
        <Announcements />
        <Features />
        <Testimonials />

        {/* Quick Links Section */}
        <section ref={quickRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`transition-all duration-700 ${quickVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-14">
                <h2 className="section-heading">Quick Links & Resources</h2>
                <div className="gold-line" />
                <p className="section-subheading">
                  Access important documents and resources quickly
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="group card card-hover-lift p-6 text-center border border-gray-100 hover:border-secondary/30"
                  >
                    <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${link.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      {link.icon}
                    </div>
                    <h3 className="font-label font-semibold text-sm text-gray-dark group-hover:text-primary transition-colors mb-1">
                      {link.label}
                    </h3>
                    <p className="text-xs text-gray-mid hidden sm:block">
                      {link.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-primary via-primary-dark to-primary py-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Begin Your Child's Journey with Us
            </h2>
            <p className="text-white/80 text-lg mb-8 font-body">
              Admissions are open for the academic year 2025-2026. Join our family of 1200+ happy students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions" className="btn bg-secondary text-white hover:bg-secondary-light shadow-lg text-base px-8 py-4">
                Apply Now
              </Link>
              <Link to="/contact" className="btn border-2 border-white/40 text-white hover:bg-white/10 text-base px-8 py-4">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
