import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { MOCK_CLIENTS, MOCK_PAYMENT_MILESTONES } from '../../data/mockData';
import { 
  CreditCard, 
  CheckCircle2, 
  Download, 
  Lock, 
  Sparkles, 
  ShieldCheck,
  ArrowRight,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClientPaymentPortalProps {
  onNavigate: (view: ViewMode) => void;
}

export const ClientPaymentPortal: React.FC<ClientPaymentPortalProps> = ({ onNavigate }) => {
  const client = MOCK_CLIENTS[0];
  const [balancePaid, setBalancePaid] = useState(false);

  const handlePayBalance = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#1A1714', '#F5F0E6']
    });
    setBalancePaid(true);
  };

  const totalAmount = client.totalAmount; // 85000
  const advancePaid = client.paidAmount; // 30000
  const balanceDue = balancePaid ? 0 : totalAmount - advancePaid; // 55000

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-700 block mb-1">
            CLIENT FINANCIAL LEDGER
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
            Payment & Invoices
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Review milestone invoices, download receipts, and settle remaining balances online.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* Balance Overview Card */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-warmGray-300 shadow-luxury space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-cream-50 rounded border border-warmGray-200">
              <span className="text-[10px] uppercase font-bold text-warmGray-500 tracking-wider block mb-1">
                PACKAGE TOTAL
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-charcoal-950">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-4 bg-emerald-50 rounded border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block mb-1">
                ADVANCE RECEIVED
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-emerald-800">
                ₹{(advancePaid + (balancePaid ? 55000 : 0)).toLocaleString('en-IN')} ✓
              </span>
            </div>

            <div className="p-4 bg-cream-100 rounded border border-charcoal-900">
              <span className="text-[10px] uppercase font-bold text-charcoal-800 tracking-wider block mb-1">
                REMAINING BALANCE DUE
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-700">
                ₹{balanceDue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Settle Action */}
          {balanceDue > 0 ? (
            <div className="p-6 bg-charcoal-950 text-cream-100 rounded-lg border border-gold-500/80 space-y-4 shadow-luxury-dark">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gold-400 tracking-widest block">
                    ONLINE PAYMENT GATEWAY
                  </span>
                  <h4 className="font-serif-luxury text-xl font-bold uppercase text-cream-50">
                    Settle Remaining Balance: ₹55,000
                  </h4>
                  <p className="text-xs text-warmGray-400 mt-0.5">
                    UPI (Google Pay / PhonePe), NetBanking & Major Credit Cards accepted.
                  </p>
                </div>

                <button
                  onClick={handlePayBalance}
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>PAY ₹55,000 NOW →</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-100 border border-emerald-300 rounded text-emerald-900 text-xs flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Full package payment settled! Official GST Tax Invoice is available for download.</span>
            </div>
          )}

          {/* Payment Milestone List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-[11px] uppercase font-bold tracking-wider text-charcoal-950">
              Payment History & Receipts
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 bg-cream-50 rounded border border-warmGray-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal-950">Advance Deposit (35%)</span>
                    <span className="px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase">
                      Paid ✓
                    </span>
                  </div>
                  <span className="text-[11px] text-warmGray-500 font-mono">17 May 2026 • UPI Ref: HDFC991823719</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-charcoal-950">₹30,000</span>
                  <button 
                    onClick={() => alert('Downloading GST Receipt #RC-101')}
                    className="p-1.5 hover:bg-cream-200 rounded text-charcoal-700"
                    title="Download Receipt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-cream-50 rounded border border-warmGray-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal-950">Final Balance & Heirloom Album (65%)</span>
                    <span className={`px-2 py-0.2 rounded text-[9px] font-bold uppercase ${
                      balancePaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {balancePaid ? 'Paid ✓' : 'Due on Delivery'}
                    </span>
                  </div>
                  <span className="text-[11px] text-warmGray-500 font-mono">Due: 10 July 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-charcoal-950">₹55,000</span>
                  {balancePaid && (
                    <button 
                      onClick={() => alert('Downloading GST Receipt #RC-102')}
                      className="p-1.5 hover:bg-cream-200 rounded text-charcoal-700"
                      title="Download Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
