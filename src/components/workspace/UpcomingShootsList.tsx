import React from 'react';
import { ViewMode } from '../../types';
import { MOCK_SHOOTS } from '../../data/mockData';
import { Calendar, MapPin, ArrowRight, Sparkles, Clock } from 'lucide-react';

interface UpcomingShootsListProps {
  onNavigate: (view: ViewMode) => void;
  onOpenProject: (projectId: string) => void;
}

export const UpcomingShootsList: React.FC<UpcomingShootsListProps> = ({
  onNavigate,
  onOpenProject
}) => {
  return (
    <div className="bg-cream-50 rounded-lg border border-warmGray-300 p-6 sm:p-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block">
            SCHEDULE OVERVIEW
          </span>
          <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950 tracking-tight">
            Upcoming Studio Sessions
          </h3>
        </div>

        <button
          onClick={() => onNavigate('calendar')}
          className="text-xs font-semibold uppercase tracking-widest text-charcoal-900 hover:text-gold-700 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Open Full Calendar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Shoots Rows */}
      <div className="divide-y divide-warmGray-200">
        {MOCK_SHOOTS.map((shoot) => (
          <div
            key={shoot.id}
            onClick={() => {
              onOpenProject(shoot.id);
              onNavigate('project');
            }}
            className="py-4 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer hover:bg-cream-100/60 px-3 -mx-3 rounded transition-colors"
          >
            {/* Left Info */}
            <div className="flex items-center gap-4">
              <img
                src={shoot.coverImage}
                alt={shoot.title}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover border border-warmGray-300 group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-charcoal-900 text-cream-50">
                    {shoot.category}
                  </span>
                  <span className="text-xs font-bold text-charcoal-950 group-hover:text-gold-700 transition-colors uppercase">
                    {shoot.clientName}
                  </span>
                </div>
                <p className="text-xs text-charcoal-700">
                  {shoot.title}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-warmGray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold-600" /> {shoot.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold-600" /> {shoot.timeRange}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-600" /> {shoot.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Meta & CTA */}
            <div className="flex items-center justify-between md:justify-end gap-4 self-end md:self-center">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-charcoal-950 block">
                  ₹{shoot.packageTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium uppercase">
                  Advance ₹{shoot.advancePaid.toLocaleString('en-IN')} Paid
                </span>
              </div>

              <div className="w-8 h-8 rounded-full border border-warmGray-400 group-hover:border-charcoal-900 group-hover:bg-charcoal-900 group-hover:text-cream-50 flex items-center justify-center text-charcoal-700 transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
