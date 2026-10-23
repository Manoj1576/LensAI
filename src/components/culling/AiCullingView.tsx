import React, { useState } from 'react';
import { ViewMode, AiCullingPhoto } from '../../types';
import { MOCK_AI_PHOTOS, BURST_PHOTOS_GROUP_1 } from '../../data/mockData';
import { AiScanningHero } from './AiScanningHero';
import { AiResultsGrid } from './AiResultsGrid';
import { AiPhotoInspectorModal } from './AiPhotoInspectorModal';
import { SimilarPhotoBurstGroup } from './SimilarPhotoBurstGroup';
import { AiCullingSummary } from './AiCullingSummary';
import { Sparkles, Layers, Grid, BarChart, Upload, ArrowLeft } from 'lucide-react';

interface AiCullingViewProps {
  onNavigate: (view: ViewMode) => void;
}

type CullingSubTab = 'upload-scan' | 'grid' | 'burst-compare' | 'summary';

export const AiCullingView: React.FC<AiCullingViewProps> = ({ onNavigate }) => {
  const [photos, setPhotos] = useState<AiCullingPhoto[]>(MOCK_AI_PHOTOS);
  const [activeTab, setActiveTab] = useState<CullingSubTab>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<AiCullingPhoto | null>(null);

  const handleUpdateDecision = (photoId: string, decision: 'KEEP' | 'REVIEW' | 'REJECT') => {
    setPhotos(prev => prev.map(p => {
      if (p.id === photoId) {
        return {
          ...p,
          photographerDecision: decision
        };
      }
      return p;
    }));

    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(prev => prev ? { ...prev, photographerDecision: decision } : null);
    }
  };

  const handleKeepBurstBest = (bestPhotoId: string) => {
    setPhotos(prev => prev.map(p => {
      if (p.burstGroupId === 'burst-varmala') {
        if (p.id === bestPhotoId) {
          return { ...p, photographerDecision: 'KEEP' };
        } else {
          return { ...p, photographerDecision: 'REJECT' };
        }
      }
      return p;
    }));
    setActiveTab('grid');
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner Header */}
      <div className="bg-charcoal-950 text-cream-100 border-b border-charcoal-800 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <button
                  onClick={() => onNavigate('workspace')}
                  className="text-warmGray-400 hover:text-gold-400 text-xs uppercase tracking-widest flex items-center gap-1 transition-colors mr-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Workspace
                </button>
                <span className="text-gold-500 font-mono">•</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold">
                  PROJECT: RAHUL & PRIYA WEDDING
                </span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-cream-50">
                AI Photo Culling Engine
              </h1>
            </div>

            {/* Sub-tab Switcher */}
            <div className="flex items-center bg-charcoal-900 p-1 rounded border border-charcoal-750 self-start md:self-auto overflow-x-auto">
              <button
                onClick={() => setActiveTab('upload-scan')}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'upload-scan'
                    ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                    : 'text-warmGray-300 hover:text-cream-50'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload & Scan</span>
              </button>

              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'grid'
                    ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                    : 'text-warmGray-300 hover:text-cream-50'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Results Grid (5,000)</span>
              </button>

              <button
                onClick={() => setActiveTab('burst-compare')}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'burst-compare'
                    ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                    : 'text-warmGray-300 hover:text-cream-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Burst Compare (8)</span>
              </button>

              <button
                onClick={() => setActiveTab('summary')}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'summary'
                    ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                    : 'text-warmGray-300 hover:text-cream-50'
                }`}
              >
                <BarChart className="w-3.5 h-3.5" />
                <span>Culling ROI</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {activeTab === 'upload-scan' && (
          <AiScanningHero 
            onScanComplete={() => setActiveTab('grid')} 
          />
        )}

        {activeTab === 'grid' && (
          <AiResultsGrid
            photos={photos}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            onUpdatePhotoDecision={handleUpdateDecision}
            onOpenBurstCompare={() => setActiveTab('burst-compare')}
          />
        )}

        {activeTab === 'burst-compare' && (
          <SimilarPhotoBurstGroup
            burstPhotos={photos.filter(p => p.burstGroupId === 'burst-varmala')}
            onKeepBestFrame={handleKeepBurstBest}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        )}

        {activeTab === 'summary' && (
          <AiCullingSummary
            onNavigate={onNavigate}
            onReviewSelection={() => setActiveTab('grid')}
          />
        )}

      </div>

      {/* Deep AI Inspector Modal */}
      <AiPhotoInspectorModal
        photo={selectedPhoto}
        allPhotos={photos}
        onClose={() => setSelectedPhoto(null)}
        onUpdateDecision={handleUpdateDecision}
        onSelectPhoto={(p) => setSelectedPhoto(p)}
      />

    </div>
  );
};
