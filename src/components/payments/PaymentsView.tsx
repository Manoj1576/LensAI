import React, { useState } from 'react';
import { ViewMode, PaymentMilestone } from '../../types';
import { MOCK_PAYMENT_MILESTONES, MOCK_CLIENTS } from '../../data/mockData';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download, 
  FileText, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({ onNavigate }) => {
  const [milestones, setMilestones] = useState<PaymentMilestone[]>(MOCK_PAYMENT_MILESTONES);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recordAmount, setRecordAmount] = useState('30000');

  const client = MOCK_CLIENTS[0]; // Rahul & Priya
  const totalPackage = 85000;
  const paidTotal = milestones.filter(m => m.status === 'Paid').reduce((sum, m) => sum + m.amount, 0);
  const balancePending = totalPackage - paidTotal;

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(recordAmount) || 0;
    setMilestones(prev => {
      let updated = false;
      return prev.map(m => {
        if (!updated && m.status === 'Pending') {
          updated = true;
          return {
            ...m,
            status: 'Paid',
            paidDate: 'Today (Verified)',
            transactionRef: 'Bank Transfer / NEFT'
          };
        }
        return m;
      });
    });

    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#B08A55', '#1A1714']
    });

    setShowRecordModal(false);
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 2500);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                FINANCIAL LEDGER & MILESTONE SETTLEMENT
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Project Investment
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Active Client: {client.name} & {client.partnerName} (Heritage Wedding Coimbatore)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="px-4 py-2.5 bg-cream-200 hover:bg-cream-300 text-charcoal-900 border border-warmGray-400 rounded text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Invoice</span>
              </button>

              <button
                onClick={() => setShowRecordModal(true)}
                className="px-5 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-gold-400" />
                <span>Record Payment</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* 3 Large Editorial Investment Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Package */}
          <div className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300">
            <span className="text-[10px] uppercase tracking-widest text-warmGray-500 font-bold block mb-2">
              PACKAGE CONTRACT
            </span>
            <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-charcoal-950 font-mono block">
              ₹{totalPackage.toLocaleString('en-IN')}
            </span>
            <p className="text-xs text-charcoal-600 mt-2">
              Heritage Royal Wedding Suite (8 Hours Dual Coverage)
            </p>
          </div>

          {/* Advance Paid */}
          <div className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold block">
                ADVANCE RECEIVED
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                Verified ✓
              </span>
            </div>
            <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-emerald-800 font-mono block">
              ₹{paidTotal.toLocaleString('en-IN')}
            </span>
            <p className="text-xs text-charcoal-600 mt-2">
              {Math.round((paidTotal / totalPackage) * 100)}% of total investment secured
            </p>
          </div>

          {/* Balance Pending */}
          <div className="bg-charcoal-950 text-cream-100 rounded-lg p-6 sm:p-8 border border-charcoal-800 shadow-luxury-dark">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block">
                BALANCE PENDING
              </span>
              <span className="text-[10px] text-amber-400 bg-charcoal-900 border border-amber-500/40 px-2 py-0.5 rounded">
                Milestone Due
              </span>
            </div>
            <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-cream-50 font-mono block">
              ₹{balancePending.toLocaleString('en-IN')}
            </span>
            <p className="text-xs text-warmGray-300 mt-2">
              Payable upon high-res gallery delivery
            </p>
          </div>

        </div>

        {/* Milestone Timeline Card */}
        <div className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warmGray-200">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Milestone Payment Schedule
              </h3>
              <p className="text-xs text-charcoal-600">
                Contractual payment schedule tied directly to production delivery phases.
              </p>
            </div>

            <button
              onClick={handleSendReminder}
              className="px-4 py-2 bg-cream-200 hover:bg-cream-300 text-charcoal-900 border border-warmGray-400 rounded text-xs uppercase font-bold tracking-widest flex items-center gap-1.5 self-start sm:self-auto"
            >
              {reminderSent ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Send className="w-3.5 h-3.5" />}
              <span>{reminderSent ? 'Reminder Dispatched!' : 'Send Client Reminder'}</span>
            </button>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-4">
            {milestones.map((ms, idx) => {
              const isPaid = ms.status === 'Paid';

              return (
                <div
                  key={ms.id}
                  className={`p-4 rounded border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isPaid ? 'bg-white border-warmGray-300' : 'bg-cream-100/70 border-warmGray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-warmGray-300 text-charcoal-700'
                    }`}>
                      {isPaid ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-charcoal-950">
                        {ms.title}
                      </h4>
                      <p className="text-[11px] text-charcoal-600">
                        Due: {ms.dueDate} {ms.paidDate && `• ${ms.paidDate}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="font-mono text-sm font-bold text-charcoal-950">
                      ₹{ms.amount.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded ${
                      isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ms.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-md rounded-lg p-6 text-cream-100 space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold uppercase text-cream-50">
              Record Client Payment
            </h3>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-warmGray-400 font-medium mb-1">
                  Amount Received (₹)
                </label>
                <input
                  type="number"
                  value={recordAmount}
                  onChange={(e) => setRecordAmount(e.target.value)}
                  className="w-full p-2.5 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 text-sm font-mono outline-none focus:border-gold-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="px-4 py-2 text-xs uppercase text-warmGray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest"
                >
                  Confirm & Update Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Luxury Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cream-50 border border-warmGray-300 w-full max-w-2xl max-h-[90vh] rounded-lg shadow-luxury overflow-hidden text-charcoal-900 flex flex-col">
            <div className="p-4 bg-cream-100 border-b border-warmGray-300 flex justify-between items-center">
              <span className="font-serif-luxury font-bold uppercase text-xs">Official Studio Tax Invoice</span>
              <button onClick={() => setShowInvoiceModal(false)}>✕</button>
            </div>
            <div className="p-8 overflow-y-auto space-y-6 bg-white text-xs">
              <div className="flex justify-between border-b border-charcoal-950 pb-4">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold uppercase">LENSCRAFT AI STUDIOS</h3>
                  <p className="text-[10px] text-warmGray-500">GSTIN: 33AAACL1234F1Z8</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold block">INVOICE #INV-2026-089</span>
                  <span className="text-[10px] text-warmGray-500">Date: 20 June 2026</span>
                </div>
              </div>
              <div>
                <p className="text-warmGray-500 uppercase text-[10px] font-bold">Billed To:</p>
                <p className="font-bold text-sm uppercase">{client.name} & {client.partnerName}</p>
                <p>{client.location}</p>
              </div>
              <div className="border-t border-b border-warmGray-200 py-3 space-y-2">
                <div className="flex justify-between">
                  <span>Heritage Royal Wedding Full Curation:</span>
                  <span className="font-mono font-bold">₹85,000</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Advance Deposit Paid (Ref #991823719):</span>
                  <span className="font-mono">-₹30,000</span>
                </div>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Net Balance Due:</span>
                <span className="font-mono text-gold-700">₹55,000</span>
              </div>
            </div>
            <div className="p-4 bg-cream-100 border-t border-warmGray-300 flex justify-end">
              <button 
                onClick={() => alert('Tax invoice downloaded successfully.')}
                className="px-5 py-2 bg-charcoal-900 text-cream-50 rounded text-xs uppercase font-bold tracking-widest flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
