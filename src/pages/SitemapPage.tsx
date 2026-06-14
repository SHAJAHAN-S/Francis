import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiHome, FiInfo, FiBookOpen, FiUserPlus, FiUsers, FiImage, FiFileText, FiCalendar, FiPhone, FiHeart, FiEdit3, FiVideo, FiShield, FiMap } from 'react-icons/fi';

const siteLinks = [
  { section: 'Main Pages', links: [
    { label: 'Home', path: '/', icon: <FiHome size={18} />, desc: 'School homepage with highlights' },
    { label: 'About Us', path: '/about', icon: <FiInfo size={18} />, desc: 'History, vision, mission, infrastructure' },
    { label: 'Academics', path: '/academics', icon: <FiBookOpen size={18} />, desc: 'Curriculum, subjects, grading system' },
    { label: 'Admissions', path: '/admissions', icon: <FiUserPlus size={18} />, desc: 'Process, fees, inquiry form' },
  ]},
  { section: 'People & Community', links: [
    { label: 'Faculty & Staff', path: '/faculty', icon: <FiUsers size={18} />, desc: 'Meet our dedicated teachers' },
    { label: 'Alumni Network', path: '/alumni', icon: <FiHeart size={18} />, desc: 'Alumni stories and registration' },
  ]},
  { section: 'Media & Content', links: [
    { label: 'Photo Gallery', path: '/gallery', icon: <FiImage size={18} />, desc: 'Campus, events, and activity photos' },
    { label: 'News & Updates', path: '/news', icon: <FiFileText size={18} />, desc: 'Latest school news' },
    { label: 'Events', path: '/events', icon: <FiCalendar size={18} />, desc: 'Upcoming and past events' },
    { label: 'Blog', path: '/blog', icon: <FiEdit3 size={18} />, desc: 'Articles, tips, and resources' },
    { label: 'Virtual Tour', path: '/virtual-tour', icon: <FiVideo size={18} />, desc: 'Explore our campus virtually' },
  ]},
  { section: 'Services', links: [
    { label: 'Contact Us', path: '/contact', icon: <FiPhone size={18} />, desc: 'Get in touch with us' },
    { label: 'Privacy Policy', path: '/privacy-policy', icon: <FiShield size={18} />, desc: 'Our privacy practices' },
    { label: 'Sitemap', path: '/sitemap', icon: <FiMap size={18} />, desc: 'Complete site navigation' },
  ]},
];

export default function SitemapPage() {
  return (
    <>
      <Helmet>
        <title>Sitemap — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Complete sitemap of St. Francis Mat. Hr. School website." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-10 right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Sitemap</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Navigate to any page on our website.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-container">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {siteLinks.map(section => (
              <div key={section.section}>
                <h2 className="text-xl font-display font-bold text-primary mb-6 pb-2 border-b-2 border-secondary/30">{section.section}</h2>
                <ul className="space-y-3">
                  {section.links.map(link => (
                    <li key={link.path}>
                      <Link to={link.path} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
                        <span className="text-primary group-hover:text-secondary transition-colors mt-0.5">{link.icon}</span>
                        <div>
                          <span className="font-body font-semibold text-gray-dark group-hover:text-primary transition-colors">{link.label}</span>
                          <p className="text-xs text-gray-mid font-body">{link.desc}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
