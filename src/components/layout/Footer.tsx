import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Academics', path: '/academics' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const resources = [
    { label: 'Academic Calendar', path: '/academics#curriculum' },
    { label: 'Fee Structure', path: '/admissions#fees' },
    { label: 'Pay Fees Online', path: '/pay-fees' },
    { label: 'News & Updates', path: '/news' },
    { label: 'Blog & Resources', path: '/blog' },
    { label: 'Events', path: '/events' },
    { label: 'Alumni Network', path: '/alumni' },
    { label: 'Virtual Tour', path: '/virtual-tour' },
    { label: 'Parent Portal', path: '/portal' },
  ];

  return (
    <footer className="bg-gray-dark text-gray-300" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <path d="M20 4 L34 11 V25 C34 33 20 38 20 38 S6 33 6 25 V11 Z" fill="none" stroke="#C8922A" strokeWidth="1.5"/>
                  <path d="M20 11 V29 M14 19 H26" stroke="#C8922A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-lg leading-tight">
                  St. Francis
                </h3>
                <p className="text-gray-400 text-xs font-label tracking-wider uppercase">
                  Mat. Hr. School
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Nurturing young minds with a blend of academic excellence, moral values, and holistic development since 1994. Affiliated to Tamil Nadu State Board.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF size={16} />, href: 'https://facebook.com', label: 'Facebook' },
                { icon: <FaYoutube size={16} />, href: 'https://youtube.com', label: 'YouTube' },
                { icon: <FaInstagram size={16} />, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <FaWhatsapp size={16} />, href: 'https://wa.me/914147123456', label: 'WhatsApp' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6 relative">
              {t('footer.quickLinks')}
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-secondary -mb-2"></span>
            </h4>
            <ul className="space-y-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6 relative">
              {t('footer.resources')}
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-secondary -mb-2"></span>
            </h4>
            <ul className="space-y-3 mt-4">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6 relative">
              {t('footer.contactUs')}
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-secondary -mb-2"></span>
            </h4>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-secondary flex-shrink-0 mt-1" size={18} />
                <span className="text-sm text-gray-400">
                  Saram, Tindivanam - 604001,<br />
                  Villupuram District,<br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-secondary flex-shrink-0" size={18} />
                <a href="tel:+914147123456" className="text-sm text-gray-400 hover:text-secondary transition-colors">
                  +91 4147 123456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-secondary flex-shrink-0" size={18} />
                <a href="mailto:info@stfrancissaram.edu.in" className="text-sm text-gray-400 hover:text-secondary transition-colors">
                  info@stfrancissaram.edu.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="text-secondary flex-shrink-0 mt-1" size={18} />
                <span className="text-sm text-gray-400">
                  Mon – Fri: 8:00 AM – 4:00 PM<br />
                  Sat: 8:00 AM – 1:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} St. Francis Mat. Hr. School, Saram. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">{t('footer.privacy')}</Link>
            <Link to="/sitemap" className="hover:text-secondary transition-colors">{t('footer.sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
