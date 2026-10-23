import React from 'react';
import { ViewMode } from '../../types';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface CtaBandProps {
  onNavigate: (view: ViewMode) => void;
  onOpenNewProject: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  onNavigate,
  onOpenNewProject
}) => {
  return (
    <section className="bg-cream-50 py-20 sm:py-24 border-b border-warmGray-300 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Calendar Icon Badge */}
        <div className="w-16 h-16 rounded-full border border-warmGray-400 bg-cream-100 flex items-center justify-center text-charcoal-900 mb-6 shadow-sm">
          <Calendar className="w-7 h-7 stroke-[1.4]" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-3">
          SEASON 2026 / 2027 BOOKINGS OPEN
        </span>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-charcoal-950 font-bold uppercase tracking-tight leading-tight">
          Let’s Create Something <br />
          <span className="italic font-editorial-display font-normal text-gold-700">Beautiful Together.</span>
        </h2>

        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-charcoal-700 max-w-xl leading-relaxed">
          Whether you’re planning a royal wedding, documenting high-fashion editorial, or scaling your luxury studio, LensCraft AI is built for you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenNewProject}
            className="w-full sm:w-auto px-8 py-3.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-luxury flex items-center justify-center gap-2 group"
          >
            <span>Book a Session</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('workspace')}
            className="w-full sm:w-auto px-8 py-3.5 bg-cream-200 hover:bg-cream-300 text-charcoal-900 border border-warmGray-400 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            <span>Enter Studio Workspace</span>
          </button>
        </div>

      </div>
    </section>
  );
};
