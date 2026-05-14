import { useState } from 'react';
import { FaWhatsapp, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FiLink, FiShare2, FiCheck } from 'react-icons/fi';

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = `${title} — St. Francis Mat. Hr. School`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, text: description || '', url: shareUrl });
      } catch { /* user cancelled */ }
    }
  };

  const shares = [
    { label: 'WhatsApp', icon: <FaWhatsapp size={16} />, href: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`, color: 'hover:bg-[#25D366] hover:text-white' },
    { label: 'Facebook', icon: <FaFacebookF size={14} />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'hover:bg-[#1877F2] hover:text-white' },
    { label: 'Twitter', icon: <FaTwitter size={14} />, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, color: 'hover:bg-[#1DA1F2] hover:text-white' },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-label text-gray-mid uppercase tracking-wider mr-1">Share:</span>
      {shares.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`}
          className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-mid transition-all duration-300 ${s.color}`}>
          {s.icon}
        </a>
      ))}
      <button onClick={handleCopy} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-mid hover:bg-primary hover:text-white transition-all duration-300" aria-label="Copy link">
        {copied ? <FiCheck size={14} /> : <FiLink size={14} />}
      </button>
      {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
        <button onClick={handleNativeShare} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-mid hover:bg-secondary hover:text-white transition-all duration-300" aria-label="Share">
          <FiShare2 size={14} />
        </button>
      )}
    </div>
  );
}
