import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { FaFacebookF, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { ContactFormData } from '../types';

const contactInfo = [
  { icon: <FiMapPin size={24} />, title: 'Address', content: 'Saram, Tindivanam - 604001,\nVillupuram District, Tamil Nadu, India', color: 'from-blue-500 to-primary' },
  { icon: <FiPhone size={24} />, title: 'Phone', content: '+91 4147 123456\n+91 98765 43210', color: 'from-green-500 to-emerald-600' },
  { icon: <FiMail size={24} />, title: 'Email', content: 'info@stfrancissaram.edu.in\nadmissions@stfrancissaram.edu.in', color: 'from-purple-500 to-violet-600' },
  { icon: <FiClock size={24} />, title: 'Office Hours', content: 'Mon – Fri: 8:00 AM – 4:00 PM\nSat: 8:00 AM – 1:00 PM', color: 'from-orange-500 to-amber-600' },
];

const initial: ContactFormData = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const { ref, isVisible } = useScrollAnimation();

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10-digit number required';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) { setSubmitted(true); setTimeout(() => setSubmitted(false), 4000); setForm(initial); }
  };

  const update = (field: keyof ContactFormData, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Get in touch with St. Francis School, Saram, Tindivanam. Address, phone, email, and contact form." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-10 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Contact Us</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">We'd love to hear from you. Reach out anytime.</p>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Info Cards */}
          <section className="section-container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map(info => (
                <div key={info.title} className="card card-hover-lift p-6 text-center border border-gray-100 hover:border-secondary/30 group">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${info.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <h3 className="font-display font-bold text-primary text-lg mb-2">{info.title}</h3>
                  <p className="text-gray-mid font-body text-sm whitespace-pre-line">{info.content}</p>
                </div>
              ))}
            </div>

            {/* Map + Form */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Map */}
              <div className="card overflow-hidden border border-gray-100">
                <iframe
                  title="School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.5!2d79.65!3d12.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTindivanam!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0, minHeight: '400px' }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Form */}
              <div>
                <h2 className="text-2xl font-display font-bold text-primary mb-6">Send us a Message</h2>
                {submitted && (
                  <div className="bg-success/10 border border-success text-success rounded-lg p-4 text-center mb-6 font-body">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: 'Name *', field: 'name' as const, type: 'text' },
                    { label: 'Email *', field: 'email' as const, type: 'email' },
                    { label: 'Phone *', field: 'phone' as const, type: 'tel' },
                    { label: 'Subject *', field: 'subject' as const, type: 'text' },
                  ].map(({ label, field, type }) => (
                    <div key={field}>
                      <label className="block text-sm font-label font-medium text-gray-dark mb-2">{label}</label>
                      <input type={type} value={form[field]} onChange={(e) => update(field, e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors[field] ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body transition-colors`} />
                      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-label font-medium text-gray-dark mb-2">Message *</label>
                    <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={4}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body transition-colors`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-4"><FiSend className="mr-2" />Send Message</button>
                </form>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="py-16 bg-gray-light">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-display font-bold text-primary mb-6">Connect With Us</h2>
              <div className="flex justify-center gap-4">
                {[
                  { icon: <FaFacebookF size={22} />, href: 'https://facebook.com', label: 'Facebook', bg: 'hover:bg-blue-600' },
                  { icon: <FaYoutube size={22} />, href: 'https://youtube.com', label: 'YouTube', bg: 'hover:bg-red-600' },
                  { icon: <FaInstagram size={22} />, href: 'https://instagram.com', label: 'Instagram', bg: 'hover:bg-pink-600' },
                  { icon: <FaWhatsapp size={22} />, href: 'https://wa.me/914147123456', label: 'WhatsApp', bg: 'hover:bg-green-600' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className={`w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center ${s.bg} transition-all duration-300 hover:scale-110 shadow-lg`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
