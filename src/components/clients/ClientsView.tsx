import React, { useState } from 'react';
import { Client, ShootCategory, ViewMode } from '../../types';
import { MOCK_CLIENTS } from '../../data/mockData';
import { ClientWorkspaceModal } from './ClientWorkspaceModal';
import { NewClientModal } from './NewClientModal';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Plus, 
  Kanban, 
  LayoutGrid, 
  Search, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface ClientsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({ onNavigate }) => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewStyle, setViewStyle] = useState<'grid' | 'pipeline'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.eventType === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.partnerName && c.partnerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const pipelineColumns: { id: Client['pipelineStage']; label: string }[] = [
    { id: 'new', label: 'New Inquiries' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'quoted', label: 'Quotation Sent' },
    { id: 'follow-up', label: 'Follow-up' },
    { id: 'booked', label: 'Confirmed Booking' },
  ];

  const handleAddClient = (newClient: Client) => {
    setClients([newClient, ...clients]);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                RELATIONSHIP MANAGEMENT & INQUIRY PIPELINE
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                People Behind The Moments
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Every couple, artist, and brand partnering with your studio.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Switcher */}
              <div className="flex bg-cream-200 p-1 rounded border border-warmGray-300">
                <button
                  onClick={() => setViewStyle('grid')}
                  className={`p-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    viewStyle === 'grid' ? 'bg-charcoal-950 text-cream-50 shadow-sm' : 'text-charcoal-700'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  onClick={() => setViewStyle('pipeline')}
                  className={`p-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    viewStyle === 'pipeline' ? 'bg-charcoal-950 text-cream-50 shadow-sm' : 'text-charcoal-700'
                  }`}
                  title="Inquiry Pipeline View"
                >
                  <Kanban className="w-4 h-4" />
                  <span className="hidden sm:inline">Pipeline</span>
                </button>
              </div>

              <button
                onClick={() => setIsNewClientOpen(true)}
                className="px-4 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-cream-50 rounded-lg p-4 border border-warmGray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['All', 'Wedding', 'Pre-Wedding', 'Portrait', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-charcoal-900 text-cream-50'
                    : 'bg-cream-200/80 hover:bg-cream-300 text-charcoal-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-warmGray-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter clients by name or city..."
              className="w-full pl-9 pr-3 py-2 bg-cream-100 border border-warmGray-300 rounded text-xs text-charcoal-900 outline-none focus:border-charcoal-900"
            />
          </div>

        </div>
      </div>

      {/* Main Clients Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* VIEW 1: ELEGANT IMAGE-BASED CARD GRID */}
        {viewStyle === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className="bg-cream-50 rounded-lg border border-warmGray-300 overflow-hidden hover:border-charcoal-800 hover:shadow-luxury transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover & Avatar */}
                  <div className="relative h-44 bg-charcoal-950 overflow-hidden">
                    <img
                      src={client.coverImageUrl}
                      alt={client.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent"></div>

                    {/* Status Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-charcoal-950/80 backdrop-blur-md text-gold-400 border border-gold-500/40">
                        {client.eventType}
                      </span>
                    </div>

                    {/* Avatar Ring */}
                    <div className="absolute -bottom-6 left-6 z-10">
                      <img
                        src={client.avatarUrl}
                        alt={client.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-cream-50 shadow-md"
                      />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="pt-8 p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950 group-hover:text-gold-700 transition-colors">
                          {client.name} {client.partnerName && `& ${client.partnerName}`}
                        </h3>
                        <p className="text-xs text-charcoal-600 mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gold-600" />
                          <span>{client.location}</span>
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-cream-200 text-charcoal-800 rounded">
                        {client.status}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-warmGray-200 text-xs space-y-1.5 text-charcoal-700">
                      <p className="flex items-center justify-between">
                        <span className="text-warmGray-500">Date:</span>
                        <strong>{client.eventDate}</strong>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="text-warmGray-500">Total Investment:</span>
                        <strong className="font-mono text-charcoal-950">₹{client.totalAmount.toLocaleString('en-IN')}</strong>
                      </p>
                      {client.cullingProgress !== undefined && client.cullingProgress > 0 && (
                        <p className="flex items-center justify-between text-gold-700 font-semibold">
                          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Culling:</span>
                          <span>{client.cullingProgress}% Done</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-6 py-3 bg-cream-100/70 border-t border-warmGray-200 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-charcoal-900 group-hover:text-gold-700">
                  <span>Open Client Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: INTERACTIVE INQUIRY PIPELINE (KANBAN) */}
        {viewStyle === 'pipeline' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
            {pipelineColumns.map((col) => {
              const colClients = filteredClients.filter(c => c.pipelineStage === col.id);

              return (
                <div key={col.id} className="bg-cream-50 p-4 rounded border border-warmGray-300 min-w-[240px] flex flex-col space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-warmGray-300">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-950">
                      {col.label}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-cream-200 text-charcoal-800 rounded font-bold">
                      {colClients.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {colClients.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedClient(c)}
                        className="bg-white p-3.5 rounded border border-warmGray-300 hover:border-charcoal-900 cursor-pointer shadow-sm hover:shadow-md transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.2 bg-cream-100 text-gold-700 rounded border border-warmGray-200">
                            {c.eventType}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-charcoal-900">
                            ₹{c.totalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <h4 className="font-serif-luxury text-base font-bold uppercase text-charcoal-950">
                          {c.name} {c.partnerName && `& ${c.partnerName}`}
                        </h4>
                        
                        <p className="text-[11px] text-warmGray-500">
                          {c.eventDate} • {c.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Client Workspace Dossier Modal */}
      <ClientWorkspaceModal
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
        onNavigate={onNavigate}
      />

      {/* New Client Registration Modal */}
      <NewClientModal
        isOpen={isNewClientOpen}
        onClose={() => setIsNewClientOpen(false)}
        onAddClient={handleAddClient}
      />

    </div>
  );
};
