import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    { label: 'News & Updates', path: '/news' },
    { label: 'Blog & Resources', path: '/blog' },
    { label: 'Events', path: '/events' },
    { label: 'Alumni Network', path: '/alumni' },
    { label: 'Virtual Tour', path: '/virtual-tour' },
  ];

  return (
    <footer className="bg-gray-dark text-gray-300" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src="/logo.png" alt="St. Francis Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-success font-display font-bold text-lg leading-tight">
                  St. Francis Matric
                </h3>
                <p className="text-primary text-xs font-label tracking-wider uppercase font-bold">
                  Higher Secondary School
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
              Quick Links
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
              Resources
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
              Contact Us
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
            © {currentYear} St. Francis Mat. Hr. School, Saram. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/sitemap" className="hover:text-secondary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
