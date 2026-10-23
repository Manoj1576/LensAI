import React, { useState } from 'react';
import { MOCK_AI_PHOTOS, MOCK_CLIENTS } from '../../data/mockData';
import { 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  Lock, 
  ShieldCheck, 
  Download, 
  Share2, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GalleryBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishSuccess: () => void;
}

export const GalleryBuilderModal: React.FC<GalleryBuilderModalProps> = ({
  isOpen,
  onClose,
  onPublishSuccess
}) => {
  const client = MOCK_CLIENTS[0];
  const [galleryName, setGalleryName] = useState('Rahul & Priya — Heritage Royal Wedding');
  const [description, setDescription] = useState('An unforgettable celebration of timeless South Indian heritage and royal festivities.');
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState('ROYAL2026');
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>(
    MOCK_AI_PHOTOS.filter(p => p.photographerDecision === 'KEEP' || p.aiRecommendation === 'KEEP').map(p => p.id)
  );

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#B08A55', '#1A1714', '#F5F0E6']
    });
    onPublishSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/85 backdrop-blur-sm animate-fadeIn select-none">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-3xl rounded-lg shadow-luxury-dark overflow-hidden text-cream-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-charcoal-800 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400 font-bold block">
              GALLERY CREATION WIZARD
            </span>
            <h3 className="font-serif-luxury text-xl font-bold uppercase text-cream-50">
              Publish Client Proofing Gallery
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-charcoal-800 rounded text-warmGray-400 hover:text-cream-50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePublish} className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Metadata */}
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Gallery Title *
              </label>
              <input
                type="text"
                required
                value={galleryName}
                onChange={(e) => setGalleryName(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Editorial Subtitle / Story
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Selected Photos Summary */}
          <div className="p-4 bg-charcoal-850 rounded border border-charcoal-750 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-gold-400" />
              <div>
                <span className="font-mono text-xs font-bold text-cream-50 block">
                  {selectedPhotoIds.length} Curated Master Photos Selected
                </span>
                <span className="text-[10px] text-warmGray-400">
                  Filtered from 5,000 RAW frames (4h 32m manual time saved)
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-gold-500/20 text-gold-400 border border-gold-500/40 rounded text-[10px] font-bold uppercase">
              Ready to Master
            </span>
          </div>

          {/* Delivery & Access Settings */}
          <div className="space-y-3 border-t border-charcoal-800 pt-4">
            <h4 className="text-[10px] uppercase font-bold text-gold-400 tracking-widest">
              CLIENT ACCESS & DOWNLOAD PERMISSIONS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 bg-charcoal-850 rounded border border-charcoal-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDownloads}
                  onChange={(e) => setAllowDownloads(e.target.checked)}
                  className="w-4 h-4 accent-gold-500 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-cream-50 block">Enable High-Res Downloads</span>
                  <span className="text-[10px] text-warmGray-400">Original 45MP archival JPEGs</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-charcoal-850 rounded border border-charcoal-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={passwordProtected}
                  onChange={(e) => setPasswordProtected(e.target.checked)}
                  className="w-4 h-4 accent-gold-500 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-cream-50 block">Password Protection</span>
                  <span className="text-[10px] text-warmGray-400">Private client access PIN</span>
                </div>
              </label>
            </div>

            {passwordProtected && (
              <div className="p-3 bg-charcoal-900 rounded border border-charcoal-700 flex items-center gap-3">
                <Lock className="w-4 h-4 text-gold-400" />
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set Access PIN"
                  className="bg-transparent text-cream-50 outline-none text-xs font-mono"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-charcoal-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-warmGray-400 hover:text-cream-50 text-xs font-semibold uppercase"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>PUBLISH & GENERATE LINK →</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
