import React, { useState } from 'react';
import { Client, ViewMode } from '../../types';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Sparkles, 
  FileText, 
  CreditCard, 
  Image as ImageIcon, 
  Star, 
  MessageSquare, 
  Send, 
  Clock,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

interface ClientWorkspaceModalProps {
  client: Client | null;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
}

type ClientTab = 'overview' | 'messages' | 'quotes' | 'payments' | 'galleries' | 'feedback';

export const ClientWorkspaceModal: React.FC<ClientWorkspaceModalProps> = ({
  client,
  onClose,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<ClientTab>('overview');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Client', text: 'Hi Karthik, we loved the moodboard you shared for the temple ceremony!', time: '14 May, 10:15 AM' },
    { sender: 'Studio', text: 'Thank you Priya! Our crew has completed location scouting at Le Méridien courtyard as well.', time: '14 May, 02:30 PM' },
    { sender: 'Client', text: 'Wonderful! When can we expect the preliminary culling preview?', time: '21 June, 09:00 AM' },
    { sender: 'Studio', text: 'Our AI culling engine is 84% through the 5,000 RAW frames. Private preview link coming today!', time: '21 June, 11:20 AM' },
  ]);

  if (!client) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: 'Studio', text: newMessage, time: 'Just now' }]);
    setNewMessage('');
  };

  const tabs: { id: ClientTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'quotes', label: 'Quotations', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'galleries', label: 'Galleries', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'feedback', label: 'Feedback', icon: <Star className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-cream-100 border border-warmGray-300 w-full max-w-5xl h-[90vh] rounded-lg shadow-luxury overflow-hidden text-charcoal-900 flex flex-col">
        
        {/* Header with Client Photo */}
        <div className="relative bg-charcoal-950 text-cream-100 p-6 sm:p-8 border-b border-charcoal-800 flex items-center justify-between">
          
          <div className="flex items-center gap-4 sm:gap-6 z-10">
            <img
              src={client.avatarUrl}
              alt={client.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gold-500 shadow-luxury-dark"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 bg-charcoal-900 border border-charcoal-700 px-2 py-0.5 rounded">
                  {client.eventType}
                </span>
                <span className="text-xs text-warmGray-400 font-mono">
                  Client ID: #{client.id}
                </span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase text-cream-50 mt-1">
                {client.name} {client.partnerName && `& ${client.partnerName}`}
              </h2>
              <p className="text-xs text-warmGray-400 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gold-500" /> {client.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gold-500" /> {client.eventDate}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-warmGray-400 hover:text-cream-50 hover:bg-charcoal-850 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-cream-50 border-b border-warmGray-300 flex items-center space-x-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === t.id
                  ? 'border-charcoal-950 text-charcoal-950 font-bold bg-cream-100/80'
                  : 'border-transparent text-charcoal-600 hover:text-charcoal-950'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-cream-100">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Contact Card */}
                <div className="bg-cream-50 p-5 rounded border border-warmGray-300 space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal-950 border-b border-warmGray-200 pb-2">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-xs">
                    <p className="flex items-center gap-2 text-charcoal-800">
                      <Mail className="w-3.5 h-3.5 text-gold-600" />
                      <a href={`mailto:${client.email}`} className="hover:underline">{client.email}</a>
                    </p>
                    <p className="flex items-center gap-2 text-charcoal-800">
                      <Phone className="w-3.5 h-3.5 text-gold-600" />
                      <span>{client.phone}</span>
                    </p>
                    <p className="flex items-center gap-2 text-charcoal-800">
                      <MapPin className="w-3.5 h-3.5 text-gold-600" />
                      <span>{client.location}</span>
                    </p>
                  </div>
                </div>

                {/* Package & Contract */}
                <div className="bg-cream-50 p-5 rounded border border-warmGray-300 space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal-950 border-b border-warmGray-200 pb-2">
                    Booked Package
                  </h4>
                  <p className="text-sm font-serif-luxury font-bold uppercase text-charcoal-950">
                    {client.packageTitle}
                  </p>
                  <div className="text-xs space-y-1 text-charcoal-700">
                    <p>Total Investment: <strong>₹{client.totalAmount.toLocaleString('en-IN')}</strong></p>
                    <p>Deposit Paid: <strong className="text-emerald-700">₹{client.paidAmount.toLocaleString('en-IN')} ✓</strong></p>
                    <p>Balance Due: <strong>₹{(client.totalAmount - client.paidAmount).toLocaleString('en-IN')}</strong></p>
                  </div>
                </div>

                {/* AI Progress Card */}
                <div className="bg-charcoal-950 text-cream-100 p-5 rounded border border-gold-500/50 shadow-luxury-dark space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gold-400">
                      AI Workflow
                    </h4>
                    <Sparkles className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="font-serif-luxury text-2xl font-bold text-cream-50">
                      {client.cullingProgress || 0}% Complete
                    </span>
                    <p className="text-[11px] text-warmGray-400 mt-1">
                      {client.cullingProgress ? '5,000 photos analyzed' : 'Awaiting shoot upload'}
                    </p>
                  </div>
                  <button
                    onClick={() => { onNavigate('ai-culling'); onClose(); }}
                    className="w-full py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-[11px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Open AI Culling Suite →
                  </button>
                </div>

              </div>

              {/* Notes */}
              <div className="bg-cream-50 p-6 rounded border border-warmGray-300">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal-950 mb-2">
                  Client Notes & Vision
                </h4>
                <p className="text-xs text-charcoal-800 leading-relaxed italic">
                  “{client.notes}”
                </p>
              </div>

            </div>
          )}

          {/* 2. MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="bg-cream-50 rounded border border-warmGray-300 h-full flex flex-col">
              <div className="p-4 border-b border-warmGray-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-950">
                  Direct Studio Channel with {client.name}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-medium">
                  Active
                </span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col ${m.sender === 'Studio' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-md p-3.5 rounded text-xs leading-relaxed ${
                      m.sender === 'Studio' 
                        ? 'bg-charcoal-900 text-cream-100 rounded-br-none' 
                        : 'bg-white border border-warmGray-300 text-charcoal-900 rounded-bl-none shadow-sm'
                    }`}>
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[9px] text-warmGray-500 mt-1 px-1">{m.sender} • {m.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-warmGray-200 bg-cream-100 flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message or gallery update..."
                  className="flex-1 px-4 py-2 bg-white border border-warmGray-300 rounded text-xs text-charcoal-900 outline-none focus:border-charcoal-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* 3. QUOTATIONS TAB */}
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <div className="bg-cream-50 p-6 rounded border border-warmGray-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded uppercase">
                    Approved Quotation #LC-2026-089
                  </span>
                  <h4 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950 mt-2">
                    {client.packageTitle}
                  </h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Issued: 15 May 2026 • Valid Until: 15 June 2026
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-serif-luxury text-2xl font-bold text-charcoal-950 block">
                    ₹{client.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => { onNavigate('quotations'); onClose(); }}
                    className="mt-2 text-xs uppercase font-bold text-gold-700 hover:underline"
                  >
                    Open Quotation Builder →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="bg-cream-50 p-6 rounded border border-warmGray-300 space-y-4">
              <div className="flex items-center justify-between border-b border-warmGray-200 pb-4">
                <div>
                  <h4 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
                    Payment Ledger
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Total: ₹{client.totalAmount.toLocaleString('en-IN')} • Balance: ₹{(client.totalAmount - client.paidAmount).toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  onClick={() => { onNavigate('payments'); onClose(); }}
                  className="px-4 py-2 bg-charcoal-900 text-cream-50 rounded text-xs uppercase font-bold tracking-widest"
                >
                  Record Payment
                </button>
              </div>

              <div className="divide-y divide-warmGray-200 text-xs">
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <strong>Advance Deposit (35%)</strong>
                    <p className="text-[10px] text-warmGray-500">Paid via UPI on 17 May 2026 (Ref: #991823719)</p>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">₹{client.paidAmount.toLocaleString('en-IN')} ✓</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <strong>Balance on Gallery Delivery (65%)</strong>
                    <p className="text-[10px] text-warmGray-500">Due upon final high-resolution handover</p>
                  </div>
                  <span className="font-mono font-bold text-amber-800">₹{(client.totalAmount - client.paidAmount).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. GALLERIES TAB */}
          {activeTab === 'galleries' && (
            <div className="bg-cream-50 p-6 rounded border border-warmGray-300 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border border-warmGray-400 bg-cream-200 flex items-center justify-center mx-auto text-charcoal-900">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Client Proofing Collection
              </h4>
              <p className="text-xs text-charcoal-600 max-w-md mx-auto">
                Once AI culling and color grading are complete, the client will access their private full-bleed showcase gallery.
              </p>
              <button
                onClick={() => { onNavigate('galleries'); onClose(); }}
                className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest"
              >
                Launch Luxury Gallery →
              </button>
            </div>
          )}

          {/* 6. FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <div className="bg-cream-50 p-6 rounded border border-warmGray-300 space-y-4">
              <div className="flex items-center gap-1 text-gold-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-500" />
                ))}
                <span className="text-xs font-mono font-bold text-charcoal-950 ml-2">5.0 / 5.0 Rating</span>
              </div>
              <blockquote className="font-serif-luxury text-lg italic text-charcoal-900 border-l-2 border-gold-600 pl-4 py-1">
                “{client.feedbackText || 'Every moment was captured with such grace and soul. The AI culling saved us weeks of waiting!'}”
              </blockquote>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
