import React from 'react';
import { ViewMode } from '../../types';
import { Camera, Sparkles, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-950 text-cream-100 border-t border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-850">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-gold-500 flex items-center justify-center bg-charcoal-900 text-gold-500">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                  <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                  <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                  <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                  <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                  <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                </svg>
              </div>
              <span className="font-serif-luxury text-xl tracking-[0.2em] font-semibold text-cream-50 uppercase">
                LENSCRAFT<span className="text-gold-500 font-sans text-xs ml-1">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-warmGray-400 max-w-sm leading-relaxed">
              The creative operating system engineered exclusively for professional wedding, editorial, and commercial photographers.
            </p>
            
            <div className="pt-2 text-[11px] text-warmGray-500 tracking-widest uppercase flex items-center gap-2">
              <span>Capture</span> • <span>Curate</span> • <span>Deliver</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              Workspace
            </h4>
            <ul className="space-y-2 text-xs text-warmGray-400">
              <li>
                <button onClick={() => onNavigate('workspace')} className="hover:text-cream-50 transition-colors">
                  Studio Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('project')} className="hover:text-cream-50 transition-colors">
                  Active Project
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('clients')} className="hover:text-cream-50 transition-colors">
                  Client CRM & Leads
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calendar')} className="hover:text-cream-50 transition-colors">
                  Shoots Schedule
                </button>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              AI Intelligence
            </h4>
            <ul className="space-y-2 text-xs text-warmGray-400">
              <li>
                <button onClick={() => onNavigate('ai-culling')} className="hover:text-cream-50 transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-500" /> AI Photo Culling
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-culling')} className="hover:text-cream-50 transition-colors">
                  Blink & Blur Detection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-culling')} className="hover:text-cream-50 transition-colors">
                  Burst Similarity Grouping
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analytics')} className="hover:text-cream-50 transition-colors">
                  Time Saved ROI
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery & Finance */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              Business Suite
            </h4>
            <ul className="space-y-2 text-xs text-warmGray-400">
              <li>
                <button onClick={() => onNavigate('galleries')} className="hover:text-cream-50 transition-colors">
                  Luxury Galleries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quotations')} className="hover:text-cream-50 transition-colors">
                  Quotation Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('payments')} className="hover:text-cream-50 transition-colors">
                  Milestone Payments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('feedback')} className="hover:text-cream-50 transition-colors">
                  Kind Words & Reviews
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmGray-500">
          <p>© 2026 LENSCRAFT AI Inc. Crafted with devotion for photographers worldwide.</p>
          <div className="flex items-center gap-6">
            <button onClick={scrollToTop} className="hover:text-gold-400 transition-colors flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
