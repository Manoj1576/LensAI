import React from 'react';
import { ViewMode } from '../../types';
import { MOCK_CLIENTS, MOCK_SHOOTS } from '../../data/mockData';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Camera, 
  Sparkles, 
  CreditCard, 
  ArrowRight,
  FileText,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

interface ClientProjectViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const ClientProjectView: React.FC<ClientProjectViewProps> = ({ onNavigate }) => {
  const client = MOCK_CLIENTS[0];
  const shoot = MOCK_SHOOTS[0];

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-charcoal-900 text-cream-50 text-[10px] font-bold uppercase tracking-widest">
              CLIENT PORTAL
            </span>
            <span className="text-xs font-mono text-warmGray-500">PROJECT #LC-2026-W08</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
            {client.name} & {client.partnerName}
          </h1>
          <p className="text-xs sm:text-sm text-gold-700 font-bold uppercase mt-1">
            {shoot.title} • 20 JUNE 2026 • COIMBATORE
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        
        {/* Timeline Journey */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-warmGray-300 shadow-luxury space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950 border-b border-warmGray-200 pb-3">
            Milestone Progression
          </h3>

          <div className="space-y-4">
            {[
              {
                title: '1. Quotation Accepted & Advance Secured',
                date: '18 May 2026',
                status: 'Completed',
                desc: '35% Advance deposit paid. Studio dates locked for Sri Krishna Mandapam.'
              },
              {
                title: '2. Heritage Wedding Ceremony & Reception Shoot',
                date: '20 June 2026',
                status: 'Completed',
                desc: '8-Hour dual full-frame coverage with lead artist Karthik Raja & crew.'
              },
              {
                title: '3. AI Photo Culling & Blink Inspection',
                date: 'In Progress (84%)',
                status: 'Active',
                desc: '5,000 RAW frames analyzed to select optimal smiles and crisp focus.'
              },
              {
                title: '4. Private Web Proofing Gallery',
                date: 'Upcoming (28 June 2026)',
                status: 'Pending',
                desc: 'High-res online gallery unlocked for personal favoriting and sharing.'
              },
              {
                title: '5. Flush-Mount Heirloom Album Delivery',
                date: 'Upcoming (15 July 2026)',
                status: 'Pending',
                desc: '40-page handcrafted Italian linen book printed and delivered.'
              }
            ].map((m, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-cream-50 rounded border border-warmGray-200">
                <div className="mt-0.5">
                  {m.status === 'Completed' && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
                  {m.status === 'Active' && <Sparkles className="w-5 h-5 text-gold-600 animate-pulse" />}
                  {m.status === 'Pending' && <div className="w-5 h-5 rounded-full border-2 border-warmGray-300" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-charcoal-950">{m.title}</h4>
                    <span className="text-[10px] font-mono font-semibold text-warmGray-500">{m.date}</span>
                  </div>
                  <p className="text-xs text-charcoal-600 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('client-gallery')}
            className="p-5 bg-charcoal-950 text-cream-100 rounded-lg border border-gold-500/80 text-left hover:scale-[1.02] transition-transform"
          >
            <ImageIcon className="w-5 h-5 text-gold-400 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider block text-cream-50">View Photos</span>
            <span className="text-[10px] text-warmGray-400">Open Private Proofing Gallery →</span>
          </button>

          <button
            onClick={() => onNavigate('client-payments')}
            className="p-5 bg-white text-charcoal-900 rounded-lg border border-warmGray-300 text-left hover:border-charcoal-900 transition-colors shadow-sm"
          >
            <CreditCard className="w-5 h-5 text-charcoal-800 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider block text-charcoal-950">Payment Portal</span>
            <span className="text-[10px] text-warmGray-500">₹55,000 Balance Due →</span>
          </button>

          <button
            onClick={() => onNavigate('client-quote')}
            className="p-5 bg-white text-charcoal-900 rounded-lg border border-warmGray-300 text-left hover:border-charcoal-900 transition-colors shadow-sm"
          >
            <FileText className="w-5 h-5 text-charcoal-800 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider block text-charcoal-950">Proposal Terms</span>
            <span className="text-[10px] text-warmGray-500">View Agreed Inclusions →</span>
          </button>
        </div>

      </div>

    </div>
  );
};
