import React from 'react';
import { ViewMode } from '../../types';
import { Play, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

interface LandingHeroProps {
  onNavigate: (view: ViewMode) => void;
  onOpenNewProject: () => void;
  onOpenShowreel: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigate,
  onOpenNewProject,
  onOpenShowreel
}) => {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[90vh] bg-charcoal-950 text-cream-100 flex items-center justify-center overflow-hidden">
      
      {/* Cinematic Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="Cinematic Wedding Couple"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-110 transition-transform duration-1000 ease-out"
        />
        {/* Editorial Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/30"></div>
        <div className="absolute inset-0 bg-charcoal-950/20 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Floating Aperture Ambient Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content Container - Proportioned & Max Width */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center flex flex-col items-center">
        
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900/90 border border-gold-500/30 text-gold-400 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-6 backdrop-blur-sm shadow-gold-glow animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>The Photographer's Creative Operating System</span>
        </div>

        {/* Balanced Editorial Serif Headline (Properly proportioned) */}
        <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[1.08] text-cream-50 max-w-3xl drop-shadow-md">
          CAPTURE MOMENTS. <br />
          MANAGE EVERYTHING. <br />
          <span className="text-gold-400 italic font-editorial-display font-normal">LET AI HANDLE THE REST.</span>
        </h1>

        {/* Sub-description */}
        <p className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base text-warmGray-300 max-w-xl font-light leading-relaxed">
          From the first client inquiry to the final gallery, LensCraft AI brings your entire photography workflow into one beautiful workspace.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('workspace')}
            className="w-full sm:w-auto px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold rounded-sm text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>VIEW WORKSPACE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenNewProject}
            className="w-full sm:w-auto px-7 py-3.5 bg-charcoal-900/90 hover:bg-charcoal-850 text-cream-50 border border-charcoal-700 hover:border-gold-500/60 font-semibold rounded-sm text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>NEW PROJECT</span>
          </button>

          <button
            onClick={onOpenShowreel}
            className="w-full sm:w-auto px-5 py-3.5 text-warmGray-300 hover:text-gold-400 font-medium text-xs tracking-[0.18em] uppercase transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-full border border-gold-500/50 flex items-center justify-center group-hover:border-gold-400 group-hover:bg-gold-500/10">
              <Play className="w-2.5 h-2.5 fill-current translate-x-0.5" />
            </div>
            <span>Watch Showreel</span>
          </button>
        </div>

        {/* Live Studio Stats Strip */}
        <div className="mt-10 pt-6 border-t border-charcoal-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center w-full max-w-2xl">
          <div>
            <span className="block font-serif-luxury text-xl sm:text-2xl font-bold text-cream-50">5,000+</span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-warmGray-400">Photos Culled / Hr</span>
          </div>
          <div>
            <span className="block font-serif-luxury text-xl sm:text-2xl font-bold text-cream-50">98.4%</span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-warmGray-400">Blink Accuracy</span>
          </div>
          <div>
            <span className="block font-serif-luxury text-xl sm:text-2xl font-bold text-cream-50">4.5 Hrs</span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-warmGray-400">Saved Per Shoot</span>
          </div>
          <div>
            <span className="block font-serif-luxury text-xl sm:text-2xl font-bold text-cream-50">100%</span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-warmGray-400">Sovereign Control</span>
          </div>
        </div>

      </div>

    </section>
  );
};
