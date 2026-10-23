import React from 'react';
import { AiCullingPhoto } from '../../types';
import { Sparkles, Check, CheckCircle2, ArrowRight, Layers, Eye, Focus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SimilarPhotoBurstGroupProps {
  burstPhotos: AiCullingPhoto[];
  onKeepBestFrame: (bestPhotoId: string) => void;
  onSelectPhoto: (photo: AiCullingPhoto) => void;
}

export const SimilarPhotoBurstGroup: React.FC<SimilarPhotoBurstGroupProps> = ({
  burstPhotos,
  onKeepBestFrame,
  onSelectPhoto
}) => {
  const bestPhoto = burstPhotos.find(p => p.isBurstBest) || burstPhotos[1];

  const handleKeepBest = () => {
    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#C9A876', '#B08A55', '#1A1714']
    });
    onKeepBestFrame(bestPhoto.id);
  };

  return (
    <div className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-warmGray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-gold-600" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold">
              BURST SEQUENCE SIMILARITY
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
            {burstPhotos.length} Similar Frames Found
          </h2>
          <p className="text-xs text-charcoal-600 mt-1">
            Sequence: Varmala Garland Exchange (RAW_7921 to RAW_7928 captured in 5 seconds).
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={handleKeepBest}
          className="px-6 py-3 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest shadow-luxury flex items-center gap-2 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>Keep Best Frame ({bestPhoto.filename})</span>
        </button>
      </div>

      {/* Side-by-Side Burst Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {burstPhotos.map((item) => {
          const isBest = item.id === bestPhoto.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectPhoto(item)}
              className={`rounded overflow-hidden bg-cream-100 cursor-pointer transition-all duration-300 flex flex-col group ${
                isBest
                  ? 'ring-2 ring-gold-500 border-2 border-gold-500 shadow-gold-glow -translate-y-1'
                  : 'border border-warmGray-300 hover:border-charcoal-800'
              }`}
            >
              {/* Image Preview */}
              <div className="relative aspect-[3/4] bg-charcoal-950 overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt={item.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {isBest ? (
                  <div className="absolute top-2 left-2 right-2 z-10">
                    <span className="w-full block text-center px-1.5 py-0.5 bg-gold-500 text-charcoal-950 text-[9px] font-bold uppercase tracking-wider rounded shadow-md">
                      ★ BEST FRAME
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase rounded ${
                      item.aiRecommendation === 'KEEP'
                        ? 'bg-emerald-900/80 text-emerald-300'
                        : item.aiRecommendation === 'REVIEW'
                        ? 'bg-amber-900/80 text-amber-300'
                        : 'bg-rose-900/80 text-rose-300'
                    }`}>
                      {item.aiRecommendation}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-mono text-cream-100 bg-charcoal-950/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-center">
                  Q: {item.qualityScore} • {item.sharpnessScore}%
                </div>
              </div>

              {/* Specs & Rationale */}
              <div className="p-2 space-y-1 text-center bg-cream-50 text-[10px]">
                <p className="font-mono font-bold text-charcoal-950 truncate">
                  {item.filename}
                </p>
                <p className={`font-semibold ${item.eyesStatus === 'Open' ? 'text-emerald-700' : 'text-rose-700'}`}>
                  Eyes: {item.eyesStatus}
                </p>
                <p className="text-warmGray-500 truncate text-[9px]">
                  {item.timestamp}
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detailed Analysis of the Best Frame */}
      <div className="p-5 bg-charcoal-950 text-cream-100 rounded border border-gold-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-luxury-dark">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center text-gold-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-cream-50 uppercase">
              AI Selection Rationale for {bestPhoto.filename}
            </h4>
            <p className="text-xs text-warmGray-300 mt-0.5">
              “{bestPhoto.reason}”
            </p>
          </div>
        </div>

        <button
          onClick={handleKeepBest}
          className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow transition-all shrink-0"
        >
          Confirm Best Frame (Auto-Reject 7 Duplicates)
        </button>
      </div>

    </div>
  );
};
