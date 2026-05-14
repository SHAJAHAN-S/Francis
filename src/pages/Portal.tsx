import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiMail, FiEye, FiEyeOff, FiBookOpen, FiDollarSign, FiCalendar, FiClipboard, FiMessageSquare, FiLogOut, FiChevronRight } from 'react-icons/fi';

export default function Portal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'parent@stfrancis.edu.in' && password === 'demo123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Use demo: parent@stfrancis.edu.in / demo123');
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <Helmet><title>Parent Dashboard — ST. Francis Mat. Hr. School</title></Helmet>
        <main>
          <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Welcome, Mr. Rajkumar S.</h1>
                <p className="text-white/60 text-sm font-body">Parent of Arun R. — Class X-A</p>
              </div>
              <button onClick={() => setIsLoggedIn(false)} className="btn border border-white/30 text-white hover:bg-white/10 text-sm">
                <FiLogOut className="mr-1" /> Logout
              </button>
            </div>
          </section>

          <section className="section-container">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Attendance', value: '92%', color: 'from-green-500 to-emerald-600', icon: <FiCalendar /> },
                { label: 'Fees Pending', value: '₹0', color: 'from-blue-500 to-primary', icon: <FiDollarSign /> },
                { label: 'Current Rank', value: '5th', color: 'from-purple-500 to-violet-600', icon: <FiBookOpen /> },
                { label: 'Messages', value: '3 New', color: 'from-orange-500 to-amber-600', icon: <FiMessageSquare /> },
              ].map(s => (
                <div key={s.label} className="card p-6 border border-gray-100">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-3`}>{s.icon}</div>
                  <div className="text-2xl font-display font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-gray-mid font-label uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Dashboard Sections */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Exam Results', desc: 'View quarterly, half-yearly & annual marks', icon: <FiBookOpen size={24} />, items: ['Quarterly: 456/500 (91.2%)', 'Half-Yearly: 468/500 (93.6%)', 'Annual: Pending'] },
                { title: 'Fee History', desc: 'Payment records and receipts', icon: <FiDollarSign size={24} />, items: ['Term 1: ₹24,500 — Paid ✓', 'Term 2: ₹24,500 — Paid ✓', 'Term 3: ₹24,500 — Paid ✓'] },
                { title: 'Attendance Record', desc: 'Monthly attendance details', icon: <FiCalendar size={24} />, items: ['January: 23/24 days', 'February: 20/22 days', 'March: 24/25 days'] },
                { title: 'Homework & Assignments', desc: 'Pending and completed tasks', icon: <FiClipboard size={24} />, items: ['Math: Chapter 12 exercises — Due Tomorrow', 'Science: Lab report — Submitted ✓', 'English: Essay writing — Due Friday'] },
                { title: 'Teacher Messages', desc: 'Communication from class teacher', icon: <FiMessageSquare size={24} />, items: ['Science project submission extended', 'Parent-teacher meeting on May 20', 'Annual day practice starts next week'] },
                { title: 'School Calendar', desc: 'Upcoming events and holidays', icon: <FiCalendar size={24} />, items: ['May 15: Science Exhibition', 'May 20: Parent-Teacher Meeting', 'May 25: Annual Sports Day'] },
              ].map(section => (
                <div key={section.title} className="card p-6 border border-gray-100 hover:border-secondary/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary group-hover:text-secondary transition-colors">{section.icon}</span>
                    <div>
                      <h3 className="font-display font-bold text-primary">{section.title}</h3>
                      <p className="text-xs text-gray-mid font-body">{section.desc}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map(item => (
                      <li key={item} className="text-sm font-body text-gray-dark flex items-start gap-2">
                        <FiChevronRight size={14} className="text-secondary mt-0.5 flex-shrink-0" />{item}
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

  return (
    <>
      <Helmet>
        <title>Parent Portal — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Login to the parent portal to view your child's academic progress, attendance, and fees." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Parent Portal</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Access your child's academic information securely.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-container">
          <div className="max-w-md mx-auto">
            <div className="card p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FiLock size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-primary">Login</h2>
                <p className="text-gray-mid text-sm font-body mt-2">Enter your credentials to access the portal</p>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm mb-6 font-body">{error}</div>}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-label font-medium text-gray-dark mb-2">Email / Username</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-mid" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="parent@stfrancis.edu.in" required
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-label font-medium text-gray-dark mb-2">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-mid" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                      className="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-mid hover:text-primary">
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-full py-3"><FiUser className="mr-2" />Login</button>
              </form>

              <div className="mt-6 p-4 bg-accent rounded-lg">
                <p className="text-xs text-gray-mid font-body text-center">
                  <strong>Demo Credentials:</strong><br />
                  Email: parent@stfrancis.edu.in<br />
                  Password: demo123
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
