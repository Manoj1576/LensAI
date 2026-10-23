import React from 'react';
import { ViewMode } from '../../types';
import { Sparkles, Clock, CheckCircle2, ArrowRight, Image as ImageIcon, Download, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AiCullingSummaryProps {
  onNavigate: (view: ViewMode) => void;
  onReviewSelection: () => void;
}

export const AiCullingSummary: React.FC<AiCullingSummaryProps> = ({
  onNavigate,
  onReviewSelection
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#B08A55', '#1A1714', '#F5F0E6']
    });
  };

  return (
    <div className="bg-cream-50 rounded-lg p-8 sm:p-14 border border-warmGray-300 space-y-12 max-w-5xl mx-auto shadow-luxury">
      
      {/* Top Heading */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold block">
          CURATION COMPLETE
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold uppercase tracking-tight text-charcoal-950">
          Your Shoot, Curated.
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-700 max-w-lg mx-auto">
          Rahul & Priya Heritage Wedding collection is culled and ready for signature color grading & client gallery creation.
        </p>
      </div>

      {/* 4 Large Editorial Stat Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-warmGray-300 py-10">
        <div>
          <span className="font-serif-luxury text-4xl sm:text-6xl font-bold text-charcoal-950 block">
            5,000
          </span>
          <span className="text-xs uppercase tracking-widest text-warmGray-500 font-medium block mt-1">
            Photos Analyzed
          </span>
        </div>

        <div>
          <span className="font-serif-luxury text-4xl sm:text-6xl font-bold text-emerald-800 block">
            3,842
          </span>
          <span className="text-xs uppercase tracking-widest text-emerald-700 font-medium block mt-1">
            Recommended Keep
          </span>
        </div>

        <div>
          <span className="font-serif-luxury text-4xl sm:text-6xl font-bold text-amber-800 block">
            718
          </span>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-medium block mt-1">
            Need Review
          </span>
        </div>

        <div>
          <span className="font-serif-luxury text-4xl sm:text-6xl font-bold text-rose-800 block">
            440
          </span>
          <span className="text-xs uppercase tracking-widest text-rose-700 font-medium block mt-1">
            Rejected
          </span>
        </div>
      </div>

      {/* Estimated Time Saved Highlight Banner */}
      <div className="bg-charcoal-950 text-cream-100 rounded-lg p-6 sm:p-8 border border-gold-500 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury-dark">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center text-gold-400 shrink-0 shadow-gold-glow">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold block">
              STUDIO PRODUCTIVITY ROI
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase text-cream-50">
              Estimated Time Saved: 4 Hours 32 Minutes
            </h3>
            <p className="text-xs text-warmGray-300 mt-0.5">
              Equivalent to ₹18,500 in assistant culling labor costs saved for this single shoot.
            </p>
          </div>
        </div>

        <button
          onClick={triggerConfetti}
          className="px-4 py-2 bg-charcoal-900 hover:bg-charcoal-850 text-gold-400 border border-gold-500/50 rounded text-xs uppercase tracking-widest transition-colors shrink-0"
        >
          Celebrate Milestone 🎉
        </button>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onReviewSelection}
          className="w-full sm:w-auto px-8 py-4 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-luxury flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <span>REVIEW SELECTION →</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onNavigate('galleries')}
          className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-gold-glow flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <ImageIcon className="w-4 h-4" />
          <span>CREATE CLIENT GALLERY</span>
        </button>

        <button
          onClick={() => {
            alert('Lightroom / Capture One .XMP Sidecar collection generated successfully with Keep/Reject flags!');
          }}
          className="w-full sm:w-auto px-6 py-4 bg-cream-200 hover:bg-cream-300 text-charcoal-900 border border-warmGray-400 rounded text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export XMP Sidecars</span>
        </button>
      </div>

    </div>
  );
};
