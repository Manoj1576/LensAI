import React from 'react';
import { ViewMode } from '../../types';
import { Users, Calendar, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface CategoryStripProps {
  onNavigate: (view: ViewMode) => void;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'clients' as ViewMode,
      title: 'CLIENTS',
      subtitle: 'Manage relationships and communication.',
      icon: <Users className="w-6 h-6 stroke-[1.4]" />,
      actionText: 'View Clients CRM',
      countBadge: '14 Active'
    },
    {
      id: 'calendar' as ViewMode,
      title: 'SHOOTS',
      subtitle: 'Plan and organize every session.',
      icon: <Calendar className="w-6 h-6 stroke-[1.4]" />,
      actionText: 'View Calendar',
      countBadge: '03 This Week'
    },
    {
      id: 'ai-culling' as ViewMode,
      title: 'AI CULLING',
      subtitle: 'Turn thousands of photos into your best selection.',
      icon: <Sparkles className="w-6 h-6 stroke-[1.4] text-gold-600" />,
      actionText: 'Launch AI Suite',
      countBadge: '5,000 Frames'
    },
    {
      id: 'galleries' as ViewMode,
      title: 'GALLERIES',
      subtitle: 'Deliver beautiful final collections.',
      icon: <ImageIcon className="w-6 h-6 stroke-[1.4]" />,
      actionText: 'Explore Galleries',
      countBadge: '12 Published'
    }
  ];

  return (
    <section className="bg-cream-100 py-16 sm:py-20 border-b border-warmGray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-2">
            INTEGRATED STUDIO ECOSYSTEM
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-charcoal-950 font-bold uppercase tracking-tight">
            Four Pillars. One Seamless Flow.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-charcoal-700">
            Eliminate fragmented apps and disjointed spreadsheets. Experience unified creative management.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className="bg-cream-50 p-8 rounded border border-warmGray-300 hover:border-charcoal-800 hover:shadow-luxury transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Circular Line Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-full border border-warmGray-400 group-hover:border-gold-600 group-hover:bg-gold-500/10 flex items-center justify-center text-charcoal-900 group-hover:text-gold-700 transition-all duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-charcoal-600 bg-cream-200 px-2 py-0.5 rounded">
                    {cat.countBadge}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950 tracking-wider mb-2 group-hover:text-gold-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-warmGray-200 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-charcoal-900 group-hover:text-gold-700">
                <span>{cat.actionText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
