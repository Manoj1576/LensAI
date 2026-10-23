import React, { useEffect, useState } from 'react';
import { AiCullingPhoto } from '../../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Eye, 
  Focus, 
  Layers, 
  ShieldCheck,
  Scan,
  AlertTriangle,
  Heart,
  Sliders
} from 'lucide-react';

interface AiPhotoInspectorModalProps {
  photo: AiCullingPhoto | null;
  allPhotos: AiCullingPhoto[];
  onClose: () => void;
  onUpdateDecision: (photoId: string, decision: 'KEEP' | 'REVIEW' | 'REJECT') => void;
  onSelectPhoto: (photo: AiCullingPhoto) => void;
}

export const AiPhotoInspectorModal: React.FC<AiPhotoInspectorModalProps> = ({
  photo,
  allPhotos,
  onClose,
  onUpdateDecision,
  onSelectPhoto
}) => {
  const [showAiBoxes, setShowAiBoxes] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key.toLowerCase() === 'k') onUpdateDecision(photo.id, 'KEEP');
      if (e.key.toLowerCase() === 'f') onUpdateDecision(photo.id, 'REVIEW');
      if (e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 'j') onUpdateDecision(photo.id, 'REJECT');

      const currentIndex = allPhotos.findIndex(p => p.id === photo.id);
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectPhoto(allPhotos[currentIndex - 1]);
      }
      if (e.key === 'ArrowRight' && currentIndex < allPhotos.length - 1) {
        onSelectPhoto(allPhotos[currentIndex + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, allPhotos, onClose, onUpdateDecision, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex(p => p.id === photo.id);
  const currentDecision = photo.photographerDecision || photo.aiRecommendation;

  const navigatePrev = () => {
    if (currentIndex > 0) onSelectPhoto(allPhotos[currentIndex - 1]);
  };

  const navigateNext = () => {
    if (currentIndex < allPhotos.length - 1) onSelectPhoto(allPhotos[currentIndex + 1]);
  };

  const isClosedEyes = photo.eyesStatus === 'Closed' || photo.tags.includes('Closed Eyes');
  const isBlurry = photo.sharpnessScore < 60 || photo.isBlurry;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-charcoal-950/95 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-7xl h-[94vh] rounded-lg shadow-luxury-dark overflow-hidden text-cream-100 flex flex-col">
        
        {/* Top Minimal Inspector Bar */}
        <div className="px-6 py-3 border-b border-charcoal-800 bg-charcoal-950 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-gold-400 font-bold">
              {photo.filename}
            </span>
            <span className="text-xs text-warmGray-400 font-mono hidden sm:inline">
              Frame {currentIndex + 1} of {allPhotos.length}
            </span>
            <span className="text-xs text-warmGray-500 font-mono hidden md:inline">
              {photo.resolution} • ISO {photo.iso} • {photo.shutter} • {photo.aperture} • {photo.focalLength}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAiBoxes(!showAiBoxes)}
              className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors border ${
                showAiBoxes
                  ? 'bg-gold-500/20 text-gold-400 border-gold-500/40'
                  : 'bg-charcoal-850 text-warmGray-400 border-charcoal-700 hover:text-cream-50'
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>AI Face Bounding Box</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-warmGray-400 hover:text-cream-50 rounded-full hover:bg-charcoal-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split Content: Left Large Image / Right AI Breakdown */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Left: Cinematic High-Res Photo View + Bottom Filmstrip */}
          <div className="lg:col-span-8 bg-charcoal-950 relative flex flex-col justify-between p-4 overflow-hidden">
            
            {/* Prev Button */}
            <button
              onClick={navigatePrev}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-charcoal-900/80 hover:bg-charcoal-900 text-cream-50 border border-charcoal-700 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Photo & AI Overlays */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
              <img
                src={photo.url}
                alt={photo.filename}
                className="max-h-[62vh] max-w-full object-contain rounded shadow-2xl"
              />

              {/* Simulated Face & Eye Detection Box Overlay */}
              {showAiBoxes && (
                <div className="absolute top-[20%] left-[40%] w-[26%] h-[34%] border-2 border-dashed border-gold-400 bg-gold-400/10 rounded pointer-events-none animate-fadeIn">
                  <div className="absolute -top-6 left-0 bg-charcoal-950/90 border border-gold-500 px-2 py-0.5 rounded text-[9px] font-mono text-gold-400 uppercase tracking-widest flex items-center gap-1 shadow-md">
                    <Focus className="w-2.5 h-2.5" />
                    <span>Primary Subject (Sharp: {photo.sharpnessScore}%)</span>
                  </div>
                  {/* Eye Detection Points */}
                  <div className={`absolute top-[32%] left-[28%] w-3.5 h-3.5 rounded-full border ${
                    isClosedEyes ? 'border-rose-400 bg-rose-400/40' : 'border-emerald-400 bg-emerald-400/30'
                  }`}></div>
                  <div className={`absolute top-[32%] right-[28%] w-3.5 h-3.5 rounded-full border ${
                    isClosedEyes ? 'border-rose-400 bg-rose-400/40' : 'border-emerald-400 bg-emerald-400/30'
                  }`}></div>
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={navigateNext}
              disabled={currentIndex === allPhotos.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-charcoal-900/80 hover:bg-charcoal-900 text-cream-50 border border-charcoal-700 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Filmstrip */}
            <div className="pt-3 border-t border-charcoal-850 flex items-center gap-2 overflow-x-auto px-2">
              {allPhotos.map((p) => {
                const isSelected = p.id === photo.id;
                const dec = p.photographerDecision || p.aiRecommendation;

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectPhoto(p)}
                    className={`relative w-14 h-14 rounded overflow-hidden shrink-0 cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-gold-500 border border-gold-400 scale-105'
                        : 'opacity-60 hover:opacity-100 border border-charcoal-800'
                    }`}
                  >
                    <img src={p.thumbnailUrl} alt={p.filename} className="w-full h-full object-cover" />
                    <span className={`absolute bottom-0 left-0 right-0 h-1 ${
                      dec === 'KEEP' ? 'bg-emerald-500' : dec === 'REVIEW' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}></span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: AI Analysis Panel (Editorial) */}
          <div className="lg:col-span-4 bg-charcoal-900 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-l border-charcoal-800 space-y-6">
            
            <div className="space-y-6">
              
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold block mb-1">
                  DEEP NEURAL INSPECTION
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase text-cream-50">
                  AI Analysis
                </h3>
              </div>

              {/* Warnings / Flags */}
              {isClosedEyes && (
                <div className="p-3.5 bg-rose-950/70 border border-rose-500/50 rounded flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider block">
                      AI FLAG: EYES APPEAR CLOSED
                    </span>
                    <p className="text-xs text-rose-200 mt-0.5">
                      Confidence: {photo.eyeClosedConfidence || 96}% • Recommendation: REVIEW
                    </p>
                  </div>
                </div>
              )}

              {isBlurry && (
                <div className="p-3.5 bg-amber-950/70 border border-amber-500/50 rounded flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                      SHARPNESS: {photo.sharpnessScore} / 100 — BLUR DETECTED
                    </span>
                    <p className="text-xs text-amber-200 mt-0.5">
                      Image may be out of focus due to camera motion.
                    </p>
                  </div>
                </div>
              )}

              {/* 5 AI Metrics */}
              <div className="space-y-3.5 border-y border-charcoal-800 py-4 text-xs">
                
                {/* Face Detection */}
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-400 uppercase tracking-wider">Face</span>
                  <strong className="text-cream-50 font-mono">{photo.faceCount} Detected</strong>
                </div>

                {/* Eyes Status */}
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-400 uppercase tracking-wider">Eyes</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    photo.eyesStatus === 'Open' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                  }`}>
                    {photo.eyesStatus}
                  </span>
                </div>

                {/* Sharpness Score */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-warmGray-400 uppercase tracking-wider">Sharpness</span>
                    <strong className="text-cream-50 font-mono">{photo.sharpnessScore} / 100</strong>
                  </div>
                  <div className="w-full bg-charcoal-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${photo.sharpnessScore > 85 ? 'bg-emerald-400' : photo.sharpnessScore > 60 ? 'bg-amber-400' : 'bg-rose-400'}`}
                      style={{ width: `${photo.sharpnessScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Duplicate Risk */}
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-400 uppercase tracking-wider">Duplicate Risk</span>
                  <strong className="text-cream-50 font-mono">{photo.duplicateRisk}%</strong>
                </div>

                {/* Quality Score */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-warmGray-400 uppercase tracking-wider">Quality Score</span>
                    <strong className="text-gold-400 font-mono font-bold">{photo.qualityScore} / 100</strong>
                  </div>
                  <div className="w-full bg-charcoal-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gold-500 h-full rounded-full"
                      style={{ width: `${photo.qualityScore}%` }}
                    ></div>
                  </div>
                </div>

              </div>

              {/* AI Recommendation Callout */}
              <div className="p-4 bg-charcoal-850 rounded border border-charcoal-750 space-y-1.5">
                <span className="text-[9px] uppercase tracking-widest text-warmGray-400 font-bold block">
                  AI RECOMMENDATION
                </span>
                
                <h4 className={`font-serif-luxury text-2xl font-bold uppercase ${
                  photo.aiRecommendation === 'KEEP'
                    ? 'text-emerald-400'
                    : photo.aiRecommendation === 'REVIEW'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}>
                  {photo.aiRecommendation}
                </h4>

                <p className="text-xs text-warmGray-300 italic leading-relaxed">
                  “{photo.reason}”
                </p>
              </div>

            </div>

            {/* Photographer Decision Controls */}
            <div className="space-y-3 pt-4 border-t border-charcoal-800">
              <span className="text-[10px] uppercase tracking-widest text-warmGray-400 font-semibold block">
                Photographer Final Decision
              </span>

              <div className="grid grid-cols-3 gap-2">
                {/* KEEP Button */}
                <button
                  onClick={() => onUpdateDecision(photo.id, 'KEEP')}
                  className={`py-3 rounded text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
                    currentDecision === 'KEEP'
                      ? 'bg-gold-500 text-charcoal-950 ring-2 ring-gold-400 shadow-gold-glow'
                      : 'bg-charcoal-850 hover:bg-charcoal-800 text-cream-100 border border-charcoal-700'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>KEEP (K)</span>
                </button>

                {/* REVIEW Button */}
                <button
                  onClick={() => onUpdateDecision(photo.id, 'REVIEW')}
                  className={`py-3 rounded text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
                    currentDecision === 'REVIEW'
                      ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                      : 'bg-charcoal-850 hover:bg-charcoal-800 text-cream-100 border border-charcoal-700'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>REVIEW (F)</span>
                </button>

                {/* REJECT Button */}
                <button
                  onClick={() => onUpdateDecision(photo.id, 'REJECT')}
                  className={`py-3 rounded text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
                    currentDecision === 'REJECT'
                      ? 'bg-rose-700 text-white ring-2 ring-rose-400'
                      : 'bg-charcoal-850 hover:bg-charcoal-800 text-cream-100 border border-charcoal-700'
                  }`}
                >
                  <X className="w-4 h-4" />
                  <span>REJECT (R)</span>
                </button>
              </div>

              <div className="pt-1 text-[10px] text-warmGray-500 flex items-center justify-between">
                <span>Hotkeys: K (Keep), F (Review), R (Reject)</span>
                <span className="text-gold-500 font-mono">XMP Live ✓</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
