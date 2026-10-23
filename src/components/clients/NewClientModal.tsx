import React, { useState } from 'react';
import { Client, ShootCategory } from '../../types';
import { X, User, Mail, Phone, MapPin, Calendar, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (newClient: Client) => void;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  isOpen,
  onClose,
  onAddClient
}) => {
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Bangalore, India');
  const [eventType, setEventType] = useState<ShootCategory>('Wedding');
  const [eventDate, setEventDate] = useState('2026-10-15');
  const [totalAmount, setTotalAmount] = useState('95000');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newClient: Client = {
      id: `client-${Date.now()}`,
      name,
      partnerName: partnerName || undefined,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: phone || '+91 98400 11223',
      location,
      eventType,
      eventDate,
      status: 'Inquiry',
      pipelineStage: 'new',
      totalAmount: parseInt(totalAmount) || 85000,
      paidAmount: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      coverImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      packageTitle: 'Custom Creative Package',
      notes
    };

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#1A1714', '#F5F0E6']
    });

    onAddClient(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-lg rounded-lg shadow-luxury-dark overflow-hidden text-cream-100">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800">
          <h3 className="font-serif-luxury text-lg font-bold text-cream-50 uppercase tracking-wider">
            Register New Client Dossier
          </h3>
          <button onClick={onClose} className="p-1 text-warmGray-400 hover:text-cream-50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
                Primary Client Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Mehta"
                className="w-full px-3 py-2 bg-charcoal-850 border border-charcoal-700 rounded text-xs text-cream-50 outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
                Partner Name
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Tanvi Shah"
                className="w-full px-3 py-2 bg-charcoal-850 border border-charcoal-700 rounded text-xs text-cream-50 outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@gmail.com"
                className="w-full px-3 py-2 bg-charcoal-850 border border-charcoal-700 rounded text-xs text-cream-50 outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-charcoal-850 border border-charcoal-700 rounded text-xs text-cream-50 outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
                Event Category
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as ShootCategory)}
                className="w-full px-3 py-2 bg-charcoal-850 border border-charcoal-700 rounded text-xs text-cream-50 outline-none focus:border-gold-500"
              >
                <option value="Wedding">Wedding</option>
                <option value="Pre-Wedding">Pre-Wedding</option>
                <option value="Portrait">Portrait</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 bg-charcoal-850 border border-charcoal-700 rounded text-xs text-cream-50 outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
              Estimated Investment (₹)
            </label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full px-3 py-2 bg-charcoal-850 border border-charcoal-700 rounded text-xs text-cream-50 outline-none focus:border-gold-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-wider text-warmGray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest"
            >
              Save Client
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
