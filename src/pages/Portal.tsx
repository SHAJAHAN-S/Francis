import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiLock, FiUser, FiBookOpen, FiDollarSign, FiCalendar, FiClipboard, FiMessageSquare, FiLogOut, FiChevronRight } from 'react-icons/fi';

export default function Portal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        <section className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
          {/* Header Area from Screenshot */}
          <div className="bg-white p-4 shadow-sm mb-6 max-w-md w-full flex items-center gap-4 border-b-4 border-primary">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
            <div>
              <h2 className="text-[#2A8C4A] font-display font-bold text-sm leading-tight uppercase">
                St. Francis Matric Hr. Sec. School
              </h2>
              <p className="text-primary text-[10px] font-label font-bold uppercase">
                Assisi Nagar, Saram, Tindivanam TK, 604 307
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-display font-bold text-gray-700 mb-8 text-center">
            St. Francis Matric Higher Secondary School
          </h1>

          <div className="max-w-md w-full">
            <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-gray-200">
              <div className="p-8">
                <p className="text-center text-gray-500 text-sm font-label uppercase tracking-wider mb-8">
                  Sign in to PARENT PORTAL
                </p>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm mb-6 font-body flex items-center gap-2">
                  <span className="text-lg">⚠</span> {error}
                </div>}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="relative">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="User ID" required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-primary outline-none font-body pr-10" />
                    <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  
                  <div className="relative">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-primary outline-none font-body pr-10" />
                    <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="w-4 h-4 text-primary rounded border-gray-300" defaultChecked />
                    <label htmlFor="remember" className="text-sm text-gray-600 font-body">Remember me</label>
                    <button type="submit" className="ml-auto bg-[#4691B1] hover:bg-[#3a7a96] text-white px-8 py-2 font-body transition-colors">
                      Sign In
                    </button>
                  </div>
                </form>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="text-red-600/80 text-xs italic font-body flex items-start gap-1">
                    <span className="font-bold">⚠</span>
                    <span>No activity for long duration, Session expired, Please re-login!</span>
                  </div>

                  <button className="flex items-center gap-3 w-full bg-[#D84C34] hover:bg-[#c1422c] text-white px-4 py-3 text-sm font-body transition-colors">
                    <FiLock size={18} className="rotate-90" />
                    <span>I forgot my password</span>
                  </button>

                  <button className="flex items-center gap-3 w-full bg-[#2B5292] hover:bg-[#234377] text-white px-4 py-3 text-sm font-body transition-colors">
                    <FiLogOut size={18} className="rotate-180" />
                    <span>Request a new Login</span>
                  </button>

                  <div className="relative flex items-center justify-center py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <span className="relative px-4 bg-white text-gray-400 text-xs font-label">- OR -</span>
                  </div>

                  <button className="flex items-center gap-3 w-full bg-[#34495E] hover:bg-[#2c3e50] text-white px-4 py-3 text-sm font-body transition-colors">
                    <FiUser size={18} />
                    <span>Staff Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
