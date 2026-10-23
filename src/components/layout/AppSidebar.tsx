import React, { useState } from 'react';
import { UserRole, ViewMode, UserProfile } from '../../types';
import { MOCK_USER_PROFILES } from '../../data/mockData';
import { 
  LayoutDashboard, 
  Users, 
  Inbox, 
  Calendar, 
  FolderOpen, 
  Sparkles, 
  Image as ImageIcon, 
  CreditCard, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  CheckSquare, 
  Heart, 
  Download, 
  MessageSquare, 
  Settings, 
  LogOut, 
  UserCheck, 
  Shield, 
  Camera, 
  FileText,
  Clock,
  Layers,
  Bell
} from 'lucide-react';

interface AppSidebarProps {
  currentRole: UserRole;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentRole,
  currentView,
  onNavigate,
  onSwitchRole,
  onLogout,
  collapsed,
  onToggleCollapse
}) => {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const user = MOCK_USER_PROFILES[currentRole] || MOCK_USER_PROFILES.admin;

  interface NavSection {
    label: string;
    items: {
      id: ViewMode;
      label: string;
      icon: React.ReactNode;
      badge?: string;
      isAi?: boolean;
    }[];
  }

  // Role-Specific Navigation Groups
  const adminSections: NavSection[] = [
    {
      label: 'WORKSPACE',
      items: [
        { id: 'workspace', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> }
      ]
    },
    {
      label: 'BUSINESS',
      items: [
        { id: 'leads', label: 'Leads', icon: <Inbox className="w-4 h-4" />, badge: '8' },
        { id: 'clients', label: 'Clients', icon: <Users className="w-4 h-4" /> },
        { id: 'quotes-new', label: 'Quotes', icon: <FileText className="w-4 h-4" /> },
        { id: 'shoots', label: 'Shoots', icon: <Camera className="w-4 h-4" /> },
        { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> }
      ]
    },
    {
      label: 'PROJECTS',
      items: [
        { id: 'project-detail', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
        { id: 'ai-culling', label: 'AI Culling', icon: <Sparkles className="w-4 h-4 text-gold-400" />, isAi: true, badge: '84%' },
        { id: 'galleries', label: 'Galleries', icon: <ImageIcon className="w-4 h-4" /> }
      ]
    },
    {
      label: 'FINANCE',
      items: [
        { id: 'payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" />, badge: 'Due' }
      ]
    },
    {
      label: 'INSIGHTS',
      items: [
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> }
      ]
    }
  ];

  const assistantSections: NavSection[] = [
    {
      label: 'WORKSPACE',
      items: [
        { id: 'assistant-workspace', label: 'Assistant Hub', icon: <LayoutDashboard className="w-4 h-4" /> }
      ]
    },
    {
      label: 'PRODUCTIONS',
      items: [
        { id: 'assistant-shoots', label: 'Assigned Shoots', icon: <Camera className="w-4 h-4" />, badge: '3' },
        { id: 'assistant-calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
        { id: 'assistant-projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
        { id: 'assistant-tasks', label: 'Tasks', icon: <CheckSquare className="w-4 h-4" />, badge: '5' }
      ]
    },
    {
      label: 'AI PIPELINE',
      items: [
        { id: 'assistant-culling', label: 'AI Culling', icon: <Sparkles className="w-4 h-4 text-gold-400" />, isAi: true, badge: 'Active' },
        { id: 'assistant-gallery-prep', label: 'Gallery Prep', icon: <ImageIcon className="w-4 h-4" /> }
      ]
    }
  ];

  const clientSections: NavSection[] = [
    {
      label: 'CLIENT PORTAL',
      items: [
        { id: 'client-dashboard', label: 'Home', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'client-project', label: 'My Project', icon: <FolderOpen className="w-4 h-4" /> },
        { id: 'client-quote', label: 'Quotation', icon: <FileText className="w-4 h-4" /> },
        { id: 'client-payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> }
      ]
    },
    {
      label: 'PORTFOLIO & DELIVERY',
      items: [
        { id: 'client-gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" />, badge: 'Live' },
        { id: 'client-favorites', label: 'Favorites', icon: <Heart className="w-4 h-4 text-rose-400" /> },
        { id: 'client-downloads', label: 'Downloads', icon: <Download className="w-4 h-4" /> },
        { id: 'client-feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> }
      ]
    }
  ];

  const sections = currentRole === 'admin' 
    ? adminSections 
    : currentRole === 'assistant' 
    ? assistantSections 
    : clientSections;

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-charcoal-950 text-cream-100 border-r border-charcoal-800 z-50 flex flex-col justify-between transition-all duration-300 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header & Brand Logo */}
      <div>
        <div className="h-20 px-4 flex items-center justify-between border-b border-charcoal-800">
          <div 
            onClick={() => onNavigate(currentRole === 'admin' ? 'workspace' : currentRole === 'assistant' ? 'assistant-workspace' : 'client-dashboard')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            {/* Aperture Logo */}
            <div className="w-10 h-10 rounded-full border border-gold-500/60 bg-charcoal-900 flex items-center justify-center text-gold-500 shrink-0 group-hover:rotate-45 transition-transform duration-700 shadow-gold-glow">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
              </svg>
            </div>

            {!collapsed && (
              <div className="flex flex-col overflow-hidden whitespace-nowrap">
                <span className="font-serif-luxury text-lg tracking-[0.16em] font-bold text-cream-50 uppercase group-hover:text-gold-400 transition-colors">
                  LENSCRAFT<span className="text-gold-500 font-sans text-xs ml-0.5">AI</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-warmGray-400">
                  {currentRole === 'admin' ? 'Studio Operating OS' : currentRole === 'assistant' ? 'Production Portal' : 'Client Proofing Suite'}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded text-warmGray-400 hover:text-cream-50 hover:bg-charcoal-900 transition-colors"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapsed expand button */}
        {collapsed && (
          <div className="px-3 py-2 flex justify-center border-b border-charcoal-850">
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded text-warmGray-400 hover:text-gold-400 hover:bg-charcoal-900 transition-colors"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Sections */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-210px)] space-y-6 px-3 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.label} className="space-y-1">
              {!collapsed && (
                <span className="px-3 text-[9px] uppercase tracking-[0.25em] font-bold text-warmGray-500 block mb-1">
                  {section.label}
                </span>
              )}

              {section.items.map((item) => {
                const isActive = currentView === item.id || 
                  (item.id === 'quotes-new' && currentView === 'quotes-new') ||
                  (item.id === 'shoots' && currentView === 'shoots') ||
                  (item.id === 'project-detail' && (currentView === 'project-detail' || currentView === 'photo-upload' || currentView === 'project')) ||
                  (item.id === 'ai-culling' && (currentView === 'ai-culling' || currentView === 'culling-results' || currentView === 'culling-photo' || currentView === 'culling-similar' || currentView === 'culling-summary'));

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs tracking-wider uppercase transition-all duration-200 group ${
                      isActive
                        ? 'bg-charcoal-850 text-gold-400 font-bold border-l-2 border-gold-500 shadow-inner'
                        : 'text-warmGray-300 hover:text-cream-50 hover:bg-charcoal-900/80 font-medium'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`shrink-0 transition-colors ${
                        isActive ? 'text-gold-400' : 'text-warmGray-400 group-hover:text-cream-50'
                      }`}>
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        item.isAi 
                          ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                          : 'bg-charcoal-800 text-warmGray-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile & Role Switcher Area */}
      <div className="border-t border-charcoal-800 p-3 space-y-2 bg-charcoal-950">
        
        {/* Role Indicator Banner & Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className={`w-full flex items-center justify-between p-2 rounded bg-charcoal-900 hover:bg-charcoal-850 border border-charcoal-700 transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Switch User Role"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                currentRole === 'admin' ? 'bg-gold-400' : currentRole === 'assistant' ? 'bg-emerald-400' : 'bg-cyan-400'
              }`}></span>
              {!collapsed && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-cream-50">
                  Role: <strong className="text-gold-400">{currentRole}</strong>
                </span>
              )}
            </div>
            {!collapsed && <UserCheck className="w-3.5 h-3.5 text-warmGray-400" />}
          </button>

          {/* Quick Role Switcher Menu */}
          {showRoleSwitcher && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-charcoal-900 border border-charcoal-700 rounded shadow-luxury-dark p-2 space-y-1.5 z-50 text-xs animate-fadeIn">
              <span className="text-[9px] uppercase tracking-widest text-warmGray-400 font-bold px-2 block">
                SWITCH WORKSPACE ROLE
              </span>
              
              <button
                onClick={() => { onSwitchRole('admin'); setShowRoleSwitcher(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between ${
                  currentRole === 'admin' ? 'bg-gold-500 text-charcoal-950 font-bold' : 'text-cream-100 hover:bg-charcoal-800'
                }`}
              >
                <span>1. Admin (Karthik)</span>
                <Shield className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { onSwitchRole('assistant'); setShowRoleSwitcher(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between ${
                  currentRole === 'assistant' ? 'bg-gold-500 text-charcoal-950 font-bold' : 'text-cream-100 hover:bg-charcoal-800'
                }`}
              >
                <span>2. Assistant (Swathi)</span>
                <Camera className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { onSwitchRole('client'); setShowRoleSwitcher(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between ${
                  currentRole === 'client' ? 'bg-gold-500 text-charcoal-950 font-bold' : 'text-cream-100 hover:bg-charcoal-800'
                }`}
              >
                <span>3. Client (Rahul & Priya)</span>
                <Heart className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className={`flex items-center justify-between ${collapsed ? 'justify-center' : 'px-1'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-8 h-8 rounded-full object-cover border border-gold-500/50 shrink-0" 
            />
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-cream-50 truncate">{user.name}</p>
                <p className="text-[10px] text-warmGray-400 truncate">{user.title}</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onLogout}
              className="p-1.5 text-warmGray-400 hover:text-rose-400 rounded hover:bg-charcoal-900 transition-colors"
              title="Logout / Switch User"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </aside>
  );
};
