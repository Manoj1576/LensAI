import React from 'react';
import { X, Keyboard, Sparkles } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'K', desc: 'Mark current photo as KEEP (Green)' },
    { key: 'R', desc: 'Mark current photo for REVIEW (Amber)' },
    { key: 'J / F', desc: 'Mark current photo as REJECT (Muted)' },
    { key: '← / →', desc: 'Navigate previous / next frame' },
    { key: 'Space', desc: 'Open full-screen AI deep inspection' },
    { key: 'B', desc: 'Open Burst / Similar Frames compare' },
    { key: 'F', desc: 'Toggle Favorite heart badge' },
    { key: 'Esc', desc: 'Close inspector or active modal' },
    { key: '⌘ + K', desc: 'Open Global Studio Search' },
    { key: '?', desc: 'Show this keyboard reference guide' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-lg rounded-lg shadow-luxury-dark overflow-hidden text-cream-100">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-semibold text-cream-50 uppercase tracking-wider">
                Photographer Hotkeys
              </h3>
              <p className="text-[10px] text-warmGray-400">High-speed AI culling & navigation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-warmGray-400 hover:text-cream-50 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <div className="grid grid-cols-1 gap-2.5">
            {shortcuts.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2.5 bg-charcoal-850 rounded border border-charcoal-800"
              >
                <span className="text-xs text-warmGray-300">{item.desc}</span>
                <kbd className="px-2.5 py-1 bg-charcoal-950 text-gold-400 border border-charcoal-700 rounded text-xs font-mono font-bold shadow-inner">
                  {item.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gold-500/10 border border-gold-500/20 rounded flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-warmGray-300 leading-relaxed">
              <strong className="text-gold-400">Non-Destructive Guarantee:</strong> LensCraft AI will never delete your original RAW files. All culling flags export directly as XMP sidecars or curated selection albums.
            </p>
          </div>
        </div>

        <div className="px-6 py-3 bg-charcoal-950 border-t border-charcoal-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-charcoal-800 hover:bg-charcoal-750 text-cream-100 text-xs uppercase tracking-wider rounded transition-colors"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
