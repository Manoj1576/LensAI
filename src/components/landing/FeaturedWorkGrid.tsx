import React from 'react';
import { ViewMode } from '../../types';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';

interface FeaturedWorkGridProps {
  onNavigate: (view: ViewMode) => void;
}

export const FeaturedWorkGrid: React.FC<FeaturedWorkGridProps> = ({ onNavigate }) => {
  const featuredProjects = [
    {
      id: 'proj-1',
      title: 'Rahul & Priya',
      category: 'Heritage Wedding • Coimbatore',
      date: 'June 2026',
      frames: '5,000 RAW Frames • AI Culled',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      aiBadge: '3,842 Curated'
    },
    {
      id: 'proj-2',
      title: 'Arjun & Meera',
      category: 'Palatial Pre-Wedding • Udaipur',
      date: 'July 2026',
      frames: '3,200 RAW Frames',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
      aiBadge: 'Golden Hour'
    },
    {
      id: 'proj-3',
      title: 'Ananya Iyer',
      category: 'Editorial Fine Art Portrait • Chennai',
      date: 'August 2026',
      frames: '1,200 Frames • Studio B',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      aiBadge: 'Magazine Cover'
    },
    {
      id: 'proj-4',
      title: 'Urban Frames Co.',
      category: 'Commercial Architecture • Bangalore',
      date: 'August 2026',
      frames: '850 Frames • HDR Brackets',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      aiBadge: 'Tier-1 Client'
    }
  ];

  return (
    <section className="bg-cream-50 py-20 border-b border-warmGray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-2">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-charcoal-950 font-bold uppercase tracking-tight">
              Featured Work
            </h2>
          </div>

          <button
            onClick={() => onNavigate('galleries')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-900 hover:text-gold-700 pb-1 border-b border-charcoal-900 hover:border-gold-700 transition-all self-start md:self-auto"
          >
            <span>View All Portfolio Galleries</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Image Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onNavigate('project')}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container with Soft Zoom */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded bg-charcoal-900 border border-warmGray-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-charcoal-950/20 group-hover:bg-transparent transition-colors duration-300"></div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-950/80 backdrop-blur-md border border-gold-500/40 rounded text-[10px] uppercase tracking-widest font-semibold text-gold-400">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    {project.aiBadge}
                  </span>
                </div>

                {/* Hover Quick Open Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal-950/40 backdrop-blur-[2px]">
                  <span className="px-5 py-2.5 bg-cream-50 text-charcoal-950 rounded text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-luxury">
                    <Eye className="w-4 h-4" /> Open Project Studio
                  </span>
                </div>
              </div>

              {/* Caption Section */}
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950 tracking-wide group-hover:text-gold-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    {project.category}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono uppercase text-warmGray-500 tracking-wider block">
                    {project.date}
                  </span>
                  <span className="text-[10px] text-gold-700 font-semibold uppercase tracking-wider">
                    {project.frames}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
