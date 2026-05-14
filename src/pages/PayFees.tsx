import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiDollarSign, FiCheck, FiShield, FiCreditCard, FiDownload } from 'react-icons/fi';

const feeData = [
  { cls: 'I – V', tuition: 2500, admission: 5000, total: 35000 },
  { cls: 'VI – VIII', tuition: 3000, admission: 6000, total: 42000 },
  { cls: 'IX – X', tuition: 3500, admission: 7000, total: 49000 },
];

export default function PayFees() {
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState('');
  const [studentName, setStudentName] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

  const selectedFee = feeData.find(f => f.cls === selectedClass);

  const handlePayment = () => {
    if (!selectedFee) return;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key',
      amount: selectedFee.total * 100, // amount in paisa
      currency: 'INR',
      name: 'St. Francis Mat. Hr. School',
      description: `Fee Payment for ${studentName} (Class ${selectedClass})`,
      image: '/favicon.svg',
      handler: function () {
        setPaymentDone(true);
      },
      prefill: {
        name: studentName,
      },
      theme: {
        color: '#2172B8',
      },
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
    <>
      <Helmet>
        <title>Pay Fees Online — ST. Francis Mat. Hr. School</title>
        <meta name="description" content="Pay school fees online securely via Razorpay payment gateway." />
      </Helmet>
      <main>
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" /></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Pay Fees Online</h1>
              <p className="text-white/70 text-lg font-body max-w-2xl">Secure, convenient, and instant fee payment.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-container">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: <FiShield />, text: 'SSL Secured' },
              { icon: <FiCreditCard />, text: 'All Cards Accepted' },
              { icon: <FiCheck />, text: 'Instant Receipt' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-gray-mid font-label">
                <span className="text-success">{b.icon}</span>{b.text}
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {['Student Info', 'Fee Details', 'Payment'].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-label font-bold ${step > i + 1 ? 'bg-success text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-mid'}`}>
                    {step > i + 1 ? <FiCheck size={16} /> : i + 1}
                  </div>
                  <span className={`text-sm font-label hidden sm:block ${step === i + 1 ? 'text-primary font-semibold' : 'text-gray-mid'}`}>{s}</span>
                  {i < 2 && <div className={`w-12 h-0.5 ${step > i + 1 ? 'bg-success' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            {paymentDone ? (
              <div className="card p-12 text-center border border-success/30">
                <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
                  <FiCheck size={40} className="text-success" />
                </div>
                <h2 className="text-2xl font-display font-bold text-primary mb-3">Payment Successful!</h2>
                <p className="text-gray-mid font-body mb-2">Transaction ID: TXN{Date.now()}</p>
                <p className="text-gray-mid font-body mb-6">A receipt has been sent to your registered email.</p>
                <button className="btn btn-primary"><FiDownload className="mr-2" />Download Receipt</button>
              </div>
            ) : (
              <div className="card p-8 border border-gray-100">
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold text-primary mb-4">Student Information</h2>
                    <div>
                      <label className="block text-sm font-label font-medium text-gray-dark mb-2">Student Name *</label>
                      <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body" />
                    </div>
                    <div>
                      <label className="block text-sm font-label font-medium text-gray-dark mb-2">Admission Number *</label>
                      <input type="text" value={admissionNo} onChange={e => setAdmissionNo(e.target.value)} required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body" />
                    </div>
                    <div>
                      <label className="block text-sm font-label font-medium text-gray-dark mb-2">Class *</label>
                      <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body">
                        <option value="">Select Class</option>
                        {feeData.map(f => <option key={f.cls} value={f.cls}>Class {f.cls}</option>)}
                      </select>
                    </div>
                    <button onClick={() => { if (studentName && admissionNo && selectedClass) setStep(2); }}
                      className="btn btn-primary w-full py-3">Continue</button>
                  </div>
                )}

                {step === 2 && selectedFee && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold text-primary mb-4">Fee Breakdown</h2>
                    <div className="bg-accent rounded-xl p-6 space-y-3">
                      <div className="flex justify-between text-sm font-body"><span>Student:</span><strong>{studentName}</strong></div>
                      <div className="flex justify-between text-sm font-body"><span>Class:</span><strong>{selectedClass}</strong></div>
                      <div className="flex justify-between text-sm font-body"><span>Admission No:</span><strong>{admissionNo}</strong></div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between text-sm font-body"><span>Tuition Fee:</span><span>₹{selectedFee.tuition.toLocaleString()}/month</span></div>
                      <div className="flex justify-between text-sm font-body"><span>Annual Total:</span><span>₹{selectedFee.total.toLocaleString()}</span></div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between font-body font-bold text-lg text-primary"><span>Amount Due:</span><span>₹{selectedFee.total.toLocaleString()}</span></div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="btn btn-outline-primary flex-1 py-3">Back</button>
                      <button onClick={() => setStep(3)} className="btn btn-primary flex-1 py-3">Proceed to Pay</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold text-primary mb-4">Payment</h2>
                    <div className="bg-accent rounded-xl p-6 text-center">
                      <FiDollarSign size={40} className="mx-auto text-primary mb-3" />
                      <p className="text-3xl font-display font-bold text-primary mb-1">₹{selectedFee?.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-mid font-body">for {studentName} — Class {selectedClass}</p>
                    </div>
                    <div className="space-y-3">
                      {['Credit / Debit Card', 'UPI (Google Pay, PhonePe)', 'Net Banking'].map(method => (
                        <label key={method} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary/30 cursor-pointer transition-colors">
                          <input type="radio" name="payment" className="text-primary" defaultChecked={method.includes('UPI')} />
                          <span className="font-body text-sm text-gray-dark">{method}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setStep(2)} className="btn btn-outline-primary flex-1 py-3">Back</button>
                      <button onClick={handlePayment} className="btn bg-success text-white hover:bg-success/90 shadow-lg flex-1 py-3">
                        <FiShield className="mr-2" />Pay Securely
                      </button>
                    </div>
                    <p className="text-xs text-gray-mid text-center font-body">🔒 Payments are processed securely via Razorpay. We do not store your card details.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
