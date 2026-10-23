import React from 'react';
import { ViewMode } from '../../types';
import { WORKFLOW_STAGES } from '../../data/mockData';
import { CheckCircle2, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface HorizontalProjectWorkflowProps {
  onNavigate: (view: ViewMode) => void;
  onOpenFullWorkflowModal: () => void;
}

export const HorizontalProjectWorkflow: React.FC<HorizontalProjectWorkflowProps> = ({
  onNavigate,
  onOpenFullWorkflowModal
}) => {
  return (
    <div className="bg-cream-50 border border-warmGray-300 rounded-lg p-6 sm:p-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block">
            END-TO-END STATUS
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase text-charcoal-950 tracking-tight">
            Project Journey
          </h3>
        </div>

        <button
          onClick={onOpenFullWorkflowModal}
          className="text-xs font-semibold uppercase tracking-widest text-charcoal-900 hover:text-gold-700 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View All 12 Stages</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Scrollable Timeline Strip */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-center min-w-[900px] justify-between relative px-2">
          
          {/* Background Track Line */}
          <div className="absolute top-5 left-6 right-6 h-[2px] bg-warmGray-300 z-0"></div>

          {WORKFLOW_STAGES.map((stage) => {
            const isAi = stage.id === 'ai-culling';
            
            return (
              <div 
                key={stage.id} 
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                onClick={() => {
                  if (stage.id === 'ai-culling') onNavigate('ai-culling');
                  else if (stage.id === 'quotation') onNavigate('quotations');
                  else if (stage.id === 'gallery' || stage.id === 'delivery') onNavigate('galleries');
                  else if (stage.id === 'payment') onNavigate('payments');
                  else if (stage.id === 'feedback') onNavigate('feedback');
                }}
              >
                {/* Node Circle */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  stage.completed
                    ? 'bg-charcoal-900 border-charcoal-900 text-gold-400'
                    : stage.current
                    ? 'bg-gold-500 border-charcoal-950 text-charcoal-950 shadow-gold-glow scale-110 ring-4 ring-gold-500/20 animate-pulse'
                    : 'bg-cream-100 border-warmGray-400 text-warmGray-500 group-hover:border-charcoal-800'
                }`}>
                  {stage.completed ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  ) : stage.current ? (
                    <Sparkles className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span className="text-[11px] font-mono font-bold">{stage.stepNumber}</span>
                  )}
                </div>

                {/* Stage Title */}
                <span className={`mt-3 text-[11px] uppercase tracking-wider font-semibold text-center whitespace-nowrap ${
                  stage.current
                    ? 'text-charcoal-950 font-bold'
                    : stage.completed
                    ? 'text-charcoal-800'
                    : 'text-warmGray-500'
                }`}>
                  {stage.title}
                </span>

                {/* Stage Status Tag */}
                <span className={`text-[9px] uppercase tracking-widest mt-0.5 ${
                  stage.current
                    ? 'text-gold-700 font-bold'
                    : stage.completed
                    ? 'text-emerald-700'
                    : 'text-warmGray-400'
                }`}>
                  {stage.current ? '72% Active' : stage.completed ? 'Done ✓' : '—'}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Progress Summary Callout */}
      <div className="mt-6 pt-4 border-t border-warmGray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-600" />
          <span>Current Active Stage: <strong className="text-charcoal-950">AI Photo Culling (84% Processed)</strong></span>
        </div>
        <button
          onClick={() => onNavigate('ai-culling')}
          className="px-3.5 py-1.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors"
        >
          Continue AI Culling →
        </button>
      </div>

    </div>
  );
};
