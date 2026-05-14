import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const shortcuts: Record<string, string> = {
  'g+h': '/',
  'g+a': '/about',
  'g+c': '/academics',
  'g+d': '/admissions',
  'g+f': '/faculty',
  'g+g': '/gallery',
  'g+n': '/news',
  'g+e': '/events',
  'g+t': '/contact',
  'g+l': '/alumni',
  'g+b': '/blog',
  'g+p': '/portal',
};

export function useHotkeys() {
  const navigate = useNavigate();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger in inputs/textareas
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key === '?') {
      e.preventDefault();
      const modal = document.getElementById('keyboard-shortcuts-modal');
      if (modal) modal.classList.toggle('hidden');
      return;
    }

    // Handle 'g+x' shortcuts
    if (e.key === 'g') {
      const handler = (e2: KeyboardEvent) => {
        const combo = `g+${e2.key}`;
        if (shortcuts[combo]) {
          e2.preventDefault();
          navigate(shortcuts[combo]);
        }
        window.removeEventListener('keydown', handler);
      };
      window.addEventListener('keydown', handler);
      setTimeout(() => window.removeEventListener('keydown', handler), 1000);
    }

    // Escape to close modals
    if (e.key === 'Escape') {
      const modal = document.getElementById('keyboard-shortcuts-modal');
      if (modal && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
      }
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function KeyboardShortcutsModal() {
  const entries = Object.entries(shortcuts);
  return (
    <div id="keyboard-shortcuts-modal" className="hidden fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) (e.target as HTMLElement).classList.add('hidden'); }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-up">
        <h2 className="text-xl font-display font-bold text-primary mb-6">⌨️ Keyboard Shortcuts</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-body text-gray-dark">Show shortcuts</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-dark">?</kbd>
          </div>
          {entries.map(([key, path]) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm font-body text-gray-dark">{path === '/' ? 'Home' : path.slice(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-dark">{key}</kbd>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-mid mt-4 font-body">Press <kbd className="px-1 bg-gray-100 rounded font-mono">Esc</kbd> to close</p>
      </div>
    </div>
  );
}
