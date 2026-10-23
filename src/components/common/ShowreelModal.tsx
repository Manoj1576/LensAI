import React from 'react';
import { X, Play, Sparkles } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-4xl rounded-lg shadow-luxury-dark overflow-hidden text-cream-100 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-charcoal-950/70 hover:bg-charcoal-950 text-cream-100 rounded-full border border-charcoal-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video simulation / Cinematic Reel */}
        <div className="relative aspect-video bg-charcoal-950 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
            alt="Cinematic Showreel"
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full border border-gold-500/80 bg-charcoal-900/80 backdrop-blur flex items-center justify-center text-gold-400 shadow-gold-glow">
              <Play className="w-7 h-7 fill-gold-500 translate-x-0.5" />
            </div>
            <div>
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-semibold block mb-1">
                LENSCRAFT CINEMATIC SHOWREEL 2026
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-cream-50 uppercase tracking-wide">
                The Art of Curation & Memory
              </h2>
            </div>
            <p className="text-xs text-warmGray-300 max-w-md">
              Witness how top-tier studios across the world cull 10,000+ RAW frames in under 20 minutes without losing the soul of a single shot.
            </p>
          </div>
        </div>

        <div className="p-4 bg-charcoal-900 border-t border-charcoal-800 flex items-center justify-between text-xs text-warmGray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span>Mastered in 4K HDR • 60 FPS • Sony Venice & Hasselblad H6D</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 rounded uppercase tracking-wider text-[11px]"
          >
            Close Showreel
          </button>
        </div>

      </div>
    </div>
  );
};
