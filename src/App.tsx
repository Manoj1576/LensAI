import React, { useState, useEffect } from 'react';
import { UserRole, ViewMode, LeadItem, ShootSession } from './types';

// Layout
import { AppSidebar } from './components/layout/AppSidebar';
import { AppHeader } from './components/layout/AppHeader';

// Modals
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { NewProjectModal } from './components/common/NewProjectModal';
import { CreateShootModal } from './components/workspace/CreateShootModal';
import { GalleryBuilderModal } from './components/galleries/GalleryBuilderModal';
import { ShowreelModal } from './components/common/ShowreelModal';
import { WorkflowDetailModal } from './components/common/WorkflowDetailModal';

// Auth & Marketing Views
import { LoginPage } from './components/auth/LoginPage';
import { OnboardingWizard } from './components/auth/OnboardingWizard';
import { LandingPage } from './components/landing/LandingPage';

// Admin Views
import { PhotographerWorkspace } from './components/workspace/PhotographerWorkspace';
import { LeadsPipelineView } from './components/leads/LeadsPipelineView';
import { ClientsView } from './components/clients/ClientsView';
import { QuotationBuilder } from './components/quotations/QuotationBuilder';
import { BookingConfirmationView } from './components/quotations/BookingConfirmationView';
import { ShootsCalendar } from './components/calendar/ShootsCalendar';
import { ProjectWorkspace } from './components/project/ProjectWorkspace';
import { PhotoUploadPage } from './components/project/PhotoUploadPage';
import { AiCullingView } from './components/culling/AiCullingView';
import { GalleriesView } from './components/galleries/GalleriesView';
import { PaymentsView } from './components/payments/PaymentsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { FeedbackView } from './components/feedback/FeedbackView';

// Assistant Views
import { AssistantWorkspace } from './components/assistant/AssistantWorkspace';
import { AssistantTasksView } from './components/assistant/AssistantTasksView';
import { AssistantGalleryPrepView } from './components/assistant/AssistantGalleryPrepView';

// Client Views
import { ClientDashboard } from './components/client/ClientDashboard';
import { ClientProjectView } from './components/client/ClientProjectView';
import { ClientQuotationView } from './components/client/ClientQuotationView';
import { ClientPaymentPortal } from './components/client/ClientPaymentPortal';
import { ClientFeedbackForm } from './components/client/ClientFeedbackForm';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [currentView, setCurrentView] = useState<ViewMode>('workspace');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isCreateShootOpen, setIsCreateShootOpen] = useState(false);
  const [isGalleryBuilderOpen, setIsGalleryBuilderOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global hotkeys listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'admin') {
      setCurrentView('workspace');
      showToast('Switched to Admin Workspace (Karthik Raja)');
    } else if (role === 'assistant') {
      setCurrentView('assistant-workspace');
      showToast('Switched to Assistant Hub (Swathi M.)');
    } else {
      setCurrentView('client-dashboard');
      showToast('Switched to Client Portal (Rahul & Priya)');
    }
  };

  const handleLogin = (role: UserRole) => {
    handleRoleSwitch(role);
  };

  const handleLogout = () => {
    setCurrentView('login');
    showToast('Logged out of studio session.');
  };

  const handleShootCreated = (newShoot: ShootSession) => {
    showToast(`Shoot "${newShoot.title}" scheduled! Opening project workspace.`);
    setCurrentView('project-detail');
  };

  const isFullPageView = currentView === 'login' || currentView === 'onboarding' || currentView === 'marketing';

  // Determine contextual primary action for the top header
  const getPrimaryActionProps = () => {
    if (currentRole === 'admin') {
      switch (currentView) {
        case 'workspace':
        case 'shoots':
        case 'calendar':
          return {
            label: '+ NEW SHOOT',
            action: () => setIsCreateShootOpen(true)
          };
        case 'leads':
          return {
            label: '+ NEW INQUIRY',
            action: () => setIsNewProjectOpen(true)
          };
        case 'project-detail':
        case 'project':
          return {
            label: 'START AI CULLING',
            action: () => setCurrentView('ai-culling')
          };
        case 'ai-culling':
        case 'culling-results':
        case 'culling-summary':
          return {
            label: 'CREATE GALLERY',
            action: () => setIsGalleryBuilderOpen(true)
          };
        default:
          return {
            label: '+ NEW PROJECT',
            action: () => setIsNewProjectOpen(true)
          };
      }
    }
    if (currentRole === 'assistant') {
      return {
        label: 'OPEN AI CULLING',
        action: () => setCurrentView('assistant-culling')
      };
    }
    if (currentRole === 'client') {
      return {
        label: 'VIEW GALLERY',
        action: () => setCurrentView('client-gallery')
      };
    }
    return undefined;
  };

  const primaryAction = getPrimaryActionProps();

  return (
    <div className="min-h-screen bg-cream-100 font-sans selection:bg-gold-500 selection:text-charcoal-950">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-charcoal-950 text-cream-50 border border-gold-500 px-4 py-3 rounded shadow-luxury-dark text-xs flex items-center gap-2.5 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* FULL PAGE VIEWS (Login, Onboarding, Marketing) */}
      {isFullPageView ? (
        <main>
          {currentView === 'login' && (
            <LoginPage
              onLoginSuccess={handleLogin}
              onNavigateToOnboarding={() => setCurrentView('onboarding')}
              onNavigateToMarketing={() => setCurrentView('marketing')}
            />
          )}

          {currentView === 'onboarding' && (
            <OnboardingWizard
              onComplete={() => {
                setCurrentRole('admin');
                setCurrentView('workspace');
              }}
            />
          )}

          {currentView === 'marketing' && (
            <LandingPage
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenNewProject={() => setIsNewProjectOpen(true)}
              onOpenShowreel={() => setIsShowreelOpen(true)}
              onOpenFullWorkflow={() => setIsWorkflowModalOpen(true)}
            />
          )}
        </main>
      ) : (
        /* STANDARD APP LAYOUT WITH DEDICATED LEFT SIDEBAR */
        <div className="flex">
          
          {/* Left Sidebar */}
          <AppSidebar
            currentRole={currentRole}
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSwitchRole={handleRoleSwitch}
            onLogout={handleLogout}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Right Main Content Area */}
          <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-20' : 'ml-64'
          }`}>
            
            {/* Top Breadcrumb & Action Header */}
            <AppHeader
              currentRole={currentRole}
              currentView={currentView}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenShortcuts={() => setIsShortcutsOpen(true)}
              onPrimaryAction={primaryAction?.action}
              primaryActionLabel={primaryAction?.label}
            />

            {/* View Router */}
            <div className="flex-1">
              
              {/* ADMIN WORKSPACE VIEWS */}
              {currentRole === 'admin' && (
                <>
                  {currentView === 'workspace' && (
                    <PhotographerWorkspace
                      onNavigate={setCurrentView}
                      onOpenNewProject={() => setIsCreateShootOpen(true)}
                      onOpenProject={() => setCurrentView('project-detail')}
                    />
                  )}

                  {currentView === 'leads' && (
                    <LeadsPipelineView
                      onNavigate={setCurrentView}
                      onOpenQuotationBuilder={(lead) => {
                        showToast(`Pre-filling quotation for ${lead.clientName}`);
                        setCurrentView('quotes-new');
                      }}
                    />
                  )}

                  {(currentView === 'clients' || currentView === 'client-detail') && (
                    <ClientsView onNavigate={setCurrentView} />
                  )}

                  {(currentView === 'quotes-new' || currentView === 'quotations') && (
                    <QuotationBuilder onNavigate={setCurrentView} />
                  )}

                  {(currentView === 'booking-confirmation' || currentView === 'bookings') && (
                    <BookingConfirmationView onNavigate={setCurrentView} />
                  )}

                  {(currentView === 'shoots' || currentView === 'calendar') && (
                    <ShootsCalendar
                      onNavigate={setCurrentView}
                      onOpenProject={() => setCurrentView('project-detail')}
                    />
                  )}

                  {(currentView === 'project-detail' || currentView === 'project' || currentView === 'projects') && (
                    <ProjectWorkspace
                      onNavigate={setCurrentView}
                      onOpenFullWorkflowModal={() => setIsWorkflowModalOpen(true)}
                    />
                  )}

                  {currentView === 'photo-upload' && (
                    <PhotoUploadPage onNavigate={setCurrentView} />
                  )}

                  {(currentView === 'ai-culling' || currentView === 'culling-results' || currentView === 'culling-photo' || currentView === 'culling-similar' || currentView === 'culling-summary') && (
                    <AiCullingView onNavigate={setCurrentView} />
                  )}

                  {(currentView === 'galleries' || currentView === 'gallery-create') && (
                    <GalleriesView onNavigate={setCurrentView} isPublicClientMode={false} />
                  )}

                  {currentView === 'payments' && (
                    <PaymentsView onNavigate={setCurrentView} />
                  )}

                  {currentView === 'analytics' && (
                    <AnalyticsView onNavigate={setCurrentView} />
                  )}

                  {currentView === 'feedback' && (
                    <FeedbackView onNavigate={setCurrentView} />
                  )}
                </>
              )}

              {/* ASSISTANT WORKSPACE VIEWS */}
              {currentRole === 'assistant' && (
                <>
                  {currentView === 'assistant-workspace' && (
                    <AssistantWorkspace onNavigate={setCurrentView} />
                  )}

                  {(currentView === 'assistant-shoots' || currentView === 'assistant-calendar') && (
                    <ShootsCalendar
                      onNavigate={setCurrentView}
                      onOpenProject={() => setCurrentView('assistant-projects')}
                    />
                  )}

                  {currentView === 'assistant-projects' && (
                    <ProjectWorkspace
                      onNavigate={setCurrentView}
                      onOpenFullWorkflowModal={() => setIsWorkflowModalOpen(true)}
                    />
                  )}

                  {currentView === 'assistant-tasks' && (
                    <AssistantTasksView onNavigate={setCurrentView} />
                  )}

                  {currentView === 'assistant-culling' && (
                    <AiCullingView onNavigate={setCurrentView} />
                  )}

                  {currentView === 'assistant-gallery-prep' && (
                    <AssistantGalleryPrepView onNavigate={setCurrentView} />
                  )}
                </>
              )}

              {/* CLIENT PORTAL VIEWS */}
              {currentRole === 'client' && (
                <>
                  {currentView === 'client-dashboard' && (
                    <ClientDashboard onNavigate={setCurrentView} />
                  )}

                  {currentView === 'client-project' && (
                    <ClientProjectView onNavigate={setCurrentView} />
                  )}

                  {currentView === 'client-quote' && (
                    <ClientQuotationView onNavigate={setCurrentView} />
                  )}

                  {currentView === 'client-payments' && (
                    <ClientPaymentPortal onNavigate={setCurrentView} />
                  )}

                  {(currentView === 'client-gallery' || currentView === 'client-favorites' || currentView === 'client-downloads') && (
                    <GalleriesView onNavigate={setCurrentView} isPublicClientMode={true} />
                  )}

                  {currentView === 'client-feedback' && (
                    <ClientFeedbackForm onNavigate={setCurrentView} />
                  )}
                </>
              )}

            </div>

          </div>

        </div>
      )}

      {/* Global Modals */}
      <CreateShootModal
        isOpen={isCreateShootOpen}
        onClose={() => setIsCreateShootOpen(false)}
        onCreateSuccess={handleShootCreated}
      />

      <GalleryBuilderModal
        isOpen={isGalleryBuilderOpen}
        onClose={() => setIsGalleryBuilderOpen(false)}
        onPublishSuccess={() => {
          showToast('Client Gallery published successfully!');
          setCurrentView('galleries');
        }}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(v) => { setCurrentView(v); setIsSearchOpen(false); }}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreateSuccess={(pName) => {
          showToast(`Project "${pName}" initiated with AI Culling pipeline!`);
          setCurrentView('project-detail');
        }}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      <WorkflowDetailModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        onNavigate={(v) => { setCurrentView(v); setIsWorkflowModalOpen(false); }}
      />

    </div>
  );
}

export default App;
