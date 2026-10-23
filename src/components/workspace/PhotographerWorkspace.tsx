import React from 'react';
import { ViewMode } from '../../types';
import { NextShootSpotlight } from './NextShootSpotlight';
import { UpcomingShootsList } from './UpcomingShootsList';
import { MOCK_SHOOTS, MOCK_CLIENTS, MOCK_PAYMENT_MILESTONES } from '../../data/mockData';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  Plus, 
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  FileCheck2,
  Layers,
  Inbox
} from 'lucide-react';

interface PhotographerWorkspaceProps {
  onNavigate: (view: ViewMode) => void;
  onOpenNewProject: () => void;
  onOpenProject: (projectId: string) => void;
}

export const PhotographerWorkspace: React.FC<PhotographerWorkspaceProps> = ({
  onNavigate,
  onOpenNewProject,
  onOpenProject
}) => {
  const metricBlocks = [
    {
      id: 'shoots',
      label: "TODAY'S SHOOTS",
      value: "03",
      subtext: "2 Weddings • 1 Fine Art Portrait",
      target: 'calendar' as ViewMode,
    },
    {
      id: 'inquiries',
      label: "PENDING INQUIRIES",
      value: "08",
      subtext: "3 High-value Destination leads",
      target: 'leads' as ViewMode,
    },
    {
      id: 'ai-review',
      label: "AI REVIEW",
      value: "2,846",
      unit: "PHOTOS",
      subtext: "Rahul & Priya • 72% culled",
      target: 'ai-culling' as ViewMode,
      isAi: true,
    },
    {
      id: 'payments',
      label: "PENDING PAYMENTS",
      value: "₹1,45,000",
      subtext: "₹30,000 advance cleared today",
      target: 'payments' as ViewMode,
    }
  ];

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-24">
      
      {/* Top Header Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-gold-600 animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 font-bold">
                  STUDIO COMMAND CENTER
                </span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Your Workspace
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light">
                Everything happening across your studio.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenNewProject}
                className="px-4 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Project</span>
              </button>

              <button
                onClick={() => onNavigate('ai-culling')}
                className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-gold-glow flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Culling Suite</span>
              </button>

              <button
                onClick={() => onNavigate('leads')}
                className="px-4 py-2.5 bg-cream-200 hover:bg-cream-300 text-charcoal-900 border border-warmGray-400 rounded text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Inquiries Pipeline</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Large Information Blocks (Editorial Metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricBlocks.map((block) => (
            <div
              key={block.id}
              onClick={() => onNavigate(block.target)}
              className={`p-6 sm:p-7 rounded-lg border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                block.isAi
                  ? 'bg-charcoal-950 text-cream-100 border-gold-500 shadow-luxury-dark ring-1 ring-gold-500/40'
                  : 'bg-cream-50 border-warmGray-300 hover:border-charcoal-900 text-charcoal-900 hover:shadow-luxury'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                    block.isAi ? 'text-gold-400' : 'text-charcoal-700'
                  }`}>
                    {block.label}
                  </span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    block.isAi ? 'text-gold-400' : 'text-charcoal-500'
                  }`} />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className={`font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                    block.isAi ? 'text-cream-50' : 'text-charcoal-950'
                  }`}>
                    {block.value}
                  </span>
                  {block.unit && (
                    <span className={`text-xs font-mono uppercase tracking-wider ${
                      block.isAi ? 'text-gold-400' : 'text-charcoal-600'
                    }`}>
                      {block.unit}
                    </span>
                  )}
                </div>
              </div>

              <div className={`mt-5 pt-3 border-t text-[11px] font-medium ${
                block.isAi ? 'border-charcoal-800 text-warmGray-300' : 'border-warmGray-200 text-charcoal-600'
              }`}>
                {block.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Section 1: Next On Your Calendar Spotlight */}
        <NextShootSpotlight 
          onNavigate={onNavigate} 
          onOpenProject={onOpenProject} 
        />

        {/* Section 2: AI Photo Culling Queue Block (Signature feature) */}
        <div className="bg-charcoal-950 text-cream-100 rounded-lg p-6 sm:p-8 border border-gold-500/60 shadow-luxury-dark space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center text-gold-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold block">
                  AI CULLING PIPELINE QUEUE
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold uppercase text-cream-50">
                  2,846 Photos Waiting For Review
                </h3>
              </div>
            </div>

            <button
              onClick={() => onNavigate('ai-culling')}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-2 transition-all hover:scale-105 self-start sm:self-auto"
            >
              <span>CONTINUE REVIEW →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-charcoal-900 rounded border border-charcoal-800">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                AI KEEP RECOMMENDATION
              </span>
              <span className="font-serif-luxury text-3xl font-bold text-emerald-300">
                1,982
              </span>
              <p className="text-[10px] text-warmGray-400 mt-1">Sharp, eyes wide open, balanced exposure</p>
            </div>

            <div className="p-4 bg-charcoal-900 rounded border border-charcoal-800">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block mb-1">
                NEEDS HUMAN REVIEW
              </span>
              <span className="font-serif-luxury text-3xl font-bold text-amber-300">
                514
              </span>
              <p className="text-[10px] text-warmGray-400 mt-1">Slight motion or burst duplicate cluster</p>
            </div>

            <div className="p-4 bg-charcoal-900 rounded border border-charcoal-800">
              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold block mb-1">
                AI REJECT FLAGGED
              </span>
              <span className="font-serif-luxury text-3xl font-bold text-rose-300">
                350
              </span>
              <p className="text-[10px] text-warmGray-400 mt-1">Closed eyes (96% conf) / blur detected</p>
            </div>
          </div>
        </div>

        {/* Section 3: Recent Projects Horizontal Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block">
                ACTIVE PRODUCTIONS
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Recent Studio Projects
              </h3>
            </div>

            <button
              onClick={() => onNavigate('clients')}
              className="text-xs uppercase font-bold text-charcoal-900 hover:text-gold-700 flex items-center gap-1"
            >
              <span>View All Clients</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_SHOOTS.map((shoot) => (
              <div
                key={shoot.id}
                onClick={() => {
                  onOpenProject(shoot.id);
                  onNavigate('project-detail');
                }}
                className="bg-cream-50 rounded-lg border border-warmGray-300 overflow-hidden hover:border-charcoal-900 cursor-pointer group shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-charcoal-950 overflow-hidden">
                    <img
                      src={shoot.coverImage}
                      alt={shoot.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-charcoal-950/80 text-gold-400 border border-gold-500/40">
                        {shoot.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950 group-hover:text-gold-700 transition-colors">
                      {shoot.clientName}
                    </h4>
                    <p className="text-xs text-charcoal-600 line-clamp-1">{shoot.title}</p>
                    <p className="text-[11px] text-warmGray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold-600" /> {shoot.date} • {shoot.city}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-cream-100 border-t border-warmGray-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-charcoal-900 group-hover:text-gold-700">
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Upcoming Shoots & Payment Reminders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Upcoming Shoots (8 cols) */}
          <div className="lg:col-span-8">
            <UpcomingShootsList 
              onNavigate={onNavigate} 
              onOpenProject={onOpenProject} 
            />
          </div>

          {/* Payment Reminders (4 cols) */}
          <div className="lg:col-span-4 bg-cream-50 rounded-lg p-6 border border-warmGray-300 space-y-5">
            <div className="flex items-center justify-between border-b border-warmGray-200 pb-3">
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                Payment Reminders
              </h3>
              <button 
                onClick={() => onNavigate('payments')}
                className="text-[10px] uppercase font-bold text-gold-700"
              >
                All →
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_PAYMENT_MILESTONES.map((ms) => (
                <div key={ms.id} className="p-3 bg-white rounded border border-warmGray-300 text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-charcoal-950">{ms.title}</span>
                    <span className="font-mono">₹{ms.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-warmGray-500">Due: {ms.dueDate}</span>
                    <span className={`font-semibold ${ms.status === 'Paid' ? 'text-emerald-700' : 'text-amber-800'}`}>
                      {ms.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('payments')}
              className="w-full py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest text-center"
            >
              Open Financial Ledger
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
