import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { 
  Camera, 
  Search, 
  Bell, 
  User, 
  Plus, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Sparkles, 
  Image as ImageIcon, 
  CreditCard, 
  BarChart3, 
  Menu, 
  X,
  HelpCircle,
  FolderOpen,
  Inbox,
  LogOut,
  Sliders
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  onOpenNewProject: () => void;
  onOpenShortcuts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenNewProject,
  onOpenShortcuts
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'workspace', label: 'WORKSPACE', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'leads', label: 'LEADS', icon: <Inbox className="w-3.5 h-3.5" /> },
    { id: 'clients', label: 'CLIENTS', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'calendar', label: 'SHOOTS', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'ai-culling', label: 'AI CULLING', icon: <Sparkles className="w-3.5 h-3.5 text-gold-500" /> },
    { id: 'galleries', label: 'GALLERIES', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'quotes-new', label: 'QUOTES', icon: <FolderOpen className="w-3.5 h-3.5" /> },
    { id: 'payments', label: 'PAYMENTS', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'analytics', label: 'ANALYTICS', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-charcoal-950/95 backdrop-blur-md text-cream-100 border-b border-charcoal-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => onNavigate('workspace')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Minimal Aperture / Lens Flow Icon */}
            <div className="relative w-10 h-10 rounded-full border border-gold-500/60 flex items-center justify-center bg-charcoal-900 group-hover:border-gold-400 group-hover:shadow-gold-glow transition-all duration-300">
              <svg 
                className="w-5 h-5 text-gold-500 group-hover:rotate-45 transition-transform duration-700 ease-out" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.6" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
              </svg>
              <div className="absolute inset-0 rounded-full border border-gold-400/20 animate-ping opacity-25 pointer-events-none"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl tracking-[0.18em] font-semibold text-cream-50 uppercase group-hover:text-gold-400 transition-colors">
                LENSCRAFT<span className="text-gold-500 font-sans ml-1 text-sm font-light tracking-widest">AI</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-warmGray-400 uppercase">
                Capture. Curate. Deliver.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id || 
                (item.id === 'quotes-new' && currentView === 'quotes-new') ||
                (item.id === 'calendar' && currentView === 'shoots');

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3 py-2 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-200 flex items-center gap-1.5 rounded-sm ${
                    isActive
                      ? 'text-gold-400 font-semibold bg-charcoal-850/80 shadow-inner'
                      : 'text-warmGray-300 hover:text-cream-50 hover:bg-charcoal-900/60'
                  }`}
                >
                  {item.label}
                  {item.id === 'ai-culling' && (
                    <span className="inline-flex items-center px-1.5 py-0.2 text-[8px] tracking-wider font-bold bg-gold-500/20 text-gold-400 border border-gold-500/40 rounded-full">
                      AI
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gold-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-warmGray-300 hover:text-gold-400 hover:bg-charcoal-900 rounded-full transition-colors flex items-center gap-2 group"
              title="Search shoots, clients, quotes (Cmd+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline-block text-[10px] text-warmGray-500 uppercase tracking-widest border border-charcoal-700 px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </button>

            {/* Keyboard Shortcuts Button */}
            <button
              onClick={onOpenShortcuts}
              className="p-2 text-warmGray-400 hover:text-cream-100 hover:bg-charcoal-900 rounded-full transition-colors hidden sm:flex"
              title="Keyboard Shortcuts (?)"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-warmGray-300 hover:text-gold-400 hover:bg-charcoal-900 rounded-full transition-colors relative"
                title="Studio Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full ring-2 ring-charcoal-950 animate-pulse"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-charcoal-900 border border-charcoal-700 rounded-md shadow-luxury-dark py-3 px-4 z-50 text-cream-100 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-2 mb-2">
                    <span className="text-xs uppercase tracking-widest font-semibold text-gold-400">Notifications</span>
                    <span className="text-[10px] text-warmGray-400">3 New</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div 
                      onClick={() => { onNavigate('ai-culling'); setShowNotifications(false); }}
                      className="p-2 bg-charcoal-850 hover:bg-charcoal-800 rounded cursor-pointer transition-colors border-l-2 border-gold-500"
                    >
                      <p className="font-medium text-cream-50">AI Culling 84% Complete</p>
                      <p className="text-[10px] text-warmGray-400">Rahul & Priya Wedding (RAW_8102 - 5,000 photos)</p>
                    </div>
                    <div 
                      onClick={() => { onNavigate('payments'); setShowNotifications(false); }}
                      className="p-2 bg-charcoal-850 hover:bg-charcoal-800 rounded cursor-pointer transition-colors"
                    >
                      <p className="font-medium text-cream-50">Payment Received: ₹30,000</p>
                      <p className="text-[10px] text-warmGray-400">Advance from Rahul Sharma via UPI</p>
                    </div>
                    <div 
                      onClick={() => { onNavigate('leads'); setShowNotifications(false); }}
                      className="p-2 bg-charcoal-850 hover:bg-charcoal-800 rounded cursor-pointer transition-colors"
                    >
                      <p className="font-medium text-cream-50">New Booking Inquiry</p>
                      <p className="text-[10px] text-warmGray-400">Siddharth & Ritu (Jodhpur Destination)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pl-2 pr-1 rounded-full border border-charcoal-700 bg-charcoal-900 hover:border-gold-500/50 transition-all"
              >
                <span className="hidden lg:inline-block text-[11px] font-medium tracking-wider text-warmGray-200">
                  Karthik Raja
                </span>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" 
                  alt="Photographer Profile" 
                  className="w-7 h-7 rounded-full object-cover border border-gold-500/50"
                />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-60 bg-charcoal-900 border border-charcoal-700 rounded-md shadow-luxury-dark py-2 z-50 text-cream-100 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-charcoal-800">
                    <p className="text-xs font-semibold text-cream-50">Karthik Raja Studios</p>
                    <p className="text-[10px] text-gold-400">Studio Pro Plan • 500GB Cloud RAW</p>
                  </div>
                  
                  <button 
                    onClick={() => { onNavigate('workspace'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-warmGray-300 hover:text-gold-400 hover:bg-charcoal-800 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" /> Studio Dashboard
                  </button>
                  
                  <button 
                    onClick={() => { onNavigate('marketing'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-warmGray-300 hover:text-gold-400 hover:bg-charcoal-800 flex items-center gap-2"
                  >
                    <Camera className="w-3.5 h-3.5" /> Public Portfolio Site
                  </button>

                  <button 
                    onClick={() => { onNavigate('onboarding'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-warmGray-300 hover:text-gold-400 hover:bg-charcoal-800 flex items-center gap-2"
                  >
                    <Sliders className="w-3.5 h-3.5" /> Studio Setup Wizard
                  </button>

                  <div className="border-t border-charcoal-800 my-1"></div>

                  <button 
                    onClick={() => { onNavigate('login'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-charcoal-800 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out (Switch User)
                  </button>
                </div>
              )}
            </div>

            {/* Primary CTA: NEW PROJECT */}
            <button
              onClick={onOpenNewProject}
              className="bg-gold-500 hover:bg-gold-400 text-charcoal-950 px-3.5 sm:px-4 py-2 rounded-sm text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 flex items-center gap-1.5 shadow-gold-glow hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">NEW PROJECT</span>
              <span className="sm:hidden">NEW</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-warmGray-300 hover:text-cream-50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-charcoal-900 border-b border-charcoal-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-xs font-medium tracking-widest uppercase rounded flex items-center justify-between ${
                  isActive
                    ? 'bg-charcoal-800 text-gold-400 font-semibold'
                    : 'text-warmGray-300 hover:bg-charcoal-850 hover:text-cream-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  {item.label}
                </div>
                {item.id === 'ai-culling' && (
                  <span className="px-1.5 py-0.5 text-[8px] bg-gold-500/20 text-gold-400 rounded">
                    SIGNATURE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
