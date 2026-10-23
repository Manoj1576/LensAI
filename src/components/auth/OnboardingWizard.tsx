import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { 
  User, 
  Building2, 
  Camera, 
  Package, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  MapPin,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  // State
  const [name, setName] = useState('Karthik Raja');
  const [studioName, setStudioName] = useState('Karthik Raja Fine Art Photography');
  const [city, setCity] = useState('Chennai & Coimbatore, India');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Weddings',
    'Pre-Weddings',
    'Portraits',
    'Drone & Aerial'
  ]);
  const [baseRate, setBaseRate] = useState('85000');
  const [turnaroundDays, setTurnaroundDays] = useState('7');

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A876', '#B08A55', '#1A1714', '#F5F0E6']
      });
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top Brand Header */}
      <div className="max-w-2xl mx-auto w-full text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 border border-warmGray-300 text-gold-700 text-[10px] uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INITIAL STUDIO SETUP WIZARD</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
          Configure Your Operating System
        </h1>

        {/* 5-Step Progress Bar */}
        <div className="flex items-center justify-between pt-4 pb-2 max-w-md mx-auto">
          {['Profile', 'Studio', 'Services', 'Packages', 'Ready'].map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isCurrent = step === stepNum;

            return (
              <div key={label} className="flex flex-col items-center flex-1 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all z-10 ${
                  isDone 
                    ? 'bg-charcoal-900 text-gold-400' 
                    : isCurrent 
                    ? 'bg-gold-500 text-charcoal-950 ring-4 ring-gold-500/20 shadow-gold-glow' 
                    : 'bg-cream-200 text-warmGray-500 border border-warmGray-300'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                </div>
                <span className={`text-[10px] uppercase tracking-wider mt-1.5 font-semibold ${
                  isCurrent ? 'text-charcoal-950' : 'text-warmGray-500'
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Step Card */}
      <div className="max-w-2xl w-full mx-auto bg-cream-50 rounded-lg p-8 sm:p-10 border border-warmGray-300 shadow-luxury my-8">
        
        {/* STEP 01: PROFILE */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block">STEP 01</span>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Photographer Profile
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Your credentials as the principal artist and founder.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-charcoal-700 font-bold mb-1">
                  Full Name / Principal Artist *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-warmGray-300 rounded text-sm text-charcoal-950 outline-none focus:border-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-charcoal-700 font-bold mb-1">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="karthik.raja@lenscraft.ai"
                  className="w-full px-4 py-2.5 bg-white border border-warmGray-300 rounded text-sm text-charcoal-950 outline-none focus:border-charcoal-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 02: STUDIO */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block">STEP 02</span>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Studio Brand & Location
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Set up your brand name, legal entity, and headquarters.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-charcoal-700 font-bold mb-1">
                  Studio Trade Name *
                </label>
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-warmGray-300 rounded text-sm text-charcoal-950 outline-none focus:border-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-charcoal-700 font-bold mb-1">
                  Operating City / Region
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-warmGray-300 rounded text-sm text-charcoal-950 outline-none focus:border-charcoal-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 03: SERVICES */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block">STEP 03</span>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Photography Categories & Disciplines
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Select the types of sessions you document.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'Weddings',
                'Pre-Weddings',
                'Portraits',
                'Drone & Aerial',
                'Commercial & Architecture',
                'Fashion & Editorial',
                'Celebrity & Events'
              ].map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <div
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`p-3.5 rounded border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-charcoal-900 text-cream-50 border-charcoal-900 shadow-sm'
                        : 'bg-white text-charcoal-800 border-warmGray-300 hover:border-charcoal-700'
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider">{cat}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 04: PACKAGES */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block">STEP 04</span>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Pricing & Delivery Expectations
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Benchmark your base packages and AI-assisted turnaround times.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-charcoal-700 font-bold mb-1">
                  Average Day Package (₹)
                </label>
                <input
                  type="number"
                  value={baseRate}
                  onChange={(e) => setBaseRate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-warmGray-300 rounded text-sm text-charcoal-950 font-mono outline-none focus:border-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-charcoal-700 font-bold mb-1">
                  AI Culling Target (Days)
                </label>
                <input
                  type="number"
                  value={turnaroundDays}
                  onChange={(e) => setTurnaroundDays(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-warmGray-300 rounded text-sm text-charcoal-950 font-mono outline-none focus:border-charcoal-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 05: READY */}
        {step === 5 && (
          <div className="text-center space-y-6 animate-fadeIn py-4">
            <div className="w-16 h-16 rounded-full bg-charcoal-950 text-gold-400 border border-gold-500 flex items-center justify-center mx-auto shadow-gold-glow">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold block mb-1">
                SYSTEM CONFIGURATION COMPLETE
              </span>
              <h3 className="font-serif-luxury text-3xl font-bold uppercase text-charcoal-950">
                Your Workspace Is Ready.
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mt-2 leading-relaxed">
                Welcome, <strong>{name}</strong>. {studioName} is set up with automated AI photo culling, luxury client proofing, and project tracking.
              </p>
            </div>

            <div className="p-4 bg-charcoal-950 text-cream-100 rounded text-left text-xs space-y-1.5 border border-charcoal-800">
              <p className="text-gold-400 font-bold uppercase tracking-wider text-[10px]">Studio Summary:</p>
              <p>• {studioName} ({city})</p>
              <p>• Disciplines: {selectedCategories.join(', ')}</p>
              <p>• AI Culling Engine: <strong>Enabled (45MP RAW Non-Destructive)</strong></p>
            </div>
          </div>
        )}

        {/* Action Controls Footer */}
        <div className="mt-8 pt-6 border-t border-warmGray-300 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs uppercase tracking-wider text-charcoal-700 hover:text-charcoal-950 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-luxury transition-all flex items-center gap-2"
          >
            <span>{step === 5 ? 'ENTER LENSCRAFT →' : 'Continue'}</span>
            {step < 5 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Footer info */}
      <div className="text-center text-[11px] text-warmGray-500">
        LensCraft Studio OS • Professional Photographer Workflow Architecture
      </div>

    </div>
  );
};
