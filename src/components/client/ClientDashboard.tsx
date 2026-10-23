import React from 'react';
import { ViewMode } from '../../types';
import { MOCK_CLIENTS, MOCK_SHOOTS, MOCK_PAYMENT_MILESTONES } from '../../data/mockData';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  FileText, 
  CreditCard, 
  Image as ImageIcon, 
  Heart, 
  MessageSquare, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Download
} from 'lucide-react';

interface ClientDashboardProps {
  onNavigate: (view: ViewMode) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigate }) => {
  const client = MOCK_CLIENTS[0]; // Rahul & Priya
  const shoot = MOCK_SHOOTS[0];

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-24">
      
      {/* Editorial Luxury Welcome Banner */}
      <div className="relative bg-charcoal-950 text-cream-100 py-16 sm:py-20 border-b border-charcoal-800 overflow-hidden">
        
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={client.coverImageUrl}
            alt={client.name}
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900/90 border border-gold-500/40 text-gold-400 text-[10px] uppercase font-bold tracking-[0.25em]">
            <Sparkles className="w-3 h-3" />
            <span>PRIVATE CLIENT PORTAL</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-cream-50">
            Welcome, {client.name} & {client.partnerName}
          </h1>

          <p className="text-xs sm:text-sm text-warmGray-300 tracking-wider uppercase font-light">
            Heritage Royal Wedding • 20 June 2026 • Coimbatore, Tamil Nadu
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-gold-400">
            <span>Package: {client.packageTitle}</span>
            <span>•</span>
            <span>Lead Artist: Karthik Raja Studios</span>
          </div>
        </div>

      </div>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* Project Milestone Summary Bar */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-warmGray-300 shadow-luxury space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-700 block">
                PRODUCTION JOURNEY
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Wedding Journey Progress
              </h3>
            </div>

            <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-800 border border-gold-500/40 font-mono text-xs font-bold uppercase">
              Phase 04: Photo Culling (84% Done)
            </span>
          </div>

          {/* 5-Step Clean Client Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {[
              { label: 'Booking', status: 'done', sub: 'Advance Paid' },
              { label: 'Shoot', status: 'done', sub: 'Completed' },
              { label: 'Culling', status: 'active', sub: 'AI 84% Complete' },
              { label: 'Gallery', status: 'pending', sub: 'Proofing Ready' },
              { label: 'Delivery', status: 'pending', sub: 'Heirloom Album' }
            ].map((step, idx) => (
              <div 
                key={step.label} 
                className={`p-3 rounded border text-center space-y-1 ${
                  step.status === 'done' 
                    ? 'bg-cream-100 border-charcoal-900 text-charcoal-950 font-semibold'
                    : step.status === 'active'
                    ? 'bg-charcoal-950 text-cream-100 border-gold-500 ring-2 ring-gold-500/20'
                    : 'bg-cream-50 border-warmGray-200 text-warmGray-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[11px] uppercase font-bold tracking-wider">
                  {step.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  {step.status === 'active' && <Sparkles className="w-3.5 h-3.5 text-gold-400" />}
                  <span>{step.label}</span>
                </div>
                <span className={`text-[9px] block ${step.status === 'active' ? 'text-gold-400 font-mono' : 'text-warmGray-500'}`}>
                  {step.sub}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={() => onNavigate('client-project')}
              className="text-gold-700 hover:text-charcoal-950 font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <span>View Full Project Overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 Quick Action Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: View Gallery */}
          <div
            onClick={() => onNavigate('client-gallery')}
            className="p-6 bg-charcoal-950 text-cream-100 rounded-lg border border-gold-500/60 hover:border-gold-400 cursor-pointer transition-all shadow-luxury-dark group space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block">
                PHOTO PROOFING
              </span>
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-cream-50">
                View Wedding Gallery
              </h3>
              <p className="text-xs text-warmGray-300 mt-1">
                Browse master photographs, create your favorites collection, and download high-res files.
              </p>
            </div>

            <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs font-bold text-gold-400 uppercase tracking-wider">
              <span>Open Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: My Favorites */}
          <div
            onClick={() => onNavigate('client-favorites')}
            className="p-6 bg-white rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury group space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block">
                ALBUM SELECTION
              </span>
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                My Favorites List
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Heart your favorite photos to be included in your flush-mount handcrafted wedding book.
              </p>
            </div>

            <div className="pt-3 border-t border-warmGray-200 flex items-center justify-between text-xs font-bold text-charcoal-900 uppercase tracking-wider">
              <span>View 3 Favorited</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Payments & Balance */}
          <div
            onClick={() => onNavigate('client-payments')}
            className="p-6 bg-white rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury group space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-cream-200 text-charcoal-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block">
                PAYMENT PORTAL
              </span>
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                Settle Remaining Balance
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Advance of ₹30,000 paid. Remaining balance of ₹55,000 due upon album dispatch.
              </p>
            </div>

            <div className="pt-3 border-t border-warmGray-200 flex items-center justify-between text-xs font-bold text-charcoal-900 uppercase tracking-wider">
              <span>Pay Online</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Quotation */}
          <div
            onClick={() => onNavigate('client-quote')}
            className="p-6 bg-white rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury group space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-cream-200 text-charcoal-900 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block">
                PROPOSAL & TERMS
              </span>
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                Bespoke Proposal #LC-089
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Review deliverables including 2 photographers, 4K film, and 40-page heirloom album.
              </p>
            </div>

            <div className="pt-3 border-t border-warmGray-200 flex items-center justify-between text-xs font-bold text-charcoal-900 uppercase tracking-wider">
              <span>Review Proposal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Downloads */}
          <div
            onClick={() => onNavigate('client-downloads')}
            className="p-6 bg-white rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury group space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-cream-200 text-charcoal-900 flex items-center justify-center mb-3">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block">
                ARCHIVE DOWNLOADS
              </span>
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                High-Resolution Packages
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Download printable 45MP archival JPEGs with personal print release.
              </p>
            </div>

            <div className="pt-3 border-t border-warmGray-200 flex items-center justify-between text-xs font-bold text-charcoal-900 uppercase tracking-wider">
              <span>Download Files</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Feedback */}
          <div
            onClick={() => onNavigate('client-feedback')}
            className="p-6 bg-white rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury group space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-cream-200 text-charcoal-900 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block">
                KIND WORDS
              </span>
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                Share Your Experience
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Leave a rating and review for Karthik Raja Studios.
              </p>
            </div>

            <div className="pt-3 border-t border-warmGray-200 flex items-center justify-between text-xs font-bold text-charcoal-900 uppercase tracking-wider">
              <span>Leave Review ★★★★★</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
