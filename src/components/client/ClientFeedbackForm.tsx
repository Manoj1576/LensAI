import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { MOCK_CLIENTS } from '../../data/mockData';
import { 
  Star, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Heart, 
  ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClientFeedbackFormProps {
  onNavigate: (view: ViewMode) => void;
}

export const ClientFeedbackForm: React.FC<ClientFeedbackFormProps> = ({ onNavigate }) => {
  const client = MOCK_CLIENTS[0];
  const [submitted, setSubmitted] = useState(false);
  const [overallRating, setOverallRating] = useState(5);
  const [photographyRating, setPhotographyRating] = useState(5);
  const [commRating, setCommRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [reviewText, setReviewText] = useState(
    'Every moment was captured with such grace and soul. The AI culling saved us weeks of waiting! Karthik and his team were an absolute joy to work with.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A876', '#B08A55', '#1A1714', '#F5F0E6']
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-700 block mb-1">
            CLIENT SATISFACTION & TESTIMONIAL
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
            How Was Your Experience?
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Share your feedback with Karthik Raja Studios to help us celebrate your memories.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        
        {submitted ? (
          <div className="bg-white rounded-lg p-8 sm:p-12 border border-warmGray-300 shadow-luxury text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-charcoal-950 text-gold-400 flex items-center justify-center mx-auto shadow-gold-glow">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <h3 className="font-serif-luxury text-3xl font-bold uppercase text-charcoal-950">
              Thank You, {client.name} & {client.partnerName}!
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Your kind review has been received by Karthik and the team. It means the world to us to have been part of your wedding story.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('client-gallery')}
                className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow"
              >
                Back to Wedding Gallery
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 sm:p-10 border border-warmGray-300 shadow-luxury space-y-6">
            
            {/* Overall 5 Star Rating */}
            <div className="text-center space-y-2 pb-6 border-b border-warmGray-200">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-700 block">
                OVERALL STUDIO RATING
              </span>
              
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setOverallRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        star <= overallRating ? 'text-gold-500 fill-gold-500' : 'text-warmGray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-charcoal-800">
                {overallRating}.0 / 5.0 Rating
              </span>
            </div>

            {/* Granular Dimensions */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal-950">Artistic Photography & Framing:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button type="button" key={s} onClick={() => setPhotographyRating(s)}>
                      <Star className={`w-4 h-4 ${s <= photographyRating ? 'text-gold-500 fill-gold-500' : 'text-warmGray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal-950">Studio Communication & Support:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button type="button" key={s} onClick={() => setCommRating(s)}>
                      <Star className={`w-4 h-4 ${s <= commRating ? 'text-gold-500 fill-gold-500' : 'text-warmGray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal-950">AI Culling Turnaround & Delivery Speed:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button type="button" key={s} onClick={() => setDeliveryRating(s)}>
                      <Star className={`w-4 h-4 ${s <= deliveryRating ? 'text-gold-500 fill-gold-500' : 'text-warmGray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Review Comment Box */}
            <div className="space-y-2 pt-2 border-t border-warmGray-200">
              <label className="block text-[11px] uppercase font-bold text-charcoal-950 tracking-wider">
                Your Review & Testimonial
              </label>
              <textarea
                rows={4}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your shoot experience..."
                className="w-full p-3 bg-cream-50 border border-warmGray-300 rounded text-xs text-charcoal-950 outline-none focus:border-charcoal-900 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => onNavigate('client-dashboard')}
                className="text-xs uppercase font-semibold text-warmGray-500 hover:text-charcoal-950"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest shadow-luxury flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-gold-400" />
                <span>SUBMIT FEEDBACK →</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
