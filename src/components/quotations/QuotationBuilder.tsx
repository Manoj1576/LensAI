import React, { useState } from 'react';
import { ViewMode, ServiceItem } from '../../types';
import { MOCK_SERVICES, MOCK_CLIENTS } from '../../data/mockData';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Send, 
  Check, 
  Download, 
  Eye, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuotationBuilderProps {
  onNavigate: (view: ViewMode) => void;
}

export const QuotationBuilder: React.FC<QuotationBuilderProps> = ({ onNavigate }) => {
  const [selectedClientId, setSelectedClientId] = useState(MOCK_CLIENTS[0].id);
  const [services, setServices] = useState<ServiceItem[]>(MOCK_SERVICES);
  const [discountPercent, setDiscountPercent] = useState(10);
  const [taxPercent, setTaxPercent] = useState(18); // GST
  const [advancePercent, setAdvancePercent] = useState(35);
  const [quoteNotes, setQuoteNotes] = useState(
    'Includes pre-wedding consultation, high-resolution online private gallery for 1 year, and raw archive backup.'
  );
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const selectedClient = MOCK_CLIENTS.find(c => c.id === selectedClientId) || MOCK_CLIENTS[0];

  const toggleService = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setServices(services.map(s => s.id === id ? { ...s, quantity: qty } : s));
  };

  const activeServices = services.filter(s => s.selected);
  const subtotal = activeServices.reduce((sum, s) => sum + (s.rate * s.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const total = taxableAmount + taxAmount;
  const advanceAmount = (total * advancePercent) / 100;
  const balanceDue = total - advanceAmount;

  const handleSendQuote = () => {
    setIsSent(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#B08A55', '#1A1714']
    });
    setTimeout(() => {
      setShowPreviewModal(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                COMMERCIAL PROPOSAL ARCHITECTURE
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Quotation & Package Builder
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Create bespoke, high-conversion proposals for luxury clients.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreviewModal(true)}
                className="px-4 py-2.5 bg-cream-200 hover:bg-cream-300 text-charcoal-900 border border-warmGray-400 rounded text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Quote</span>
              </button>

              <button
                onClick={() => setShowPreviewModal(true)}
                className="px-5 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-gold-400" />
                <span>Send to Client</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Client Selector & Service Items */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Target Client Select */}
            <div className="bg-cream-50 rounded-lg p-6 border border-warmGray-300">
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-500 font-bold mb-2">
                Recipient Client Dossier
              </label>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-warmGray-300 rounded text-sm font-semibold text-charcoal-950 outline-none focus:border-charcoal-900"
              >
                {MOCK_CLIENTS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.partnerName && `& ${c.partnerName}`} — {c.eventType} ({c.eventDate} • {c.location})
                  </option>
                ))}
              </select>
            </div>

            {/* Service Items Customizer */}
            <div className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-warmGray-200">
                <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                  Select Package Deliverables & Add-ons
                </h3>
                <span className="text-xs font-mono text-charcoal-600">
                  {activeServices.length} Selected
                </span>
              </div>

              <div className="space-y-3">
                {services.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      item.selected
                        ? 'bg-white border-charcoal-900 shadow-sm'
                        : 'bg-cream-100/60 border-warmGray-300 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleService(item.id)}
                        className="w-4 h-4 accent-charcoal-900 mt-1 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-charcoal-950">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-charcoal-600 mt-0.5 max-w-md">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 self-end sm:self-center">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-warmGray-500 uppercase">Qty:</span>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          disabled={!item.selected}
                          className="w-12 px-2 py-1 bg-cream-100 border border-warmGray-300 rounded text-center text-xs font-mono font-bold text-charcoal-950"
                        />
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="font-mono font-bold text-xs text-charcoal-950 block">
                          ₹{(item.rate * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-warmGray-500 font-mono">
                          ₹{item.rate.toLocaleString('en-IN')} / {item.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes and Terms */}
            <div className="bg-cream-50 rounded-lg p-6 border border-warmGray-300">
              <label className="block text-[11px] uppercase tracking-widest text-warmGray-500 font-bold mb-2">
                Custom Proposal Clauses & Scope Notes
              </label>
              <textarea
                rows={3}
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
                className="w-full p-3 bg-white border border-warmGray-300 rounded text-xs text-charcoal-900 outline-none focus:border-charcoal-900"
              />
            </div>

          </div>

          {/* Right Column (4 cols): Real-Time Financial Summary */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-charcoal-950 text-cream-100 rounded-lg p-6 sm:p-8 border border-charcoal-800 shadow-luxury-dark space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold block mb-1">
                  ESTIMATED INVESTMENT
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-cream-50 font-mono">
                  ₹{Math.round(total).toLocaleString('en-IN')}
                </h3>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 text-xs border-y border-charcoal-850 py-4 text-warmGray-300">
                <div className="flex justify-between">
                  <span>Subtotal ({activeServices.length} Services):</span>
                  <span className="font-mono text-cream-50">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Discount ({discountPercent}%):</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(parseInt(e.target.value) || 0)}
                      className="w-12 px-1.5 py-0.5 bg-charcoal-900 border border-charcoal-700 rounded text-center text-xs font-mono text-gold-400"
                    />
                    <span className="font-mono text-rose-400">-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span>GST ({taxPercent}%):</span>
                  <span className="font-mono text-cream-50">₹{Math.round(taxAmount).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Schedule Breakdown */}
              <div className="space-y-3 pt-1">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block">
                  Payment Milestones
                </span>

                <div className="p-3 bg-charcoal-900 rounded border border-charcoal-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-cream-50 font-bold block">Advance Booking ({advancePercent}%)</span>
                    <span className="text-[10px] text-warmGray-400">Required to secure shoot date</span>
                  </div>
                  <strong className="font-mono text-gold-400 text-sm">
                    ₹{Math.round(advanceAmount).toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="p-3 bg-charcoal-900 rounded border border-charcoal-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-cream-50 font-bold block">Delivery Balance</span>
                    <span className="text-[10px] text-warmGray-400">On full gallery handover</span>
                  </div>
                  <strong className="font-mono text-cream-50 text-sm">
                    ₹{Math.round(balanceDue).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <button
                onClick={() => setShowPreviewModal(true)}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>Review & Send Proposal</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Luxury Quotation Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cream-50 border border-warmGray-300 w-full max-w-3xl max-h-[90vh] rounded-lg shadow-luxury overflow-hidden text-charcoal-900 flex flex-col">
            
            {/* Preview Header */}
            <div className="p-6 border-b border-warmGray-300 bg-cream-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block">
                  CLIENT-FACING PROPOSAL PREVIEW
                </span>
                <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                  Quotation #LC-2026-092
                </h3>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="p-1.5 hover:bg-cream-200 rounded">
                ✕
              </button>
            </div>

            {/* Document Body (Printable Luxury Format) */}
            <div className="p-8 overflow-y-auto space-y-6 bg-white font-sans text-xs">
              
              {/* Studio Header */}
              <div className="flex justify-between items-start border-b border-charcoal-900 pb-4">
                <div>
                  <h2 className="font-serif-luxury text-2xl font-bold uppercase tracking-wider text-charcoal-950">
                    LENSCRAFT STUDIOS
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest text-warmGray-500">Fine Art Photography Atelier</p>
                  <p className="text-[11px] text-charcoal-700 mt-1">Chennai • Bangalore • Coimbatore</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-warmGray-500 font-bold block">PREPARED FOR</span>
                  <h4 className="font-serif-luxury text-lg font-bold text-charcoal-950 uppercase">
                    {selectedClient.name} {selectedClient.partnerName && `& ${selectedClient.partnerName}`}
                  </h4>
                  <p className="text-[11px] text-charcoal-600">{selectedClient.location} • {selectedClient.eventDate}</p>
                </div>
              </div>

              {/* Deliverables Table */}
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-warmGray-300 text-[10px] uppercase tracking-widest text-warmGray-500">
                    <th className="py-2">Item & Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warmGray-200">
                  {activeServices.map((s) => (
                    <tr key={s.id} className="py-3">
                      <td className="py-2.5">
                        <strong className="font-serif-luxury uppercase text-charcoal-950 block">{s.name}</strong>
                        <span className="text-[10px] text-charcoal-600">{s.description}</span>
                      </td>
                      <td className="py-2.5 text-center font-mono">{s.quantity}</td>
                      <td className="py-2.5 text-right font-mono font-bold">
                        ₹{(s.rate * s.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-charcoal-900 flex justify-end">
                <div className="w-64 space-y-1.5 text-right">
                  <div className="flex justify-between text-warmGray-500">
                    <span>Subtotal:</span>
                    <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-rose-700">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="font-mono">-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-warmGray-500">
                    <span>GST (18%):</span>
                    <span className="font-mono">₹{Math.round(taxAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-charcoal-950 pt-2 border-t border-warmGray-300">
                    <span>Total Investment:</span>
                    <span className="font-mono">₹{Math.round(total).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-bold pt-1">
                    <span>Advance Deposit (35%):</span>
                    <span className="font-mono">₹{Math.round(advanceAmount).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="p-3 bg-cream-100 rounded text-[11px] text-charcoal-700 italic border border-warmGray-200">
                “{quoteNotes}”
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="p-4 bg-cream-100 border-t border-warmGray-300 flex items-center justify-between">
              <button
                onClick={() => alert('PDF quotation ready for download.')}
                className="px-4 py-2 bg-white hover:bg-cream-200 border border-warmGray-400 rounded text-xs uppercase font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>

              <button
                onClick={handleSendQuote}
                className="px-6 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-luxury"
              >
                {isSent ? (
                  <>
                    <Check className="w-4 h-4 text-gold-400" />
                    <span>Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-gold-400" />
                    <span>Confirm & Send to {selectedClient.name}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
