import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { WORKFLOW_STAGES } from '../../data/mockData';
import { ViewMode } from '../../types';

interface WorkflowDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const WorkflowDetailModal: React.FC<WorkflowDetailModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-cream-100 border border-warmGray-300 w-full max-w-5xl rounded-lg shadow-luxury overflow-hidden text-charcoal-900 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-warmGray-300 bg-cream-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block">
              THE 12-STAGE LENSCRAFT PIPELINE
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-charcoal-950 font-bold uppercase tracking-tight">
              From First Message to Final Frame.
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-charcoal-700 hover:text-charcoal-950 hover:bg-cream-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-sm text-charcoal-700 max-w-3xl leading-relaxed">
            Unlike generic CRM dashboards, LensCraft AI adapts organically to the photographer’s authentic creative cycle. Every shoot transitions seamlessly from inquiry to AI culling, client proofing, and long-term business analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WORKFLOW_STAGES.map((stage, index) => {
              const isAi = stage.id === 'ai-culling';
              return (
                <div 
                  key={stage.id}
                  className={`p-5 rounded border transition-all duration-200 relative group ${
                    isAi
                      ? 'bg-charcoal-950 text-cream-100 border-gold-500 shadow-luxury-dark ring-1 ring-gold-500/50'
                      : stage.completed
                      ? 'bg-cream-50 border-warmGray-300 hover:border-charcoal-700'
                      : 'bg-white/80 border-warmGray-200 hover:border-warmGray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold tracking-widest ${isAi ? 'text-gold-400' : 'text-charcoal-900'}`}>
                      {stage.stepNumber}
                    </span>
                    {stage.completed ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : isAi ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-charcoal-950 bg-gold-400 px-2 py-0.5 rounded">
                        <Sparkles className="w-3 h-3" /> Signature AI
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider text-warmGray-500">
                        {stage.meta || 'Pending'}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-serif-luxury text-lg font-bold uppercase tracking-wide mb-1.5 ${isAi ? 'text-cream-50' : 'text-charcoal-950'}`}>
                    {stage.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isAi ? 'text-warmGray-300' : 'text-charcoal-700'}`}>
                    {stage.description}
                  </p>

                  {/* Stage Jump Button */}
                  <button
                    onClick={() => {
                      if (stage.id === 'ai-culling') onNavigate('ai-culling');
                      else if (stage.id === 'quotation') onNavigate('quotations');
                      else if (stage.id === 'gallery' || stage.id === 'delivery') onNavigate('galleries');
                      else if (stage.id === 'payment') onNavigate('payments');
                      else if (stage.id === 'feedback') onNavigate('feedback');
                      else onNavigate('project');
                      onClose();
                    }}
                    className={`mt-4 text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 transition-transform group-hover:translate-x-1 ${
                      isAi ? 'text-gold-400 hover:text-gold-300' : 'text-charcoal-900 hover:text-gold-600'
                    }`}
                  >
                    Open Stage View <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-cream-200 border-t border-warmGray-300 flex items-center justify-between">
          <span className="text-xs text-charcoal-600">
            Total Pipeline Velocity: <strong>75% Faster Delivery with AI</strong>
          </span>
          <button
            onClick={() => {
              onNavigate('project');
              onClose();
            }}
            className="px-5 py-2 bg-charcoal-900 hover:bg-charcoal-950 text-cream-100 rounded text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            Launch Active Project Workspace <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
