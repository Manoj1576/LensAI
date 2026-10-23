import React, { useState } from 'react';
import { ViewMode, ShootSession, ShootCategory } from '../../types';
import { MOCK_SHOOTS } from '../../data/mockData';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  Plus, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface ShootsCalendarProps {
  onNavigate: (view: ViewMode) => void;
  onOpenProject: (projectId: string) => void;
}

export const ShootsCalendar: React.FC<ShootsCalendarProps> = ({
  onNavigate,
  onOpenProject
}) => {
  const [selectedMonth, setSelectedMonth] = useState('June 2026');
  const [viewType, setViewType] = useState<'month' | 'week' | 'list'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedShoot, setSelectedShoot] = useState<ShootSession | null>(MOCK_SHOOTS[0]);

  const filteredShoots = MOCK_SHOOTS.filter(s => 
    selectedCategory === 'All' || s.category === selectedCategory
  );

  const daysInJune = [
    { day: 1, shoots: [] },
    { day: 2, shoots: [] },
    { day: 3, shoots: [] },
    { day: 4, shoots: [] },
    { day: 5, shoots: [] },
    { day: 6, shoots: [] },
    { day: 7, shoots: [] },
    { day: 8, shoots: [] },
    { day: 9, shoots: [] },
    { day: 10, shoots: [] },
    { day: 11, shoots: [] },
    { day: 12, shoots: [] },
    { day: 13, shoots: [] },
    { day: 14, shoots: [] },
    { day: 15, shoots: [] },
    { day: 16, shoots: [] },
    { day: 17, shoots: [] },
    { day: 18, shoots: [] },
    { day: 19, shoots: [] },
    { day: 20, shoots: [MOCK_SHOOTS[0]] }, // Rahul & Priya Wedding
    { day: 21, shoots: [] },
    { day: 22, shoots: [] },
    { day: 23, shoots: [] },
    { day: 24, shoots: [] },
    { day: 25, shoots: [] },
    { day: 26, shoots: [] },
    { day: 27, shoots: [] },
    { day: 28, shoots: [] },
    { day: 29, shoots: [] },
    { day: 30, shoots: [] },
  ];

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                PRODUCTION MASTER SCHEDULE
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Shoots Calendar
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Manage upcoming sessions, crew assignments, and logistics.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-cream-200 p-1 rounded border border-warmGray-300">
                <button
                  onClick={() => setViewType('month')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    viewType === 'month' ? 'bg-charcoal-950 text-cream-50' : 'text-charcoal-700'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewType('list')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    viewType === 'list' ? 'bg-charcoal-950 text-cream-50' : 'text-charcoal-700'
                  }`}
                >
                  List
                </button>
              </div>

              <button
                onClick={() => alert('New Shoot booking dialog initiated.')}
                className="px-4 py-2 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Shoot</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Toolbar & Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-cream-50 rounded-lg p-4 border border-warmGray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button className="p-1.5 bg-cream-200 hover:bg-cream-300 rounded text-charcoal-800">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif-luxury text-lg font-bold uppercase text-charcoal-950 tracking-wider">
              {selectedMonth}
            </span>
            <button className="p-1.5 bg-cream-200 hover:bg-cream-300 rounded text-charcoal-800">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
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

        </div>
      </div>

      {/* Main Calendar View Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Month Calendar Grid (8 cols) */}
          <div className="lg:col-span-8 bg-cream-50 rounded-lg border border-warmGray-300 p-6">
            
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold uppercase tracking-widest text-warmGray-500 pb-3 border-b border-warmGray-300">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 gap-2 pt-3">
              {daysInJune.map((d) => {
                const hasShoot = d.shoots.length > 0;
                const is20th = d.day === 20;

                return (
                  <div
                    key={d.day}
                    onClick={() => hasShoot && setSelectedShoot(d.shoots[0])}
                    className={`min-h-[85px] p-2 rounded border transition-all flex flex-col justify-between ${
                      hasShoot
                        ? 'bg-charcoal-950 text-cream-100 border-gold-500 cursor-pointer shadow-luxury-dark ring-2 ring-gold-500/50'
                        : 'bg-white/80 border-warmGray-200 hover:border-warmGray-400 text-charcoal-900'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`font-mono text-xs font-bold ${hasShoot ? 'text-gold-400' : 'text-charcoal-800'}`}>
                        {d.day}
                      </span>
                      {hasShoot && (
                        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
                      )}
                    </div>

                    {hasShoot && (
                      <div className="mt-1">
                        <p className="text-[10px] font-bold uppercase tracking-tight text-cream-50 truncate">
                          {d.shoots[0].clientName}
                        </p>
                        <p className="text-[9px] text-gold-400 truncate">
                          {d.shoots[0].city}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Selected Shoot Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {selectedShoot ? (
              <div className="bg-cream-50 rounded-lg border border-warmGray-300 p-6 space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                    SELECTED SESSION DOSSIER
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                    {selectedShoot.clientName}
                  </h3>
                  <p className="text-xs text-charcoal-600 uppercase font-semibold">
                    {selectedShoot.title}
                  </p>
                </div>

                <img
                  src={selectedShoot.coverImage}
                  alt={selectedShoot.title}
                  className="w-full h-40 object-cover rounded border border-warmGray-300"
                />

                <div className="space-y-3 text-xs text-charcoal-800 border-y border-warmGray-200 py-4">
                  <p className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gold-600" />
                    <span>{selectedShoot.date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-600" />
                    <span>{selectedShoot.timeRange}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span>{selectedShoot.venue}, {selectedShoot.city}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-600" />
                    <span>Lead: {selectedShoot.leadPhotographer} | Second: {selectedShoot.secondShooter}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onOpenProject(selectedShoot.id);
                      onNavigate('project');
                    }}
                    className="flex-1 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest text-center"
                  >
                    Open Project Page
                  </button>

                  <button
                    onClick={() => onNavigate('ai-culling')}
                    className="py-2.5 px-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest"
                    title="Launch AI Culling"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-cream-50 rounded-lg border border-warmGray-300 p-8 text-center text-warmGray-500">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-warmGray-400" />
                <p className="text-xs uppercase tracking-wider">Select a date on the calendar</p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
