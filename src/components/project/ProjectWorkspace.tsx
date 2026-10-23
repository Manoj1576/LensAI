import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { MOCK_SHOOTS, MOCK_CLIENTS } from '../../data/mockData';
import { HorizontalProjectWorkflow } from './HorizontalProjectWorkflow';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckSquare, 
  Square, 
  Camera, 
  Sparkles, 
  CreditCard, 
  ArrowRight,
  FileText,
  Image as ImageIcon,
  UploadCloud,
  Share2
} from 'lucide-react';

interface ProjectWorkspaceProps {
  onNavigate: (view: ViewMode) => void;
  onOpenFullWorkflowModal: () => void;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({
  onNavigate,
  onOpenFullWorkflowModal
}) => {
  const project = MOCK_SHOOTS[0]; // Rahul & Priya Wedding
  const client = MOCK_CLIENTS[0];

  const [tasks, setTasks] = useState(project.tasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Project Banner & Hero */}
      <div className="relative bg-charcoal-950 text-cream-100 border-b border-charcoal-800">
        
        <div className="relative h-72 sm:h-84 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-gold-500 text-charcoal-950 text-[10px] font-bold uppercase tracking-widest">
                    ACTIVE PROJECT
                  </span>
                  <span className="text-xs font-mono text-warmGray-300">
                    PROJECT #LC-2026-W08
                  </span>
                </div>

                <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold uppercase tracking-tight text-cream-50">
                  {project.clientName}
                </h1>
                <p className="text-xs sm:text-sm text-gold-400 font-medium tracking-wide uppercase mt-1">
                  {project.title} • 20 JUNE 2026 • COIMBATORE
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('photo-upload')}
                  className="px-4 py-2.5 bg-charcoal-900 hover:bg-charcoal-850 text-cream-50 border border-charcoal-700 rounded text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                  <UploadCloud className="w-4 h-4 text-gold-400" />
                  <span>Upload RAW Shoot</span>
                </button>

                <button
                  onClick={() => onNavigate('ai-culling')}
                  className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enter AI Culling (RAW)</span>
                </button>

                <button
                  onClick={() => onNavigate('galleries')}
                  className="px-4 py-2.5 bg-charcoal-900 hover:bg-charcoal-850 text-cream-50 border border-charcoal-700 rounded text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                  <ImageIcon className="w-4 h-4 text-gold-400" />
                  <span>View Gallery</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Main Project Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* Horizontal 12-Stage Timeline */}
        <HorizontalProjectWorkflow 
          onNavigate={onNavigate} 
          onOpenFullWorkflowModal={onOpenFullWorkflowModal} 
        />

        {/* Project Detailed Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Shot List, Tasks, Notes */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* AI Culling Live Progress Box */}
            <div className="bg-charcoal-950 text-cream-100 rounded-lg p-6 border border-gold-500/50 shadow-luxury-dark">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold block mb-1">
                    AI PHOTO CULLING ENGINE
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold uppercase text-cream-50">
                    5,000 Frames Analyzed
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-charcoal-900 border border-charcoal-700 rounded text-xs font-mono text-gold-400">
                    84% Completed
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-charcoal-800 rounded-full h-2.5 overflow-hidden mb-4 border border-charcoal-700">
                <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 h-full rounded-full w-[84%] transition-all duration-1000"></div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center border-t border-charcoal-850 pt-4 text-xs">
                <div>
                  <span className="font-serif-luxury text-xl font-bold text-cream-50 block">3,842</span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400">Keep (Recommended)</span>
                </div>
                <div>
                  <span className="font-serif-luxury text-xl font-bold text-cream-50 block">718</span>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400">Needs Review</span>
                </div>
                <div>
                  <span className="font-serif-luxury text-xl font-bold text-cream-50 block">440</span>
                  <span className="text-[10px] uppercase tracking-widest text-rose-400">Rejected (Blinks/Blur)</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-charcoal-850 flex justify-between items-center text-xs">
                <button
                  onClick={() => onNavigate('photo-upload')}
                  className="text-warmGray-400 hover:text-cream-50 uppercase tracking-widest font-semibold flex items-center gap-1"
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Upload More RAW Frames
                </button>

                <button
                  onClick={() => onNavigate('ai-culling')}
                  className="text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                >
                  <span>Open Full Photo Inspector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Checklist Tasks */}
            <div className="bg-cream-50 rounded-lg p-6 sm:p-7 border border-warmGray-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950 tracking-wide">
                  Project Tasks & Production Checklist
                </h3>
                <span className="text-xs font-mono text-charcoal-600">
                  {tasks.filter(t => t.done).length} of {tasks.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer transition-colors border ${
                      task.done
                        ? 'bg-cream-100/60 border-warmGray-200 text-warmGray-500 line-through'
                        : 'bg-white border-warmGray-300 text-charcoal-900 hover:border-charcoal-700'
                    }`}
                  >
                    {task.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-warmGray-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium tracking-wide">
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shot List */}
            <div className="bg-cream-50 rounded-lg p-6 sm:p-7 border border-warmGray-300">
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950 tracking-wide mb-4">
                Key Rituals & Shot List
              </h3>
              <ul className="space-y-2.5">
                {project.shotList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column (4 cols): Metadata, Team, Financials */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Shoot Metadata Card */}
            <div className="bg-cream-50 rounded-lg p-6 border border-warmGray-300 space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-charcoal-950 border-b border-warmGray-200 pb-2">
                Shoot Specifications
              </h4>
              
              <div className="space-y-3 text-xs text-charcoal-800">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-warmGray-500 uppercase tracking-wider block">Date</span>
                    <strong>{project.date}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-warmGray-500 uppercase tracking-wider block">Duration</span>
                    <strong>{project.timeRange}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-warmGray-500 uppercase tracking-wider block">Venue</span>
                    <strong>{project.venue}, {project.city}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Camera className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-warmGray-500 uppercase tracking-wider block">Captured Medium</span>
                    <strong>Canon EOS R5C + Sony A1 RAW</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Crew Assignments */}
            <div className="bg-cream-50 rounded-lg p-6 border border-warmGray-300 space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-charcoal-950 border-b border-warmGray-200 pb-2">
                Production Crew
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-warmGray-500">Lead Photographer:</span>
                  <strong className="text-charcoal-950">{project.leadPhotographer}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-warmGray-500">Second Shooter:</span>
                  <strong className="text-charcoal-950">{project.secondShooter}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-warmGray-500">Cinematographer:</span>
                  <strong className="text-charcoal-950">{project.cinematographer}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-warmGray-500">Drone Pilot:</span>
                  <strong className="text-charcoal-950">{project.droneOperator}</strong>
                </div>
              </div>
            </div>

            {/* Financial Overview Card */}
            <div className="bg-cream-50 rounded-lg p-6 border border-warmGray-300 space-y-4">
              <div className="flex items-center justify-between border-b border-warmGray-200 pb-2">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-charcoal-950">
                  Project Investment
                </h4>
                <button 
                  onClick={() => onNavigate('payments')}
                  className="text-[10px] uppercase font-bold text-gold-700 hover:text-charcoal-950"
                >
                  Manage →
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-warmGray-500">Package Total:</span>
                  <strong className="font-mono text-charcoal-950">₹{project.packageTotal.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Advance Received (35%):</span>
                  <strong className="font-mono">₹{project.advancePaid.toLocaleString('en-IN')} ✓</strong>
                </div>
                <div className="flex justify-between text-amber-800 font-semibold pt-2 border-t border-warmGray-200">
                  <span>Balance Due on Delivery:</span>
                  <strong className="font-mono">₹{(project.packageTotal - project.advancePaid).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-cream-50 rounded-lg p-6 border border-warmGray-300">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-charcoal-950 mb-2">
                Creative Notes & Preferences
              </h4>
              <p className="text-xs text-charcoal-700 leading-relaxed italic">
                “{client.notes}”
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
