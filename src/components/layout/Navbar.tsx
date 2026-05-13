import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiMail, FiChevronDown } from 'react-icons/fi';
import { FaFacebookF, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import type { NavLink } from '../../types';

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    path: '/about',
    children: [
      { label: 'Vision & Mission', path: '/about#vision' },
      { label: "Principal's Desk", path: '/about#principal' },
      { label: 'History', path: '/about#history' },
      { label: 'Infrastructure', path: '/about#infrastructure' },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    children: [
      { label: 'Primary (I–V)', path: '/academics#primary' },
      { label: 'Middle (VI–VIII)', path: '/academics#middle' },
      { label: 'High School (IX–X)', path: '/academics#high' },
      { label: 'Curriculum', path: '/academics#curriculum' },
    ],
  },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'News', path: '/news' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('#')[0]);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
          <div className="flex items-center gap-6">
            <a href="tel:+914147123456" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <FiPhone size={14} />
              <span>+91 4147 123456</span>
            </a>
            <a href="mailto:info@stfrancissaram.edu.in" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <FiMail size={14} />
              <span>info@stfrancissaram.edu.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-secondary transition-colors"><FaFacebookF size={14} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-secondary transition-colors"><FaYoutube size={14} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-secondary transition-colors"><FaInstagram size={14} /></a>
            <a href="https://wa.me/914147123456" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-secondary transition-colors"><FaWhatsapp size={14} /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`bg-white transition-all duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Home">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <path d="M20 4 L34 11 V25 C34 33 20 38 20 38 S6 33 6 25 V11 Z" fill="none" stroke="#C8922A" strokeWidth="1.5"/>
                  <path d="M20 11 V29 M14 19 H26" stroke="#C8922A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-primary font-display font-bold text-lg leading-tight">
                  St. Francis Mat. Hr. School
                </h1>
                <p className="text-gray-mid text-xs font-label tracking-wider uppercase">
                  Saram, Tindivanam
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`px-3 py-2 font-label text-sm font-medium tracking-wide transition-colors relative group flex items-center gap-1 ${
                      isActive(link.path)
                        ? 'text-primary'
                        : 'text-gray-dark hover:text-primary'
                    }`}
                  >
                    {link.label}
                    {link.children && <FiChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-0.5 bg-secondary transition-transform origin-left ${
                        isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm text-gray-dark hover:bg-accent hover:text-primary transition-colors font-body"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-dark hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[600px] border-t border-gray-100' : 'max-h-0'
          }`}
        >
          <div className="px-4 py-4 space-y-1 bg-white">
            {navLinks.map((link) => (
              <div key={link.label}>
                <div className="flex items-center">
                  <Link
                    to={link.path}
                    className={`flex-1 px-4 py-3 rounded-lg font-label text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-accent text-primary'
                        : 'text-gray-dark hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                      className="p-3 text-gray-mid hover:text-primary"
                      aria-label={`Expand ${link.label} submenu`}
                    >
                      <FiChevronDown className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {link.children && activeDropdown === link.label && (
                  <div className="ml-4 pl-4 border-l-2 border-secondary/30 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        className="block px-4 py-2 text-sm text-gray-mid hover:text-primary transition-colors font-body"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile Contact Info */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <a href="tel:+914147123456" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-mid">
                <FiPhone size={16} /> +91 4147 123456
              </a>
              <a href="mailto:info@stfrancissaram.edu.in" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-mid">
                <FiMail size={16} /> info@stfrancissaram.edu.in
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
