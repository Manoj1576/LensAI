import React, { useState } from 'react';
import { ViewMode, LeadItem, ShootCategory } from '../../types';
import { MOCK_LEADS } from '../../data/mockData';
import { 
  Users, 
  Plus, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  X, 
  Clock, 
  Sparkles,
  Phone,
  Mail,
  Filter,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeadsPipelineViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenQuotationBuilder: (lead: LeadItem) => void;
}

export const LeadsPipelineView: React.FC<LeadsPipelineViewProps> = ({
  onNavigate,
  onOpenQuotationBuilder
}) => {
  const [leads, setLeads] = useState<LeadItem[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // New lead form state
  const [clientName, setClientName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState<ShootCategory>('Wedding');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [location, setLocation] = useState('Goa Beach Resort');
  const [budget, setBudget] = useState('120000');
  const [source, setSource] = useState<LeadItem['source']>('Instagram');
  const [notes, setNotes] = useState('');

  const columns: { id: LeadItem['status']; label: string }[] = [
    { id: 'new', label: 'New Inquiries' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'quoted', label: 'Quotation Sent' },
    { id: 'follow-up', label: 'Follow-Up' },
    { id: 'booked', label: 'Confirmed Booking' },
  ];

  const filteredLeads = leads.filter(l => 
    filterCategory === 'All' || l.eventType === filterCategory
  );

  const handleMoveLeadStage = (leadId: string, newStage: LeadItem['status']) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStage } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStage } : null);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) return;

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      clientName,
      partnerName: partnerName || undefined,
      email: email || `${clientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: phone || '+91 98400 99887',
      eventType,
      eventDate,
      location,
      budget: parseInt(budget) || 95000,
      source,
      status: 'new',
      notes,
      createdAt: 'Just now',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
    };

    setLeads([newLead, ...leads]);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#1A1714']
    });
    setShowNewLeadModal(false);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                INQUIRY PIPELINE & LEAD QUALIFICATION
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Inquiry Pipeline
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Track client inquiries from initial message to confirmed booking deposit.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNewLeadModal(true)}
                className="px-5 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-gold-400" />
                <span>Add Inquiry</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-cream-50 rounded-lg p-4 border border-warmGray-300 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Wedding', 'Pre-Wedding', 'Portrait', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  filterCategory === cat
                    ? 'bg-charcoal-900 text-cream-50'
                    : 'bg-cream-200 text-charcoal-800 hover:bg-cream-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-charcoal-600 font-semibold">
            {filteredLeads.length} Total Leads Active
          </span>
        </div>
      </div>

      {/* Main Kanban Pipeline Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
          {columns.map((col) => {
            const colLeads = filteredLeads.filter(l => l.status === col.id);
            const colTotalBudget = colLeads.reduce((sum, l) => sum + l.budget, 0);

            return (
              <div
                key={col.id}
                className="bg-cream-50 p-4 rounded-lg border border-warmGray-300 min-w-[250px] flex flex-col space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-warmGray-300">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-950 block">
                      {col.label}
                    </span>
                    <span className="text-[10px] font-mono text-warmGray-500">
                      ₹{(colTotalBudget / 1000).toFixed(0)}k pipeline
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-cream-200 text-charcoal-800 rounded font-bold">
                    {colLeads.length}
                  </span>
                </div>

                {/* Lead Cards List */}
                <div className="space-y-3 flex-1">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="bg-white p-4 rounded border border-warmGray-300 hover:border-charcoal-900 cursor-pointer shadow-sm hover:shadow-md transition-all space-y-2.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-cream-100 text-gold-700 rounded border border-warmGray-200">
                          {lead.eventType}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-charcoal-900">
                          ₹{lead.budget.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif-luxury text-base font-bold uppercase text-charcoal-950 group-hover:text-gold-700 transition-colors">
                          {lead.clientName} {lead.partnerName && `& ${lead.partnerName}`}
                        </h4>
                        <p className="text-[11px] text-warmGray-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gold-600" />
                          <span>{lead.location}</span>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-warmGray-200 flex items-center justify-between text-[10px] text-warmGray-500">
                        <span>Source: <strong className="text-charcoal-800">{lead.source}</strong></span>
                        <span>{lead.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Details Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-charcoal-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-cream-50 border-l border-warmGray-300 w-full max-w-lg h-full p-6 sm:p-8 overflow-y-auto flex flex-col justify-between text-charcoal-900 shadow-luxury-dark">
            
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-warmGray-300 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                  LEAD PROFILE #{selectedLead.id}
                </span>
                <button onClick={() => setSelectedLead(null)} className="p-1 hover:bg-cream-200 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-charcoal-900 text-cream-50">
                    {selectedLead.eventType}
                  </span>
                  <span className="text-xs font-mono text-warmGray-500">via {selectedLead.source}</span>
                </div>
                <h3 className="font-serif-luxury text-3xl font-bold uppercase text-charcoal-950">
                  {selectedLead.clientName} {selectedLead.partnerName && `& ${selectedLead.partnerName}`}
                </h3>
              </div>

              {/* Specs Grid */}
              <div className="bg-white p-4 rounded border border-warmGray-300 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-500">Event Date:</span>
                  <strong className="text-charcoal-950">{selectedLead.eventDate}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-500">Venue Location:</span>
                  <strong className="text-charcoal-950">{selectedLead.location}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-500">Estimated Budget:</span>
                  <strong className="font-mono text-charcoal-950 font-bold">₹{selectedLead.budget.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-500">Email:</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-charcoal-900 underline">{selectedLead.email}</a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warmGray-500">Phone:</span>
                  <span className="text-charcoal-900">{selectedLead.phone}</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-[11px] uppercase tracking-widest text-warmGray-500 font-bold mb-1">
                  Client Brief & Vision
                </h4>
                <p className="p-3 bg-white rounded border border-warmGray-300 text-xs text-charcoal-800 leading-relaxed italic">
                  “{selectedLead.notes}”
                </p>
              </div>

              {/* Stage Mover Controls */}
              <div>
                <h4 className="text-[11px] uppercase tracking-widest text-warmGray-500 font-bold mb-2">
                  Update Pipeline Stage
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {columns.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleMoveLeadStage(selectedLead.id, c.id)}
                      className={`py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        selectedLead.status === c.id
                          ? 'bg-charcoal-900 text-cream-50 font-bold shadow-sm'
                          : 'bg-white border border-warmGray-300 hover:bg-cream-200 text-charcoal-700'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-warmGray-300 space-y-3">
              <button
                onClick={() => {
                  onOpenQuotationBuilder(selectedLead);
                  setSelectedLead(null);
                }}
                className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-gold-glow flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>CREATE QUOTATION NOW →</span>
              </button>

              <button
                onClick={() => setSelectedLead(null)}
                className="w-full py-2 bg-cream-200 text-charcoal-700 hover:text-charcoal-950 rounded text-xs uppercase font-semibold"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-lg rounded-lg shadow-luxury-dark overflow-hidden text-cream-100 p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-charcoal-800">
              <h3 className="font-serif-luxury text-lg font-bold uppercase text-cream-50">
                Register New Inquiry Lead
              </h3>
              <button onClick={() => setShowNewLeadModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-warmGray-400 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-2 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-warmGray-400 mb-1">Partner Name</label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full p-2 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-warmGray-400 mb-1">Category</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as ShootCategory)}
                    className="w-full p-2 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-warmGray-400 mb-1">Estimated Budget (₹)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 font-mono outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-warmGray-400 mb-1">Venue / City</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-warmGray-400 mb-1">Lead Source</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as LeadItem['source'])}
                    className="w-full p-2 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="WeddingWire">WeddingWire</option>
                    <option value="Vogue Feature">Vogue Feature</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-warmGray-400 mb-1">Inquiry Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Details regarding rituals, venue, dates..."
                  className="w-full p-2 bg-charcoal-850 border border-charcoal-700 rounded text-cream-50 outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowNewLeadModal(false)} className="px-3 py-1.5 text-warmGray-400">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded font-bold uppercase tracking-wider">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
