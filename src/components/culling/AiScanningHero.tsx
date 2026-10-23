import React, { useState, useEffect } from 'react';
import { Sparkles, UploadCloud, CheckCircle2, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

interface AiScanningHeroProps {
  onScanComplete: () => void;
}

export const AiScanningHero: React.FC<AiScanningHeroProps> = ({ onScanComplete }) => {
  const [progress, setProgress] = useState(84);
  const [isScanning, setIsScanning] = useState(false);

  const startScanSimulation = () => {
    setIsScanning(true);
    setProgress(15);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          onScanComplete();
          return 100;
        }
        return prev + 17;
      });
    }, 450);
  };

  const steps = [
    { label: 'Face Detection', active: progress > 20, done: progress >= 40 },
    { label: 'Eye Analysis (Blink Check)', active: progress > 40, done: progress >= 60 },
    { label: 'Blur & Sharpness Grading', active: progress > 60, done: progress >= 80 },
    { label: 'Similarity & Burst Clustering', active: progress > 80, done: progress >= 95 },
    { label: 'AI Quality Scoring & Curation', active: progress > 90, done: progress === 100 }
  ];

  return (
    <div className="bg-charcoal-950 text-cream-100 rounded-lg border border-charcoal-800 shadow-luxury-dark p-6 sm:p-10 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900 border border-gold-500/30 text-gold-400 text-[10px] font-semibold tracking-[0.25em] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SIGNATURE AI ENGINE</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-cream-50 leading-tight">
          5,000 FRAMES. <br />
          <span className="text-gold-400 italic font-editorial-display font-normal">ONLY THE BEST REMAIN.</span>
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-warmGray-300 max-w-xl mx-auto leading-relaxed">
          LensCraft AI analyzes your shoot and helps you quickly identify the photographs worth keeping, grouping burst sequences and catching closed eyes in seconds.
        </p>

        {/* Drag & Drop Upload Zone */}
        <div className="mt-8 p-8 sm:p-12 border-2 border-dashed border-charcoal-700 hover:border-gold-500/60 rounded-lg bg-charcoal-900/60 backdrop-blur-sm transition-all duration-300 group flex flex-col items-center justify-center space-y-4 cursor-pointer relative overflow-hidden">
          
          {/* Animated Aperture Scanning Icon */}
          <div className="relative w-20 h-20 rounded-full border border-gold-500/60 flex items-center justify-center bg-charcoal-950 text-gold-400 shadow-gold-glow">
            <svg 
              className={`w-10 h-10 ${isScanning ? 'animate-aperture' : 'group-hover:rotate-45 transition-transform duration-700'}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
              <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
              <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
              <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
              <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
              <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
            </svg>
            {isScanning && (
              <div className="absolute inset-0 rounded-full border-2 border-gold-400 animate-ping opacity-30"></div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cream-50">
              DRAG & DROP YOUR SHOOT HERE
            </p>
            <p className="text-xs text-warmGray-400 mt-1">
              Supports RAW (.CR3, .NEF, .ARW, .DNG) and JPEG collections
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={startScanSimulation}
              disabled={isScanning}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold rounded text-xs uppercase tracking-widest shadow-gold-glow transition-all disabled:opacity-50"
            >
              {isScanning ? 'Analyzing Shoot...' : 'Upload Photos & Run AI'}
            </button>

            <button 
              onClick={onScanComplete}
              className="px-4 py-2.5 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 rounded text-xs uppercase tracking-widest transition-all"
            >
              Load Demo Shoot (5,000 RAW)
            </button>
          </div>
        </div>

        {/* Live Processing Pipeline Indicators */}
        <div className="pt-6 border-t border-charcoal-850 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-warmGray-400 uppercase tracking-widest">
              AI Analysis Progress: <strong className="text-cream-50">5,000 Photos</strong>
            </span>
            <span className="font-mono text-gold-400 font-bold">{progress}% Completed</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-charcoal-800 rounded-full h-2 overflow-hidden border border-charcoal-700">
            <div 
              className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* 5 AI Detection Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {steps.map((st, i) => (
              <div 
                key={i}
                className={`p-2.5 rounded border text-left text-[11px] flex items-center gap-2 ${
                  st.done
                    ? 'bg-charcoal-900 border-gold-500/40 text-gold-400'
                    : st.active
                    ? 'bg-charcoal-850 border-gold-500 text-cream-50 animate-pulse'
                    : 'bg-charcoal-900/40 border-charcoal-800 text-warmGray-500'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${st.done ? 'text-gold-400' : 'text-warmGray-600'}`} />
                <span className="leading-tight">{st.label}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-warmGray-400 flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI never auto-deletes photos. The photographer always makes the final call.</span>
          </p>
        </div>

      </div>

    </div>
  );
};
