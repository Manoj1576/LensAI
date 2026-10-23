import React from 'react';
import { ViewMode } from '../../types';
import { MOCK_SHOOTS } from '../../data/mockData';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Camera, Users } from 'lucide-react';

interface NextShootSpotlightProps {
  onNavigate: (view: ViewMode) => void;
  onOpenProject: (projectId: string) => void;
}

export const NextShootSpotlight: React.FC<NextShootSpotlightProps> = ({
  onNavigate,
  onOpenProject
}) => {
  const nextShoot = MOCK_SHOOTS[0]; // Rahul & Priya Wedding

  return (
    <div className="bg-charcoal-950 text-cream-100 rounded-lg border border-charcoal-800 shadow-luxury-dark overflow-hidden transition-all duration-300">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side: Large Wedding Photograph */}
        <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[320px] overflow-hidden group">
          <img
            src={nextShoot.coverImage}
            alt={nextShoot.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal-950"></div>
          
          {/* Top Status Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-950/80 backdrop-blur-md border border-gold-500/50 rounded text-[10px] uppercase tracking-widest font-semibold text-gold-400">
              <Sparkles className="w-3 h-3 text-gold-400" />
              AI Culling in Progress (84%)
            </span>
          </div>

          <div className="absolute bottom-4 left-4 z-10 text-xs text-warmGray-300 font-mono">
            <span>5,000 RAW Frames • 3,842 AI Approved</span>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold">
                NEXT ON YOUR CALENDAR
              </span>
              <span className="text-xs font-mono text-warmGray-400">
                Shoot ID: #SH-2026-089
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-cream-50">
              {nextShoot.clientName}
            </h2>
            <p className="text-sm text-gold-400/90 font-medium tracking-wide uppercase mt-1">
              {nextShoot.title}
            </p>

            {/* Shoot Metadata Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-warmGray-300 border-y border-charcoal-850 py-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{nextShoot.date}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{nextShoot.timeRange}</span>
              </div>
              <div className="flex items-center gap-2.5 sm:col-span-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{nextShoot.venue}, {nextShoot.city}</span>
              </div>
              <div className="flex items-center gap-2.5 sm:col-span-2">
                <Users className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Crew: Lead ({nextShoot.leadPhotographer}), Candid ({nextShoot.secondShooter}), Drone ({nextShoot.droneOperator})</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                onOpenProject(nextShoot.id);
                onNavigate('project');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold rounded text-xs uppercase tracking-[0.2em] shadow-gold-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>OPEN PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('ai-culling')}
              className="w-full sm:w-auto px-5 py-3 bg-charcoal-900 hover:bg-charcoal-800 text-cream-100 border border-charcoal-700 hover:border-gold-500/40 rounded text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Review AI Culling (RAW)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
