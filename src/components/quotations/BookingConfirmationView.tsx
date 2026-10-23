import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { MOCK_CLIENTS, MOCK_SHOOTS } from '../../data/mockData';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Camera, 
  ArrowRight, 
  FileText, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingConfirmationViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({ onNavigate }) => {
  const [isConfirmed, setIsConfirmed] = useState(true);
  const client = MOCK_CLIENTS[0];
  const shoot = MOCK_SHOOTS[0];

  const handleConfirm = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#1A1714', '#F5F0E6']
    });
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] uppercase font-bold tracking-widest mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>QUOTATION ACCEPTED BY CLIENT</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
            Booking Confirmation
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Review agreed package terms and officially register the shoot into your studio production ledger.
          </p>
        </div>
      </div>

      {/* Main Confirmation Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-warmGray-300 shadow-luxury space-y-6">
          
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warmGray-200">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-700 block">
                BOOKING ID: #BK-2026-089
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                {client.name} & {client.partnerName}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-900 text-emerald-200 text-xs font-mono font-bold rounded">
                Status: {isConfirmed ? 'CONFIRMED ✓' : 'Awaiting Studio Lock'}
              </span>
            </div>
          </div>

          {/* Details 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            
            <div className="space-y-3 bg-cream-50 p-4 rounded border border-warmGray-200">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-charcoal-950 border-b border-warmGray-300 pb-1.5">
                Event Specifications
              </h4>
              <div className="flex justify-between">
                <span className="text-warmGray-500">Event Type:</span>
                <strong className="text-charcoal-950">{shoot.category}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-warmGray-500">Shoot Date:</span>
                <strong className="text-charcoal-950 font-mono">{shoot.date}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-warmGray-500">Scheduled Time:</span>
                <strong className="text-charcoal-950">{shoot.timeRange}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-warmGray-500">Venue Location:</span>
                <strong className="text-charcoal-950">{shoot.venue}, {shoot.city}</strong>
              </div>
            </div>

            <div className="space-y-3 bg-cream-50 p-4 rounded border border-warmGray-200">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-charcoal-950 border-b border-warmGray-300 pb-1.5">
                Financial Schedule
              </h4>
              <div className="flex justify-between">
                <span className="text-warmGray-500">Package Total:</span>
                <strong className="font-mono text-charcoal-950">₹{shoot.packageTotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Advance Paid (35%):</span>
                <strong className="font-mono">₹{shoot.advancePaid.toLocaleString('en-IN')} ✓</strong>
              </div>
              <div className="flex justify-between text-amber-800 font-semibold pt-1 border-t border-warmGray-300">
                <span>Balance Due on Delivery:</span>
                <strong className="font-mono">₹{(shoot.packageTotal - shoot.advancePaid).toLocaleString('en-IN')}</strong>
              </div>
            </div>

          </div>

          {/* Automated System Actions */}
          <div className="p-4 bg-charcoal-950 text-cream-100 rounded text-xs space-y-2 border border-charcoal-800">
            <span className="text-[10px] uppercase font-bold text-gold-400 tracking-widest block">
              AUTOMATED NEXT STEPS INITIATED
            </span>
            <p className="text-warmGray-300">
              ✓ Added to Studio Production Calendar (20 June 2026).
            </p>
            <p className="text-warmGray-300">
              ✓ Assigned Lead Photographer (Karthik Raja) & Associate (Swathi M.).
            </p>
            <p className="text-warmGray-300">
              ✓ Client Portal Credentials generated for {client.name}.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-warmGray-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => onNavigate('calendar')}
              className="px-4 py-2.5 bg-cream-200 hover:bg-cream-300 text-charcoal-900 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>View On Calendar</span>
            </button>

            <button
              onClick={() => onNavigate('project-detail')}
              className="px-6 py-3 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest shadow-luxury flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>OPEN PROJECT WORKSPACE →</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
