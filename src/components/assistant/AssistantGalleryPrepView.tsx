import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { MOCK_AI_PHOTOS, MOCK_CLIENTS } from '../../data/mockData';
import { 
  Sparkles, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Send,
  Eye,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssistantGalleryPrepViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AssistantGalleryPrepView: React.FC<AssistantGalleryPrepViewProps> = ({ onNavigate }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(
    MOCK_AI_PHOTOS.filter(p => p.photographerDecision === 'KEEP' || p.aiRecommendation === 'KEEP').map(p => p.id)
  );
  const [isSubmittedForApproval, setIsSubmittedForApproval] = useState(false);

  const handleSubmitToAdmin = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#1A1714']
    });
    setIsSubmittedForApproval(true);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 font-bold block mb-1">
            POST-PRODUCTION PIPELINE
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
            Assistant Gallery Preparation
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Curate and arrange candidate highlights for Karthik Raja's final publishing approval.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Status Callout */}
        <div className="bg-white rounded-lg p-6 border border-warmGray-300 shadow-luxury flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-700 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                Rahul & Priya — Wedding Highlights Draft
              </h4>
              <p className="text-xs text-charcoal-600">
                {selectedPhotos.length} Master Frames Staged • Non-Destructive Color Preset Applied
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isSubmittedForApproval ? (
              <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase rounded flex items-center gap-1.5 border border-emerald-300">
                <Check className="w-4 h-4" /> Staged for Lead Review
              </span>
            ) : (
              <button
                onClick={handleSubmitToAdmin}
                className="px-5 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-gold-400" />
                <span>Submit to Lead Photographer</span>
              </button>
            )}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {MOCK_AI_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square bg-charcoal-950 rounded overflow-hidden group border border-warmGray-300"
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.filename}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-charcoal-950/80 text-gold-400 text-[9px] font-mono">
                {photo.filename}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
