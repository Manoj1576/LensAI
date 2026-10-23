import React, { useState, useEffect } from 'react';
import { ViewMode } from '../../types';
import { MOCK_CLIENTS, MOCK_SHOOTS, MOCK_AI_PHOTOS } from '../../data/mockData';
import { Search, X, Users, Calendar, Sparkles, FolderOpen, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
  onSelectProject?: (projectId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredClients = MOCK_CLIENTS.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.partnerName?.toLowerCase().includes(query.toLowerCase()) ||
    c.location.toLowerCase().includes(query.toLowerCase()) ||
    c.eventType.toLowerCase().includes(query.toLowerCase())
  );

  const filteredShoots = MOCK_SHOOTS.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.clientName.toLowerCase().includes(query.toLowerCase()) ||
    s.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-2xl rounded-lg shadow-luxury-dark overflow-hidden text-cream-100">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-charcoal-800">
          <Search className="w-5 h-5 text-gold-500 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients, shoots, AI culling, quotes, invoices..."
            autoFocus
            className="w-full py-4 bg-transparent text-cream-50 placeholder-warmGray-500 text-sm tracking-wide outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 text-warmGray-400 hover:text-cream-50 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Quick Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Quick Category Actions */}
          {query.trim() === '' && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-warmGray-500 font-semibold mb-2">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => { onNavigate('ai-culling'); onClose(); }}
                  className="p-2.5 bg-charcoal-850 hover:bg-charcoal-800 rounded border border-charcoal-750 text-left flex items-center gap-2 group transition-all"
                >
                  <Sparkles className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-cream-200">AI Culling</span>
                </button>
                <button
                  onClick={() => { onNavigate('workspace'); onClose(); }}
                  className="p-2.5 bg-charcoal-850 hover:bg-charcoal-800 rounded border border-charcoal-750 text-left flex items-center gap-2 group transition-all"
                >
                  <Calendar className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-cream-200">Next Shoot</span>
                </button>
                <button
                  onClick={() => { onNavigate('clients'); onClose(); }}
                  className="p-2.5 bg-charcoal-850 hover:bg-charcoal-800 rounded border border-charcoal-750 text-left flex items-center gap-2 group transition-all"
                >
                  <Users className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-cream-200">Clients CRM</span>
                </button>
                <button
                  onClick={() => { onNavigate('galleries'); onClose(); }}
                  className="p-2.5 bg-charcoal-850 hover:bg-charcoal-800 rounded border border-charcoal-750 text-left flex items-center gap-2 group transition-all"
                >
                  <FolderOpen className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-cream-200">Galleries</span>
                </button>
              </div>
            </div>
          )}

          {/* Shoots Results */}
          {filteredShoots.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-warmGray-500 font-semibold mb-2">
                Shoots & Projects ({filteredShoots.length})
              </p>
              <div className="space-y-1.5">
                {filteredShoots.map((shoot) => (
                  <div
                    key={shoot.id}
                    onClick={() => { onNavigate('project'); onClose(); }}
                    className="p-3 bg-charcoal-850 hover:bg-charcoal-800 rounded border border-charcoal-750 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={shoot.coverImage} 
                        alt={shoot.title} 
                        className="w-10 h-10 rounded object-cover border border-charcoal-700"
                      />
                      <div>
                        <p className="text-xs font-semibold text-cream-50 group-hover:text-gold-400 transition-colors">
                          {shoot.clientName} — {shoot.category}
                        </p>
                        <p className="text-[11px] text-warmGray-400">
                          {shoot.date} • {shoot.venue}, {shoot.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded uppercase tracking-wider">
                        {shoot.status}
                      </span>
                      <ArrowRight className="w-4 h-4 text-warmGray-500 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clients Results */}
          {filteredClients.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-warmGray-500 font-semibold mb-2">
                Clients ({filteredClients.length})
              </p>
              <div className="space-y-1.5">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => { onNavigate('clients'); onClose(); }}
                    className="p-3 bg-charcoal-850 hover:bg-charcoal-800 rounded border border-charcoal-750 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={client.avatarUrl} 
                        alt={client.name} 
                        className="w-9 h-9 rounded-full object-cover border border-charcoal-700"
                      />
                      <div>
                        <p className="text-xs font-semibold text-cream-50 group-hover:text-gold-400 transition-colors">
                          {client.name} {client.partnerName && `& ${client.partnerName}`}
                        </p>
                        <p className="text-[11px] text-warmGray-400">
                          {client.eventType} • {client.eventDate} • {client.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-warmGray-400">
                      ₹{client.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-charcoal-950 border-t border-charcoal-800 flex items-center justify-between text-[11px] text-warmGray-500">
          <div className="flex items-center gap-3">
            <span>Navigation: <strong className="text-warmGray-400">↑ ↓</strong></span>
            <span>Select: <strong className="text-warmGray-400">Enter</strong></span>
            <span>Close: <strong className="text-warmGray-400">Esc</strong></span>
          </div>
          <span className="text-gold-500">LENSCRAFT SEARCH</span>
        </div>

      </div>
    </div>
  );
};
