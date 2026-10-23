import React, { useState } from 'react';
import { AiCullingPhoto } from '../../types';
import { 
  Sparkles, 
  Check, 
  AlertCircle, 
  X, 
  Eye, 
  Layers, 
  Flame, 
  Heart,
  SlidersHorizontal,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface AiResultsGridProps {
  photos: AiCullingPhoto[];
  onSelectPhoto: (photo: AiCullingPhoto) => void;
  onUpdatePhotoDecision: (photoId: string, decision: 'KEEP' | 'REVIEW' | 'REJECT') => void;
  onOpenBurstCompare: () => void;
}

type FilterTab = 'ALL' | 'KEEP' | 'REVIEW' | 'REJECT' | 'CLOSED EYES' | 'BLURRY' | 'DUPLICATES' | 'BEST SHOTS';

export const AiResultsGrid: React.FC<AiResultsGridProps> = ({
  photos,
  onSelectPhoto,
  onUpdatePhotoDecision,
  onOpenBurstCompare
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');

  const filterTabs: FilterTab[] = [
    'ALL',
    'KEEP',
    'REVIEW',
    'REJECT',
    'CLOSED EYES',
    'BLURRY',
    'DUPLICATES',
    'BEST SHOTS'
  ];

  const filteredPhotos = photos.filter((photo) => {
    const decision = photo.photographerDecision || photo.aiRecommendation;
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'KEEP') return decision === 'KEEP';
    if (activeFilter === 'REVIEW') return decision === 'REVIEW';
    if (activeFilter === 'REJECT') return decision === 'REJECT';
    if (activeFilter === 'CLOSED EYES') return photo.tags.includes('Closed Eyes');
    if (activeFilter === 'BLURRY') return photo.tags.includes('Blurry');
    if (activeFilter === 'DUPLICATES') return photo.tags.includes('Duplicates');
    if (activeFilter === 'BEST SHOTS') return photo.tags.includes('Best Shots');
    return true;
  });

  const keepCount = photos.filter(p => (p.photographerDecision || p.aiRecommendation) === 'KEEP').length;
  const reviewCount = photos.filter(p => (p.photographerDecision || p.aiRecommendation) === 'REVIEW').length;
  const rejectCount = photos.filter(p => (p.photographerDecision || p.aiRecommendation) === 'REJECT').length;

  return (
    <div className="bg-cream-100 space-y-6">
      
      {/* Top Header & Metrics Bar */}
      <div className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-warmGray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold">
                BATCH CURATION SUITE
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
              AI Culling Results
            </h2>
            <p className="text-xs text-charcoal-600 mt-1">
              Showing curated selection from 5,000 analyzed RAW frames.
            </p>
          </div>

          {/* Large Editorial Numbers */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="text-left sm:text-right">
              <span className="text-xs font-mono uppercase tracking-widest text-warmGray-500 block">
                Total Frames
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-charcoal-950">
                5,000
              </span>
            </div>

            <div className="h-8 w-[1px] bg-warmGray-300"></div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 block font-semibold">
                Keep
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-emerald-800">
                {3842 + (keepCount > 3 ? keepCount - 3 : 0)}
              </span>
            </div>

            <div className="h-8 w-[1px] bg-warmGray-300"></div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 block font-semibold">
                Review
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-800">
                {718 - (reviewCount < 3 ? 3 - reviewCount : 0)}
              </span>
            </div>

            <div className="h-8 w-[1px] bg-warmGray-300"></div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-700 block font-semibold">
                Reject
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-rose-800">
                440
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills & Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-charcoal-950 text-gold-400 shadow-sm'
                      : 'bg-cream-200/80 hover:bg-cream-300 text-charcoal-800'
                  }`}
                >
                  {tab}
                  {tab === 'BEST SHOTS' && ' ★'}
                </button>
              );
            })}
          </div>

          {/* Burst group shortcut */}
          <button
            onClick={onOpenBurstCompare}
            className="px-3.5 py-1.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-100 rounded text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-sm transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-gold-400" />
            <span>Compare 8 Similar Burst Frames</span>
          </button>
        </div>

      </div>

      {/* Photography Thumbnails Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => {
          const decision = photo.photographerDecision || photo.aiRecommendation;
          const isKeep = decision === 'KEEP';
          const isReview = decision === 'REVIEW';
          const isReject = decision === 'REJECT';

          return (
            <div
              key={photo.id}
              className={`bg-cream-50 rounded border overflow-hidden transition-all duration-300 group hover:shadow-luxury flex flex-col ${
                photo.isBurstBest
                  ? 'ring-2 ring-gold-500 border-gold-500'
                  : 'border-warmGray-300 hover:border-charcoal-800'
              }`}
            >
              {/* Image Container */}
              <div 
                onClick={() => onSelectPhoto(photo)}
                className="relative aspect-[4/3] bg-charcoal-950 cursor-pointer overflow-hidden"
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.filename}
                  className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
                    isReject ? 'opacity-60 filter grayscale' : ''
                  }`}
                />

                {/* Status Indicator Badge */}
                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
                    isKeep
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                      : isReview
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                  }`}>
                    {decision}
                  </span>

                  {photo.isBurstBest && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 border border-gold-400">
                      ★ BEST FRAME
                    </span>
                  )}
                </div>

                {/* Sharpness & Quality Pill */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-[10px] font-mono text-cream-100 bg-charcoal-950/80 backdrop-blur-md px-2 py-1 rounded">
                  <span>Sharp: {photo.sharpnessScore}/100</span>
                  <span>Eyes: {photo.eyesStatus}</span>
                  <span className="text-gold-400 font-bold">Q: {photo.qualityScore}</span>
                </div>

                {/* Hover Click to Inspect Overlay */}
                <div className="absolute inset-0 bg-charcoal-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-cream-50 text-charcoal-950 text-[10px] uppercase font-bold tracking-widest rounded shadow-luxury flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3" /> Deep Inspect
                  </span>
                </div>
              </div>

              {/* Photo Card Footer Controls */}
              <div className="p-3.5 space-y-2 bg-cream-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-charcoal-900 text-[11px]">
                    {photo.filename}
                  </span>
                  <span className="text-[10px] text-warmGray-500 font-mono">
                    {photo.focalLength} • {photo.aperture}
                  </span>
                </div>

                <p className="text-[11px] text-charcoal-600 line-clamp-1 italic">
                  {photo.reason}
                </p>

                {/* Keep / Review / Reject Quick Switch Buttons */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-warmGray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdatePhotoDecision(photo.id, 'KEEP');
                    }}
                    className={`py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      isKeep
                        ? 'bg-emerald-800 text-white'
                        : 'bg-cream-200 hover:bg-emerald-100 text-charcoal-800'
                    }`}
                  >
                    Keep (K)
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdatePhotoDecision(photo.id, 'REVIEW');
                    }}
                    className={`py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      isReview
                        ? 'bg-amber-700 text-white'
                        : 'bg-cream-200 hover:bg-amber-100 text-charcoal-800'
                    }`}
                  >
                    Review (R)
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdatePhotoDecision(photo.id, 'REJECT');
                    }}
                    className={`py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      isReject
                        ? 'bg-rose-800 text-white'
                        : 'bg-cream-200 hover:bg-rose-100 text-charcoal-800'
                    }`}
                  >
                    Reject (J)
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
