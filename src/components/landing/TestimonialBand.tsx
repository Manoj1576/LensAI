import React from 'react';
import { Quote, Sparkles, Star } from 'lucide-react';

export const TestimonialBand: React.FC = () => {
  return (
    <section className="bg-charcoal-950 text-cream-100 py-20 sm:py-28 border-b border-charcoal-800 relative overflow-hidden">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: B/W Photographer Portrait & Studio Stamp */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded overflow-hidden border border-charcoal-700 shadow-luxury-dark group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                alt="Lead Photographer Portrait"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-1">
                  PRINCIPAL ARTIST & FOUNDER
                </span>
                <h4 className="font-serif-luxury text-xl font-bold text-cream-50 uppercase tracking-wider">
                  Karthik Raja
                </h4>
                <p className="text-xs text-warmGray-400">
                  Kodak Master Fellowship Awardee • 450+ Weddings Documented
                </p>
              </div>
            </div>

            {/* Floating Gold Stamp */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-charcoal-900 border border-gold-500/60 p-3 rounded-full shadow-luxury-dark hidden sm:flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-dashed border-gold-400/40 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] tracking-widest text-gold-400 uppercase font-bold">STUDIO</span>
                <span className="text-xs font-serif-luxury font-bold text-cream-50">PRO</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quote + Client Attribution + 3 Stat Counters */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <div className="flex items-center gap-1 mb-4 text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-500" />
                ))}
                <span className="ml-2 text-xs font-mono uppercase tracking-widest text-warmGray-400">
                  5.0 Client Rating
                </span>
              </div>

              <div className="relative">
                <Quote className="w-12 h-12 text-gold-500/20 absolute -top-6 -left-6 pointer-events-none" />
                <p className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-cream-50 font-normal leading-snug tracking-tight italic">
                  “Every moment was captured with such grace and soul. The AI culling saved us weeks of waiting, letting us relive our wedding before our honeymoon even ended.”
                </p>
              </div>

              <div className="mt-6">
                <p className="font-semibold uppercase tracking-widest text-cream-50 text-sm">
                  Rahul Sharma & Priya Nair
                </p>
                <p className="text-xs text-warmGray-400 tracking-wider">
                  Heritage Palace Wedding • Coimbatore, India
                </p>
              </div>
            </div>

            {/* 3 Editorial Stat Counters */}
            <div className="pt-8 border-t border-charcoal-800 grid grid-cols-3 gap-6">
              <div>
                <span className="block font-serif-luxury text-3xl sm:text-4xl font-bold text-gold-400">
                  12+
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-warmGray-400 block mt-1">
                  Years Experience
                </span>
              </div>

              <div>
                <span className="block font-serif-luxury text-3xl sm:text-4xl font-bold text-cream-50">
                  450+
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-warmGray-400 block mt-1">
                  Happy Couples
                </span>
              </div>

              <div>
                <span className="block font-serif-luxury text-3xl sm:text-4xl font-bold text-cream-50">
                  1.2M+
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-warmGray-400 block mt-1">
                  Photos Curated
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
