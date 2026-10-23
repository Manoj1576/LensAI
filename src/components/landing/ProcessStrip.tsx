import React from 'react';
import { ViewMode } from '../../types';
import { 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  Camera, 
  Sparkles, 
  Send, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface ProcessStripProps {
  onNavigate: (view: ViewMode) => void;
  onOpenFullWorkflow: () => void;
}

export const ProcessStrip: React.FC<ProcessStripProps> = ({
  onNavigate,
  onOpenFullWorkflow
}) => {
  const steps = [
    {
      number: '01',
      title: 'INQUIRY',
      desc: 'Client sends session vision & dates.',
      icon: <MessageSquare className="w-5 h-5" />,
      target: 'clients' as ViewMode
    },
    {
      number: '02',
      title: 'QUOTATION',
      desc: 'Photographer creates curated package.',
      icon: <FileText className="w-5 h-5" />,
      target: 'quotations' as ViewMode
    },
    {
      number: '03',
      title: 'BOOKING',
      desc: 'Quotation accepted & advance secured.',
      icon: <CheckCircle className="w-5 h-5" />,
      target: 'payments' as ViewMode
    },
    {
      number: '04',
      title: 'SHOOT',
      desc: 'Shoot schedule, crew & shot-list.',
      icon: <Camera className="w-5 h-5" />,
      target: 'calendar' as ViewMode
    },
    {
      number: '05',
      title: 'AI CULLING',
      desc: 'AI scores sharpness, eyes & duplicates.',
      icon: <Sparkles className="w-5 h-5 text-gold-600" />,
      target: 'ai-culling' as ViewMode,
      isAi: true
    },
    {
      number: '06',
      title: 'DELIVERY',
      desc: 'Luxury client gallery & high-res files.',
      icon: <Send className="w-5 h-5" />,
      target: 'galleries' as ViewMode
    }
  ];

  return (
    <section className="bg-cream-100 py-20 border-b border-warmGray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-2">
              THE LENSCRAFT CREATIVE PIPELINE
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-charcoal-950 font-bold uppercase tracking-tight">
              From First Message To Final Frame.
            </h2>
          </div>

          <button
            onClick={onOpenFullWorkflow}
            className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-semibold uppercase tracking-widest transition-all self-start md:self-auto shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Explore Full 12-Stage Workflow</span>
          </button>
        </div>

        {/* Horizontal Process Row with Connected Lines */}
        <div className="relative">
          
          {/* Connecting Line across desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] bg-warmGray-400 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(step.target)}
                className="group cursor-pointer flex flex-col items-center text-center p-4 rounded hover:bg-cream-50 transition-colors"
              >
                {/* Circular Step Icon */}
                <div className={`relative w-14 h-14 rounded-full border flex items-center justify-center mb-4 transition-all duration-300 ${
                  step.isAi 
                    ? 'bg-charcoal-950 text-gold-400 border-gold-500 shadow-gold-glow group-hover:scale-110' 
                    : 'bg-cream-50 text-charcoal-900 border-warmGray-400 group-hover:border-charcoal-900 group-hover:scale-105'
                }`}>
                  {step.icon}
                  {/* Step Number Tag */}
                  <span className={`absolute -bottom-2 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold tracking-widest ${
                    step.isAi ? 'bg-gold-500 text-charcoal-950' : 'bg-charcoal-900 text-cream-50'
                  }`}>
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-base font-bold uppercase text-charcoal-950 tracking-wider mb-1 group-hover:text-gold-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-[11px] text-charcoal-600 leading-snug">
                  {step.desc}
                </p>

                <span className="mt-3 text-[9px] uppercase tracking-widest font-semibold text-warmGray-500 group-hover:text-charcoal-900 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
