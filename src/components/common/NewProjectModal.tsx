import React, { useState } from 'react';
import { X, Sparkles, Calendar, MapPin, DollarSign, Camera } from 'lucide-react';
import { ShootCategory } from '../../types';
import confetti from 'canvas-confetti';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: (projectName: string) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateSuccess
}) => {
  const [clientName, setClientName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [eventType, setEventType] = useState<ShootCategory>('Wedding');
  const [shootDate, setShootDate] = useState('2026-07-28');
  const [venueCity, setVenueCity] = useState('Coimbatore, Tamil Nadu');
  const [packageAmount, setPackageAmount] = useState('95000');
  const [advanceAmount, setAdvanceAmount] = useState('35000');
  const [autoRunAi, setAutoRunAi] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) return;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#B08A55', '#F5F0E6']
    });

    onCreateSuccess(`${clientName} ${partnerName ? '& ' + partnerName : ''}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-xl rounded-lg shadow-luxury-dark overflow-hidden text-cream-100">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-semibold text-cream-50 uppercase tracking-wider">
                Initiate New Project
              </h3>
              <p className="text-[11px] text-warmGray-400">Add to studio pipeline & AI workflow</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-warmGray-400 hover:text-cream-50 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1.5">
                Primary Client Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Siddharth Verma"
                className="w-full px-3.5 py-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-sm text-cream-50 focus:border-gold-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1.5">
                Partner / Contact Name
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Ritu Kulkarni"
                className="w-full px-3.5 py-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-sm text-cream-50 focus:border-gold-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1.5">
                Shoot Category
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as ShootCategory)}
                className="w-full px-3.5 py-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-sm text-cream-50 focus:border-gold-500 outline-none transition-colors"
              >
                <option value="Wedding">Wedding Celebration</option>
                <option value="Pre-Wedding">Pre-Wedding & Engagement</option>
                <option value="Portrait">Fine Art Portrait</option>
                <option value="Commercial">Commercial & Architecture</option>
                <option value="Landscape">Destination / Landscape</option>
                <option value="Fashion">Fashion & Editorial</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1.5">
                Shoot Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={shootDate}
                  onChange={(e) => setShootDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-sm text-cream-50 focus:border-gold-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1.5">
              Venue & Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={venueCity}
                onChange={(e) => setVenueCity(e.target.value)}
                placeholder="e.g. ITC Grand Chola, Chennai"
                className="w-full px-3.5 py-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-sm text-cream-50 focus:border-gold-500 outline-none transition-colors"
              />
              <MapPin className="w-4 h-4 text-warmGray-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1.5">
                Package Investment (₹)
              </label>
              <input
                type="number"
                value={packageAmount}
                onChange={(e) => setPackageAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-sm text-cream-50 focus:border-gold-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1.5">
                Advance Deposit (₹)
              </label>
              <input
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-sm text-cream-50 focus:border-gold-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* AI Culling Integration Toggle */}
          <div className="p-3.5 bg-charcoal-850 rounded border border-charcoal-750 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <div>
                <p className="text-xs font-semibold text-cream-50">Enable LensCraft AI Culling Engine</p>
                <p className="text-[10px] text-warmGray-400">Automatically cluster bursts & detect blinks on upload</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoRunAi}
              onChange={(e) => setAutoRunAi(e.target.checked)}
              className="w-4 h-4 accent-gold-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-charcoal-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-widest text-warmGray-400 hover:text-cream-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-semibold uppercase tracking-widest shadow-gold-glow transition-all"
            >
              Create Project & Workspace
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
