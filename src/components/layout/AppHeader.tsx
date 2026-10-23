import React from 'react';
import { UserRole, ViewMode } from '../../types';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Plus, 
  HelpCircle,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface AppHeaderProps {
  currentRole: UserRole;
  currentView: ViewMode;
  onOpenSearch: () => void;
  onOpenShortcuts: () => void;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  primaryActionIcon?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentRole,
  currentView,
  onOpenSearch,
  onOpenShortcuts,
  onPrimaryAction,
  primaryActionLabel,
  primaryActionIcon
}) => {
  // Generate dynamic breadcrumbs & title descriptions based on view
  const getViewMeta = () => {
    switch (currentView) {
      // Admin Views
      case 'workspace':
        return {
          crumbs: ['Workspace', 'Dashboard'],
          title: "Good Morning, Karthik.",
          desc: "Today's studio schedule, active AI culling batches, and upcoming shoots."
        };
      case 'leads':
        return {
          crumbs: ['Business', 'Inquiry Pipeline'],
          title: "Inquiries & Leads",
          desc: "Track client inquiries from initial touchpoint to confirmed deposit."
        };
      case 'clients':
      case 'client-detail':
        return {
          crumbs: ['Business', 'Clients'],
          title: "Client CRM Dossier",
          desc: "Complete client records, contact history, and delivery archives."
        };
      case 'quotes-new':
      case 'quotations':
        return {
          crumbs: ['Business', 'Quotation Builder'],
          title: "Luxury Quotations",
          desc: "Create bespoke photography proposals with automated GST & deliverables."
        };
      case 'shoots':
      case 'calendar':
        return {
          crumbs: ['Business', 'Shoots Calendar'],
          title: "Production Schedule",
          desc: "Manage timeline, crew assignments, and venue schedules across India."
        };
      case 'project-detail':
      case 'project':
        return {
          crumbs: ['Projects', 'Rahul & Priya Wedding', 'Overview'],
          title: "Project Command Hub",
          desc: "12-stage interactive production pipeline from inquiry to archive."
        };
      case 'photo-upload':
        return {
          crumbs: ['Projects', 'Rahul & Priya Wedding', 'Upload'],
          title: "RAW Photo Ingest",
          desc: "Upload 45MP RAW frames directly into secure encrypted cloud."
        };
      case 'ai-culling':
      case 'culling-results':
      case 'culling-photo':
      case 'culling-similar':
      case 'culling-summary':
        return {
          crumbs: ['Projects', 'AI Culling Suite', 'Batch #8102'],
          title: "Signature AI Culling Engine",
          desc: "Neural blink analysis, blur detection, and burst group selection."
        };
      case 'galleries':
      case 'gallery-create':
        return {
          crumbs: ['Projects', 'Client Galleries'],
          title: "Luxury Portfolio Galleries",
          desc: "Deliver private, proofed high-res collections to clients."
        };
      case 'payments':
        return {
          crumbs: ['Finance', 'Milestones & Ledger'],
          title: "Payments & Invoices",
          desc: "Track advance deposits, balance installments, and official GST bills."
        };
      case 'analytics':
        return {
          crumbs: ['Insights', 'Studio Analytics'],
          title: "Performance & Time Saved",
          desc: "Studio revenue, booking conversion, and hours saved with AI."
        };
      case 'feedback':
        return {
          crumbs: ['Insights', 'Client Reviews'],
          title: "Kind Words & Feedback",
          desc: "Curate verified 5-star ratings and publish website testimonials."
        };

      // Assistant Views
      case 'assistant-workspace':
        return {
          crumbs: ['Assistant Portal', 'Overview'],
          title: "Welcome, Swathi.",
          desc: "Your daily assignments, gear checklists, and active culling tasks."
        };
      case 'assistant-shoots':
      case 'assistant-calendar':
        return {
          crumbs: ['Assistant Portal', 'Assigned Shoots'],
          title: "Assigned Productions",
          desc: "Shoots where you are assigned as associate photographer or cinematographer."
        };
      case 'assistant-tasks':
        return {
          crumbs: ['Assistant Portal', 'Tasks Checklist'],
          title: "Production Checklist",
          desc: "Track gear prep, scouting reports, and post-production duties."
        };
      case 'assistant-culling':
        return {
          crumbs: ['Assistant Portal', 'AI Culling Review'],
          title: "Culling Operations",
          desc: "Review AI recommendations and cluster burst shots for lead approval."
        };
      case 'assistant-gallery-prep':
        return {
          crumbs: ['Assistant Portal', 'Gallery Preparation'],
          title: "Gallery Curation",
          desc: "Assemble candidate highlights for final principal review."
        };

      // Client Views
      case 'client-dashboard':
        return {
          crumbs: ['Client Portal', 'Home'],
          title: "Welcome, Rahul & Priya.",
          desc: "Track your wedding photography journey, deliverables, and gallery."
        };
      case 'client-project':
        return {
          crumbs: ['Client Portal', 'My Wedding Journey'],
          title: "Wedding Timeline",
          desc: "Live milestones for your Heritage Wedding in Coimbatore."
        };
      case 'client-quote':
        return {
          crumbs: ['Client Portal', 'Quotation'],
          title: "Your Bespoke Proposal",
          desc: "Review your photography package deliverables and terms."
        };
      case 'client-payments':
        return {
          crumbs: ['Client Portal', 'Payments'],
          title: "Payment Summary",
          desc: "View paid installments and settle your remaining balance securely."
        };
      case 'client-gallery':
      case 'client-favorites':
      case 'client-downloads':
        return {
          crumbs: ['Client Portal', 'Photo Gallery'],
          title: "Your Wedding Collection",
          desc: "Curated high-resolution photographs with favorite selection."
        };
      case 'client-feedback':
        return {
          crumbs: ['Client Portal', 'Feedback'],
          title: "Share Your Experience",
          desc: "Help us celebrate your special moments with your kind feedback."
        };

      default:
        return {
          crumbs: ['LensCraft AI'],
          title: "Studio Operating System",
          desc: "Capture moments. Manage everything. Let AI handle the rest."
        };
    }
  };

  const meta = getViewMeta();

  return (
    <header className="bg-cream-50/95 backdrop-blur-md border-b border-warmGray-300 px-6 sm:px-10 py-6 select-none sticky top-0 z-30">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Breadcrumbs + Title + Description */}
        <div className="space-y-1">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.2em] text-gold-700">
            {meta.crumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-warmGray-400" />}
                <span className={idx === meta.crumbs.length - 1 ? 'text-charcoal-950 font-extrabold' : 'text-warmGray-500'}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>

          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase tracking-tight text-charcoal-950 leading-tight">
            {meta.title}
          </h1>

          <p className="text-xs text-charcoal-600 font-light max-w-xl">
            {meta.desc}
          </p>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          
          {/* Global Search button */}
          <button
            onClick={onOpenSearch}
            className="px-3 py-2 bg-white hover:bg-cream-200 text-charcoal-800 border border-warmGray-300 rounded text-xs flex items-center gap-2 transition-colors shadow-sm"
            title="Global Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-warmGray-500" />
            <span className="hidden sm:inline font-medium text-[11px]">Search</span>
            <span className="text-[9px] font-mono border border-warmGray-300 px-1 py-0.2 rounded text-warmGray-500">
              ⌘K
            </span>
          </button>

          {/* Keyboard shortcuts */}
          <button
            onClick={onOpenShortcuts}
            className="p-2 bg-white hover:bg-cream-200 text-charcoal-700 border border-warmGray-300 rounded transition-colors hidden sm:flex"
            title="Shortcuts (?)"
          >
            <HelpCircle className="w-4 h-4 text-warmGray-500" />
          </button>

          {/* Primary Page Action (e.g. + NEW SHOOT, + NEW LEAD) */}
          {onPrimaryAction && primaryActionLabel && (
            <button
              onClick={onPrimaryAction}
              className="px-5 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-luxury flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              {primaryActionIcon || <Plus className="w-3.5 h-3.5 text-gold-400" />}
              <span>{primaryActionLabel}</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
