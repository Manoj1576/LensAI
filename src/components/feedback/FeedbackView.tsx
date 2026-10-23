import React, { useState } from 'react';
import { ViewMode, ClientReview } from '../../types';
import { MOCK_REVIEWS } from '../../data/mockData';
import { Star, Quote, Sparkles, Check, Share2, Plus, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FeedbackViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const FeedbackView: React.FC<FeedbackViewProps> = ({ onNavigate }) => {
  const [reviews, setReviews] = useState<ClientReview[]>(MOCK_REVIEWS);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleFeatured = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, featuredOnWebsite: !r.featuredOnWebsite } : r));
  };

  const handleCopyFeedbackLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText('https://lenscraft.ai/feedback/request/karthik-raja-studios');
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#F5F0E6']
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                CLIENT LOVE & TESTIMONIAL ENGINE
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Kind Words
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Cherished reviews from couples and patrons worldwide.
              </p>
            </div>

            <button
              onClick={handleCopyFeedbackLink}
              className="px-5 py-2.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
            >
              {copiedLink ? <Check className="w-4 h-4 text-gold-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Request Client Review Link'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-gold-600">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500" />
                  ))}
                  <span className="text-xs font-mono font-bold text-charcoal-950 ml-2">5.0 / 5.0</span>
                </div>

                {/* Main Quote */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-gold-600/20 absolute -top-4 -left-4 pointer-events-none" />
                  <p className="font-serif-luxury text-xl font-bold uppercase text-charcoal-950 leading-snug">
                    “{rev.quote}”
                  </p>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed italic">
                  “{rev.detailedReview}”
                </p>
              </div>

              {/* Author Footer & Toggle */}
              <div className="pt-4 border-t border-warmGray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-gold-500"
                  />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-charcoal-950">
                      {rev.clientName}
                    </h4>
                    <p className="text-[10px] text-warmGray-500">
                      {rev.eventType} • {rev.date}
                    </p>
                  </div>
                </div>

                {/* Featured on Website Toggle */}
                <button
                  onClick={() => toggleFeatured(rev.id)}
                  className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-colors border ${
                    rev.featuredOnWebsite
                      ? 'bg-gold-500/20 text-gold-700 border-gold-500/50'
                      : 'bg-cream-200 text-charcoal-600 border-warmGray-300'
                  }`}
                  title="Toggle visibility on studio marketing landing"
                >
                  {rev.featuredOnWebsite ? 'Featured ✓' : 'Hidden'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
