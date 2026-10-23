import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { MOCK_QUOTATIONS, MOCK_CLIENTS } from '../../data/mockData';
import { 
  CheckCircle2, 
  FileText, 
  Download, 
  Check, 
  MessageSquare,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClientQuotationViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const ClientQuotationView: React.FC<ClientQuotationViewProps> = ({ onNavigate }) => {
  const quote = MOCK_QUOTATIONS[0];
  const client = MOCK_CLIENTS[0];
  const [status, setStatus] = useState<string>('Approved');

  const handleAccept = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#1A1714', '#F5F0E6']
    });
    setStatus('Approved');
    alert('Proposal officially accepted! Booking confirmed.');
    onNavigate('client-project');
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-700 block mb-1">
              STUDIO PROPOSAL #{quote.quoteNumber}
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
              Quotation Review
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Bespoke photography deliverables prepared for {client.name} & {client.partnerName}.
            </p>
          </div>

          <button
            onClick={() => onNavigate('client-dashboard')}
            className="text-xs uppercase font-bold text-charcoal-700 hover:text-charcoal-950 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Quote Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        <div className="bg-white rounded-lg p-6 sm:p-10 border border-warmGray-300 shadow-luxury space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warmGray-200">
            <div>
              <span className="font-serif-luxury text-xl font-bold tracking-widest text-charcoal-950 uppercase block">
                LENSCRAFT FINE ART STUDIOS
              </span>
              <span className="text-[10px] text-warmGray-500 uppercase tracking-widest">
                Principal Artist: Karthik Raja
              </span>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded uppercase">
                Status: {status} ✓
              </span>
              <p className="text-[10px] text-warmGray-500 mt-1">Valid Until: {quote.validUntil}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase font-bold tracking-wider text-charcoal-950">
              Package Deliverables & Inclusions
            </h4>

            <div className="divide-y divide-warmGray-200 border-y border-warmGray-200 text-xs">
              {quote.services.map((srv) => (
                <div key={srv.id} className="py-3 flex justify-between items-start">
                  <div>
                    <strong className="text-charcoal-950 block">{srv.name}</strong>
                    <span className="text-[11px] text-warmGray-500">{srv.description}</span>
                  </div>
                  <span className="font-mono text-charcoal-950 font-semibold shrink-0 ml-4">
                    ₹{srv.rate.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Totals */}
          <div className="bg-cream-50 p-4 rounded border border-warmGray-200 max-w-sm ml-auto space-y-2 text-xs">
            <div className="flex justify-between text-warmGray-600">
              <span>Subtotal:</span>
              <span className="font-mono">₹{quote.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>Studio Privilege Discount (10%):</span>
              <span className="font-mono">-₹{(quote.subtotal * 0.1).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-warmGray-600">
              <span>GST Tax (18%):</span>
              <span className="font-mono">₹{(quote.subtotal * 0.9 * 0.18).toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold text-charcoal-950 border-t border-warmGray-300 pt-2 text-sm">
              <span>Total Investment:</span>
              <span className="font-mono text-gold-700">₹{quote.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Terms */}
          <div className="p-3 bg-cream-50 rounded text-[11px] text-warmGray-600 italic border border-warmGray-200">
            “Includes pre-wedding moodboard consultation, 1-year private luxury cloud gallery access, non-destructive color grading, and high-res print release.”
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-warmGray-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => alert('Proposal PDF downloaded.')}
              className="px-4 py-2 bg-cream-200 hover:bg-cream-300 text-charcoal-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Proposal PDF
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Feedback message sent to studio.')}
                className="px-4 py-2 bg-white border border-warmGray-300 text-charcoal-700 hover:text-charcoal-950 rounded text-xs font-semibold uppercase tracking-wider"
              >
                Request Minor Adjustment
              </button>

              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Accept Quotation →</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
