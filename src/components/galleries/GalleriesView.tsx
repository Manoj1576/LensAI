import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { MOCK_AI_PHOTOS, MOCK_CLIENTS } from '../../data/mockData';
import { 
  Heart, 
  Download, 
  Share2, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Eye,
  Check,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GalleriesViewProps {
  onNavigate: (view: ViewMode) => void;
  isPublicClientMode?: boolean;
}

type GalleryCategory = 'All' | 'Ceremony & Rituals' | 'Portraits' | 'Reception' | 'Details';

export const GalleriesView: React.FC<GalleriesViewProps> = ({ 
  onNavigate,
  isPublicClientMode = false 
}) => {
  const [publicMode, setPublicMode] = useState(isPublicClientMode);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'burst-1-2': true,
    'photo-101': true,
    'photo-105': true
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const client = MOCK_CLIENTS[0]; // Rahul & Priya
  const galleryPhotos = MOCK_AI_PHOTOS.filter(p => p.photographerDecision === 'KEEP' || p.aiRecommendation === 'KEEP');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadAll = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#F5F0E6']
    });
    alert('Preparing 3,842 High-Resolution 45MP archival JPEGs in a ZIP container.');
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-24">
      
      {/* Studio Admin Switcher Banner (Hidden in client mode or toggleable) */}
      <div className="bg-charcoal-950 text-cream-100 px-4 py-2 text-xs flex items-center justify-between border-b border-charcoal-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-warmGray-400">Viewing Mode:</span>
          <strong className="text-gold-400">{publicMode ? 'Client Portal (Public Live View)' : 'Studio Admin Proofing'}</strong>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPublicMode(!publicMode)}
            className="px-3 py-1 bg-charcoal-850 hover:bg-charcoal-800 text-cream-50 rounded border border-charcoal-700 text-[10px] uppercase font-bold tracking-wider"
          >
            {publicMode ? 'Switch to Studio Admin View' : 'Preview as Client'}
          </button>
          {!publicMode && (
            <button
              onClick={() => onNavigate('project-detail')}
              className="text-[10px] uppercase text-warmGray-400 hover:text-cream-50 flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Project
            </button>
          )}
        </div>
      </div>

      {/* Editorial Luxury Gallery Header */}
      <div className="relative bg-charcoal-950 text-cream-100 py-16 sm:py-24 border-b border-charcoal-800 text-center overflow-hidden">
        
        {/* Subtle Background Backdrop */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={client.coverImageUrl}
            alt={client.name}
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-400 font-semibold block">
            PRIVATE CLIENT PORTFOLIO COLLECTION
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-cream-50">
            {client.name} & {client.partnerName}
          </h1>
          <p className="text-xs sm:text-sm text-warmGray-300 tracking-widest uppercase font-light">
            Heritage Royal Wedding Collection • 20 June 2026 • Coimbatore
          </p>

          {/* Minimal Controls Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownloadAll}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full High-Res ({galleryPhotos.length} Mastered)</span>
            </button>

            <button
              onClick={handleShare}
              className="px-5 py-2.5 bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 border border-charcoal-700 rounded text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-gold-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Private Link'}</span>
            </button>

            <div className="px-4 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded text-xs font-mono text-gold-400 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              <span>{Object.values(favorites).filter(Boolean).length} Favorites</span>
            </div>
          </div>
        </div>

      </div>

      {/* Category Filter Strip */}
      <div className="sticky top-20 z-30 bg-cream-50/95 backdrop-blur-md border-b border-warmGray-300 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 overflow-x-auto">
          {['All', 'Ceremony & Rituals', 'Portraits', 'Reception', 'Details'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as GalleryCategory)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-charcoal-950 text-cream-50'
                  : 'text-charcoal-700 hover:text-charcoal-950 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Full-Bleed Masonry Photography Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galleryPhotos.map((photo, index) => {
            const isFav = !!favorites[photo.id];

            return (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/5] bg-charcoal-950 rounded overflow-hidden cursor-pointer shadow-luxury hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />
                
                <div className="absolute inset-0 bg-charcoal-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => toggleFavorite(photo.id, e)}
                  className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    isFav
                      ? 'bg-rose-900/90 text-rose-300 ring-1 ring-rose-400'
                      : 'bg-charcoal-950/60 text-cream-100 hover:bg-charcoal-950 opacity-0 group-hover:opacity-100'
                  }`}
                  title="Mark as Favorite"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent text-cream-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-gold-400 font-bold block">
                      {photo.filename}
                    </span>
                    <span className="text-[10px] text-warmGray-300 font-light">
                      {photo.focalLength} • {photo.aperture} • ISO {photo.iso}
                    </span>
                  </div>

                  <span className="p-1.5 bg-cream-50 text-charcoal-950 rounded-full">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-charcoal-950 flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between text-cream-100 z-10">
            <span className="font-mono text-xs text-gold-400">
              {galleryPhotos[lightboxIndex].filename} ({lightboxIndex + 1} / {galleryPhotos.length})
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 text-warmGray-400 hover:text-cream-50 rounded-full hover:bg-charcoal-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Center */}
          <div className="relative flex-1 flex items-center justify-center">
            
            {/* Prev */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : galleryPhotos.length - 1))}
              className="absolute left-2 sm:left-6 p-3 bg-charcoal-900/80 hover:bg-charcoal-850 text-cream-50 rounded-full border border-charcoal-700 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={galleryPhotos[lightboxIndex].url}
              alt={galleryPhotos[lightboxIndex].filename}
              className="max-h-[80vh] max-w-full object-contain rounded shadow-2xl"
            />

            {/* Next */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev! < galleryPhotos.length - 1 ? prev! + 1 : 0))}
              className="absolute right-2 sm:right-6 p-3 bg-charcoal-900/80 hover:bg-charcoal-850 text-cream-50 rounded-full border border-charcoal-700 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Lightbox Controls */}
          <div className="flex items-center justify-between text-xs text-warmGray-400 border-t border-charcoal-900 pt-3">
            <span className="font-mono">{galleryPhotos[lightboxIndex].resolution}</span>
            <button
              onClick={(e) => toggleFavorite(galleryPhotos[lightboxIndex].id, e)}
              className="flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-bold uppercase tracking-wider"
            >
              <Heart className={`w-4 h-4 ${favorites[galleryPhotos[lightboxIndex].id] ? 'fill-current text-rose-500' : ''}`} />
              <span>{favorites[galleryPhotos[lightboxIndex].id] ? 'Favorited' : 'Add to Favorites'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
