import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Privacy policy for St. Francis Matriculation Higher Secondary School website." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Privacy Policy</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">How we collect, use, and protect your information.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-container">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8 font-body text-gray-dark leading-relaxed">
              <div className="card p-8 border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">1. Information We Collect</h2>
                <p>When you use our website, we may collect the following information:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3 text-sm">
                  <li><strong>Personal Information:</strong> Name, email, phone number, address — when voluntarily submitted through forms.</li>
                  <li><strong>Student Information:</strong> Date of birth, class applied for — through admission inquiry forms.</li>
                  <li><strong>Usage Data:</strong> Browser type, pages visited, time spent — collected anonymously for analytics.</li>
                </ul>
              </div>

              <div className="card p-8 border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>To respond to admission inquiries and contact form submissions</li>
                  <li>To process fee payments securely</li>
                  <li>To send important school notifications and updates</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div className="card p-8 border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">3. Data Protection</h2>
                <p className="text-sm">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction. Student data is handled with strict confidentiality in accordance with educational data protection standards.</p>
              </div>

              <div className="card p-8 border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">4. Cookies</h2>
                <p className="text-sm">Our website uses cookies to improve user experience, remember language preferences, and analyze website traffic. You can control cookie settings through your browser preferences.</p>
              </div>

              <div className="card p-8 border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">5. Third-Party Services</h2>
                <p className="text-sm">We may use third-party services such as Google Analytics for website analytics, EmailJS for form processing, and payment gateways for fee collection. These services have their own privacy policies governing data usage.</p>
              </div>

              <div className="card p-8 border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">6. Your Rights</h2>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Request access to your personal data</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Opt out of communications</li>
                </ul>
              </div>

              <div className="card p-8 border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">7. Contact Us</h2>
                <p className="text-sm">For privacy-related inquiries, contact us at:</p>
                <p className="text-sm mt-2">
                  <strong>Email:</strong> info@stfrancissaram.edu.in<br />
                  <strong>Phone:</strong> +91 4147 123456<br />
                  <strong>Address:</strong> Saram, Tindivanam - 604001, Villupuram District, Tamil Nadu
                </p>
              </div>

              <p className="text-sm text-gray-mid text-center">Last updated: May 2026</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
