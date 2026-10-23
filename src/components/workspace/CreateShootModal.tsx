import React, { useState } from 'react';
import { ShootCategory, ShootSession } from '../../types';
import { MOCK_CLIENTS } from '../../data/mockData';
import { 
  X, 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Camera, 
  Users, 
  Package, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreateShootModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: (newShoot: ShootSession) => void;
}

export const CreateShootModal: React.FC<CreateShootModalProps> = ({
  isOpen,
  onClose,
  onCreateSuccess
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(MOCK_CLIENTS[0].id);
  const [isCreatingNewClient, setIsCreatingNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [title, setTitle] = useState('Heritage Royal Wedding Ceremony');
  const [category, setCategory] = useState<ShootCategory>('Wedding');
  const [date, setDate] = useState('2026-06-20');
  const [timeRange, setTimeRange] = useState('10:00 AM — 6:00 PM');
  const [location, setLocation] = useState('Sri Krishna Mandapam, Coimbatore');
  const [packageAmount, setPackageAmount] = useState('85000');
  const [advanceAmount, setAdvanceAmount] = useState('30000');
  const [leadPhotographer, setLeadPhotographer] = useState('Karthik Raja');
  const [secondShooter, setSecondShooter] = useState('Swathi M.');
  const [cinematographer, setCinematographer] = useState('Vinoth K.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const clientName = isCreatingNewClient 
      ? newClientName 
      : MOCK_CLIENTS.find(c => c.id === selectedClientId)?.name || 'New Client';

    const newShoot: ShootSession = {
      id: `shoot-${Date.now()}`,
      clientId: selectedClientId,
      clientName,
      title,
      category,
      date,
      timeRange,
      venue: location,
      city: location.split(',')[1]?.trim() || 'Coimbatore',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
      status: 'Upcoming',
      leadPhotographer,
      secondShooter,
      cinematographer,
      estimatedFrames: 5000,
      packageTotal: parseInt(packageAmount) || 85000,
      advancePaid: parseInt(advanceAmount) || 30000,
      tasks: [
        { id: 't1', title: 'Pre-wedding consultation & moodboard', done: true },
        { id: 't2', title: 'Location scouting & lighting inspection', done: false },
        { id: 't3', title: 'Wedding ritual shot-list verification', done: false }
      ],
      shotList: [
        'Bridal attire & heirloom jewelry detail shots',
        'Groom entrance & family blessing',
        'Varmala garland exchange (Burst mode)',
        'Mandap rituals & candid moments'
      ]
    };

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#1A1714']
    });

    onCreateSuccess(newShoot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-2xl rounded-lg shadow-luxury-dark overflow-hidden text-cream-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-charcoal-800 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400 font-bold block">
              SCHEDULE NEW PRODUCTION
            </span>
            <h3 className="font-serif-luxury text-xl font-bold uppercase text-cream-50">
              Create Shoot Session
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-charcoal-800 rounded text-warmGray-400 hover:text-cream-50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Client Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] uppercase font-bold text-warmGray-300 tracking-wider">
                Client Assignment *
              </label>
              <button
                type="button"
                onClick={() => setIsCreatingNewClient(!isCreatingNewClient)}
                className="text-[10px] text-gold-400 uppercase font-bold tracking-wider hover:underline"
              >
                {isCreatingNewClient ? '← Select Existing Client' : '+ Create New Client'}
              </button>
            </div>

            {isCreatingNewClient ? (
              <input
                type="text"
                required
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="e.g. Siddharth & Ritu"
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
              />
            ) : (
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
              >
                {MOCK_CLIENTS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.partnerName && `& ${c.partnerName}`} — {c.eventType} ({c.location})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Shoot Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ShootCategory)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
              >
                <option value="Wedding">Wedding</option>
                <option value="Pre-Wedding">Pre-Wedding</option>
                <option value="Portrait">Portrait</option>
                <option value="Commercial">Commercial</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
          </div>

          {/* Date, Time & Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Date *
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 font-mono outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Duration / Time
              </label>
              <input
                type="text"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Venue & City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Package Investment & Advance */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Package Total (₹)
              </label>
              <input
                type="number"
                value={packageAmount}
                onChange={(e) => setPackageAmount(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 font-mono outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-warmGray-300 tracking-wider mb-1">
                Advance Deposit (₹)
              </label>
              <input
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 font-mono outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Crew Assignments */}
          <div className="p-3 bg-charcoal-850 rounded border border-charcoal-750 space-y-2">
            <span className="text-[10px] uppercase font-bold text-gold-400 tracking-widest block">
              PRODUCTION CREW ASSIGNMENT
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-[9px] text-warmGray-400 uppercase">Lead Photographer</span>
                <input
                  type="text"
                  value={leadPhotographer}
                  onChange={(e) => setLeadPhotographer(e.target.value)}
                  className="w-full p-1.5 bg-charcoal-900 border border-charcoal-700 rounded text-cream-50 text-[11px]"
                />
              </div>

              <div>
                <span className="text-[9px] text-warmGray-400 uppercase">Associate / Second</span>
                <input
                  type="text"
                  value={secondShooter}
                  onChange={(e) => setSecondShooter(e.target.value)}
                  className="w-full p-1.5 bg-charcoal-900 border border-charcoal-700 rounded text-cream-50 text-[11px]"
                />
              </div>

              <div>
                <span className="text-[9px] text-warmGray-400 uppercase">Cinematographer</span>
                <input
                  type="text"
                  value={cinematographer}
                  onChange={(e) => setCinematographer(e.target.value)}
                  className="w-full p-1.5 bg-charcoal-900 border border-charcoal-700 rounded text-cream-50 text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-charcoal-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-warmGray-400 hover:text-cream-50 text-xs font-semibold uppercase"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-wider shadow-gold-glow"
            >
              CREATE SHOOT SESSION →
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
