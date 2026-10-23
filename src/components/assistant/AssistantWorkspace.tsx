import React from 'react';
import { ViewMode } from '../../types';
import { MOCK_SHOOTS, MOCK_ASSISTANT_TASKS } from '../../data/mockData';
import { 
  Camera, 
  Sparkles, 
  CheckSquare, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  UploadCloud, 
  FolderOpen, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AssistantWorkspaceProps {
  onNavigate: (view: ViewMode) => void;
}

export const AssistantWorkspace: React.FC<AssistantWorkspaceProps> = ({ onNavigate }) => {
  const currentShoot = MOCK_SHOOTS[0]; // Rahul & Priya Wedding

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] uppercase font-bold tracking-widest mb-2">
                <CheckCircle2 className="w-3 h-3" />
                <span>ASSISTANT PHOTOGRAPHER PORTAL</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Welcome Back, Swathi.
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Your assigned shoots, gear preparation checklists, and AI culling queue.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('assistant-tasks')}
                className="px-4 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm"
              >
                <CheckSquare className="w-3.5 h-3.5 text-gold-400" />
                <span>View My Checklist ({MOCK_ASSISTANT_TASKS.filter(t => !t.completed).length})</span>
              </button>

              <button
                onClick={() => onNavigate('assistant-culling')}
                className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open AI Culling Queue</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => onNavigate('assistant-shoots')}
            className="p-6 bg-cream-50 rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block mb-1">
              ASSIGNED SHOOTS
            </span>
            <span className="font-serif-luxury text-4xl font-bold text-charcoal-950">03</span>
            <p className="text-[11px] text-charcoal-600 mt-2">2 Weddings • 1 Pre-Wedding</p>
          </div>

          <div 
            onClick={() => onNavigate('assistant-tasks')}
            className="p-6 bg-cream-50 rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block mb-1">
              PENDING TASKS
            </span>
            <span className="font-serif-luxury text-4xl font-bold text-charcoal-950">
              {MOCK_ASSISTANT_TASKS.filter(t => !t.completed).length}
            </span>
            <p className="text-[11px] text-charcoal-600 mt-2">2 High Priority due today</p>
          </div>

          <div 
            onClick={() => onNavigate('assistant-culling')}
            className="p-6 bg-charcoal-950 text-cream-100 rounded-lg border border-gold-500/80 cursor-pointer transition-all shadow-luxury-dark ring-1 ring-gold-500/40"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
              AI CULLING QUEUE
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-4xl font-bold text-cream-50">2,846</span>
              <span className="text-xs font-mono text-gold-400">FRAMES</span>
            </div>
            <p className="text-[11px] text-warmGray-300 mt-2">Rahul & Priya (84% analyzed)</p>
          </div>

          <div 
            onClick={() => onNavigate('assistant-gallery-prep')}
            className="p-6 bg-cream-50 rounded-lg border border-warmGray-300 hover:border-charcoal-900 cursor-pointer transition-all hover:shadow-luxury"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-700 block mb-1">
              GALLERY PREPARATION
            </span>
            <span className="font-serif-luxury text-4xl font-bold text-charcoal-950">01</span>
            <p className="text-[11px] text-charcoal-600 mt-2">Draft highlights selection ready</p>
          </div>
        </div>

        {/* Assigned Shoot Spotlight */}
        <div className="bg-white rounded-lg border border-warmGray-300 overflow-hidden shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Image (5 cols) */}
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto">
              <img
                src={currentShoot.coverImage}
                alt={currentShoot.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-charcoal-950/90 text-gold-400 text-[10px] font-bold uppercase rounded border border-gold-500/40">
                  ASSIGNMENT: SECOND SHOOTER & CULLING
                </span>
              </div>
            </div>

            {/* Content (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 font-bold block">
                  ACTIVE PRODUCTION SPOTLIGHT
                </span>
                <h3 className="font-serif-luxury text-3xl font-bold uppercase text-charcoal-950">
                  {currentShoot.clientName}
                </h3>
                <p className="text-xs text-charcoal-600">{currentShoot.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-warmGray-600 pt-2">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold-600" /> {currentShoot.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold-600" /> {currentShoot.timeRange}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gold-600" /> {currentShoot.venue}</span>
                </div>
              </div>

              {/* Step Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-warmGray-200 text-center">
                <button
                  onClick={() => onNavigate('assistant-tasks')}
                  className="p-3 bg-cream-50 hover:bg-cream-200 border border-warmGray-300 rounded transition-colors"
                >
                  <CheckSquare className="w-4 h-4 text-charcoal-900 mx-auto mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-charcoal-950">Tasks Checklist</span>
                </button>

                <button
                  onClick={() => onNavigate('photo-upload')}
                  className="p-3 bg-cream-50 hover:bg-cream-200 border border-warmGray-300 rounded transition-colors"
                >
                  <UploadCloud className="w-4 h-4 text-charcoal-900 mx-auto mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-charcoal-950">Photo Upload</span>
                </button>

                <button
                  onClick={() => onNavigate('assistant-culling')}
                  className="p-3 bg-charcoal-950 hover:bg-charcoal-900 border border-gold-500/80 rounded transition-colors text-cream-100"
                >
                  <Sparkles className="w-4 h-4 text-gold-400 mx-auto mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-gold-400">AI Culling</span>
                </button>

                <button
                  onClick={() => onNavigate('assistant-gallery-prep')}
                  className="p-3 bg-cream-50 hover:bg-cream-200 border border-warmGray-300 rounded transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-charcoal-900 mx-auto mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-charcoal-950">Gallery Prep</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Tasks List Box */}
        <div className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300 space-y-4">
          <div className="flex items-center justify-between border-b border-warmGray-200 pb-3">
            <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950">
              Assigned Production Tasks
            </h3>
            <button 
              onClick={() => onNavigate('assistant-tasks')}
              className="text-xs uppercase font-bold text-gold-700 hover:text-charcoal-950 flex items-center gap-1"
            >
              <span>View All Tasks ({MOCK_ASSISTANT_TASKS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {MOCK_ASSISTANT_TASKS.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded border border-warmGray-300 text-xs">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <div>
                    <span className={`font-medium ${task.completed ? 'line-through text-warmGray-400' : 'text-charcoal-950'}`}>
                      {task.taskTitle}
                    </span>
                    <span className="text-[10px] text-warmGray-500 block">{task.shootTitle}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-warmGray-500">{task.dueDate}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
