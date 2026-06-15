import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCheck, FiChevronDown, FiChevronUp, FiSend } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FAQSchema } from '../components/common/SchemaMarkup';
import type { AdmissionFormData } from '../types';
import emailjs from '@emailjs/browser';

const steps = [
  { num: '01', title: 'Inquiry', desc: 'Fill the online inquiry form or visit the school office.' },
  { num: '02', title: 'Application', desc: 'Collect and submit the application form with required documents.' },
  { num: '03', title: 'Assessment', desc: 'Student appears for an entrance assessment (Class II onwards).' },
  { num: '04', title: 'Interview', desc: 'Parent-student interaction with the Principal.' },
  { num: '05', title: 'Admission', desc: 'Pay fees and complete the enrollment process.' },
];

const docs = ['Birth Certificate', 'Transfer Certificate', 'Report Card (Previous Year)', 'Aadhaar Card (Student & Parent)', '4 Passport-size Photos', 'Community Certificate', 'Medical Fitness Certificate'];

const fees = [
  { cls: 'I – V', admission: '₹5,000', tuition: '₹2,500/month', total: '₹35,000/year' },
  { cls: 'VI – VIII', admission: '₹6,000', tuition: '₹3,000/month', total: '₹42,000/year' },
  { cls: 'IX – X', admission: '₹7,000', tuition: '₹3,500/month', total: '₹49,000/year' },
];

const faqs = [
  { q: 'What is the medium of instruction?', a: 'The medium of instruction is English, with Tamil taught as the first language.' },
  { q: 'Is transport facility available?', a: 'Yes, school buses cover major routes in Tindivanam and surrounding areas.' },
  { q: 'What are the school timings?', a: 'School operates from 8:30 AM to 4:00 PM, Monday to Friday. Saturday: 8:30 AM to 1:00 PM.' },
  { q: 'Are scholarships available?', a: 'Merit-based scholarships are offered to top performers. Financial assistance is available for deserving students.' },
  { q: 'What is the student-teacher ratio?', a: 'We maintain a healthy ratio of approximately 25:1 to ensure individual attention.' },
];

const initial: AdmissionFormData = { studentName: '', dob: '', classApplying: '', parentName: '', mobile: '', email: '', address: '', message: '' };

export default function Admissions() {
  const [form, setForm] = useState<AdmissionFormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof AdmissionFormData, string>>>({});
  const { ref, isVisible } = useScrollAnimation();

  const validate = () => {
    const e: typeof errors = {};
    if (!form.studentName.trim()) e.studentName = 'Required';
    if (!form.dob) e.dob = 'Required';
    if (!form.classApplying) e.classApplying = 'Required';
    if (!form.parentName.trim()) e.parentName = 'Required';
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter 10-digit number';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // EmailJS integration - replace with your service/template/public key
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ADMISSION,
        {
          student_name: form.studentName,
          dob: form.dob,
          class: form.classApplying,
          parent_name: form.parentName,
          mobile: form.mobile,
          email: form.email,
          address: form.address,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ).catch(() => {});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm(initial);
    }
  };

  const update = (field: keyof AdmissionFormData, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  return (
    <>
      <Helmet>
        <title>Admissions — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Admission process, eligibility, fees, and inquiry form for St. Francis School." />
        <meta property="og:title" content="Admissions — St. Francis Mat. Hr. School" />
        <meta property="og:description" content="Admissions Open 2026-27. Apply now for Classes I to XII." />
      </Helmet>
      <FAQSchema faqs={faqs} />
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-secondary/20 rounded-full px-4 py-2 mb-4">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-secondary font-label text-sm font-semibold">ADMISSIONS OPEN 2026-27</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Admissions</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Join our family — begin your child's journey of excellence.</p>
            </motion.div>
          </div>
        </section>

        <div ref={ref} className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Process */}
          <section className="section-container">
            <h2 className="section-heading">Admission Process</h2><div className="gold-line" />
            <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-4 mt-10">
              {steps.map((s, i) => (
                <div key={s.num} className="text-center group">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-xl mb-3 group-hover:bg-secondary transition-colors">{s.num}</div>
                  <h3 className="font-display font-bold text-primary text-sm mb-1">{s.title}</h3>
                  <p className="text-gray-mid text-xs font-body">{s.desc}</p>
                  {i < steps.length - 1 && <div className="hidden md:block w-full h-0.5 bg-gray-200 mt-4" />}
                </div>
              ))}
            </div>
          </section>

          {/* Documents & Eligibility */}
          <section className="py-16 bg-gray-light">
            <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
              <div className="card p-8 border border-gray-100">
                <h3 className="font-display font-bold text-primary text-xl mb-6">Documents Required</h3>
                <ul className="space-y-3">
                  {docs.map((d) => (
                    <li key={d} className="flex items-center gap-3 font-body text-gray-dark text-sm">
                      <FiCheck className="text-success flex-shrink-0" />{d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-8 border border-gray-100">
                <h3 className="font-display font-bold text-primary text-xl mb-6">Eligibility</h3>
                <div className="space-y-4 font-body text-sm text-gray-dark">
                  <div><span className="font-semibold text-primary">Class I:</span> Age 5+ years as of June 1st</div>
                  <div><span className="font-semibold text-primary">Class II–V:</span> Age-appropriate + TC from previous school</div>
                  <div><span className="font-semibold text-primary">Class VI–VIII:</span> Entrance assessment + previous report card</div>
                  <div><span className="font-semibold text-primary">Class IX–X:</span> Entrance exam + interview + strong academic record</div>
                </div>
              </div>
            </div>
          </section>

          {/* Fee Structure */}
          <section id="fees" className="section-container">
            <h2 className="section-heading">Fee Structure</h2><div className="gold-line" />
            <div className="max-w-3xl mx-auto mt-10 overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-primary text-white">
                  <th className="px-6 py-3 text-left font-label text-sm">Class</th>
                  <th className="px-6 py-3 text-left font-label text-sm">Admission Fee</th>
                  <th className="px-6 py-3 text-left font-label text-sm">Tuition Fee</th>
                  <th className="px-6 py-3 text-left font-label text-sm">Total (Approx.)</th>
                </tr></thead>
                <tbody>
                  {fees.map((f, i) => (
                    <tr key={f.cls} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-body font-semibold">{f.cls}</td>
                      <td className="px-6 py-4 font-body">{f.admission}</td>
                      <td className="px-6 py-4 font-body">{f.tuition}</td>
                      <td className="px-6 py-4 font-body font-semibold text-primary">{f.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Inquiry Form */}
          <section className="py-16 bg-gray-light">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="section-heading">Online Inquiry Form</h2><div className="gold-line" />
              {submitted && (
                <div className="bg-success/10 border border-success text-success rounded-lg p-4 text-center mb-6 font-body">
                  ✓ Thank you! Your inquiry has been submitted. We will contact you shortly.
                </div>
              )}
              <form onSubmit={handleSubmit} className="card p-8 mt-8 space-y-6 border border-gray-100">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Student Name *', field: 'studentName' as const, type: 'text' },
                    { label: 'Date of Birth *', field: 'dob' as const, type: 'date' },
                    { label: 'Parent/Guardian Name *', field: 'parentName' as const, type: 'text' },
                    { label: 'Mobile Number *', field: 'mobile' as const, type: 'tel' },
                    { label: 'Email', field: 'email' as const, type: 'email' },
                  ].map(({ label, field, type }) => (
                    <div key={field}>
                      <label className="block text-sm font-label font-medium text-gray-dark mb-2">{label}</label>
                      <input type={type} value={form[field]} onChange={(e) => update(field, e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors[field] ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body transition-colors`} />
                      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-label font-medium text-gray-dark mb-2">Class Applying For *</label>
                    <select value={form.classApplying} onChange={(e) => update('classApplying', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.classApplying ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body transition-colors`}>
                      <option value="">Select Class</option>
                      {['I','II','III','IV','V','VI','VII','VIII','IX','X'].map(c => <option key={c} value={c}>Class {c}</option>)}
                    </select>
                    {errors.classApplying && <p className="text-red-500 text-xs mt-1">{errors.classApplying}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-label font-medium text-gray-dark mb-2">Address</label>
                  <textarea value={form.address} onChange={(e) => update('address', e.target.value)} rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-label font-medium text-gray-dark mb-2">Message</label>
                  <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body transition-colors" />
                </div>
                <button type="submit" className="btn btn-primary w-full py-4"><FiSend className="mr-2" />Submit Inquiry</button>
              </form>
            </div>
          </section>

          {/* FAQs */}
          <section className="section-container">
            <h2 className="section-heading">Frequently Asked Questions</h2><div className="gold-line" />
            <div className="max-w-3xl mx-auto mt-10 space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="card border border-gray-100 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left">
                    <span className="font-body font-semibold text-gray-dark">{faq.q}</span>
                    {openFaq === i ? <FiChevronUp className="text-primary" /> : <FiChevronDown className="text-gray-mid" />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                    <p className="px-6 text-gray-mid font-body text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
