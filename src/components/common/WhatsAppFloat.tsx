import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    return () => { clearTimeout(timer); clearTimeout(tooltipTimer); };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showTooltip && (
        <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-[260px] animate-fade-in border border-gray-100">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
            aria-label="Close tooltip"
          >
            <FiX size={12} />
          </button>
          <p className="text-sm font-body text-gray-dark">
            👋 <strong>Hi there!</strong> Have questions about admissions? Chat with us on WhatsApp!
          </p>
        </div>
      )}
      <a
        href="https://wa.me/914147123456?text=Hi%2C%20I'd%20like%20to%20know%20about%20admissions%20at%20St.%20Francis%20School"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 relative"
      >
        <FaWhatsapp size={32} className="text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
      </a>
    </div>
  );
}
