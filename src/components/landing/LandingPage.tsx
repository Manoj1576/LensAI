import React from 'react';
import { ViewMode } from '../../types';
import { LandingHero } from './LandingHero';
import { CategoryStrip } from './CategoryStrip';
import { FeaturedWorkGrid } from './FeaturedWorkGrid';
import { TestimonialBand } from './TestimonialBand';
import { ProcessStrip } from './ProcessStrip';
import { CtaBand } from './CtaBand';

interface LandingPageProps {
  onNavigate: (view: ViewMode) => void;
  onOpenNewProject: () => void;
  onOpenShowreel: () => void;
  onOpenFullWorkflow: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenNewProject,
  onOpenShowreel,
  onOpenFullWorkflow
}) => {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <LandingHero 
        onNavigate={onNavigate} 
        onOpenNewProject={onOpenNewProject} 
        onOpenShowreel={onOpenShowreel} 
      />
      <CategoryStrip onNavigate={onNavigate} />
      <FeaturedWorkGrid onNavigate={onNavigate} />
      <TestimonialBand />
      <ProcessStrip 
        onNavigate={onNavigate} 
        onOpenFullWorkflow={onOpenFullWorkflow} 
      />
      <CtaBand 
        onNavigate={onNavigate} 
        onOpenNewProject={onOpenNewProject} 
      />
    </div>
  );
};
