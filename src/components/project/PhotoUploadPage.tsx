import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileImage, 
  HardDrive, 
  ShieldCheck,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhotoUploadPageProps {
  onNavigate: (view: ViewMode) => void;
}

export const PhotoUploadPage: React.FC<PhotoUploadPageProps> = ({ onNavigate }) => {
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(5000);

  const startUploadSimulation = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadedCount(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedCount(5000);
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#C9A876', '#B08A55', '#1A1714']
          });
          return 100;
        }
        const next = prev + 20;
        setUploadedCount(Math.round((next / 100) * 5000));
        return next;
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold">
                  PROJECT: RAHUL & PRIYA WEDDING
                </span>
                <span className="text-warmGray-400">•</span>
                <span className="text-xs font-mono text-warmGray-500">STAGE 05: RAW UPLOAD</span>
              </div>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Upload Your Shoot
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Bring your frames into LensCraft AI for neural blink detection & burst clustering.
              </p>
            </div>

            <button
              onClick={() => onNavigate('ai-culling')}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>START AI CULLING →</span>
            </button>

          </div>

        </div>
      </div>

      {/* Main Upload Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Big Drag & Drop Zone */}
        <div className="bg-cream-50 rounded-lg p-10 sm:p-16 border-2 border-dashed border-warmGray-400 hover:border-charcoal-900 text-center space-y-6 transition-all duration-300 group cursor-pointer shadow-sm">
          
          {/* Animated Upload Icon */}
          <div className="w-20 h-20 rounded-full bg-cream-200 border border-warmGray-400 group-hover:border-charcoal-900 flex items-center justify-center mx-auto text-charcoal-900 transition-all group-hover:scale-110">
            <UploadCloud className="w-10 h-10 stroke-[1.4]" />
          </div>

          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase text-charcoal-950">
              Drag & Drop Shoot Files Here
            </h3>
            <p className="text-xs text-charcoal-600 mt-1 max-w-md mx-auto">
              Direct folder upload supported. Files are processed locally and securely encrypted on upload.
            </p>
          </div>

          {/* Supported Formats */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {['CR3 (Canon)', 'ARW (Sony)', 'NEF (Nikon)', 'DNG (Adobe)', 'JPG / JPEG', 'PNG', 'WEBP'].map((fmt) => (
              <span key={fmt} className="px-2.5 py-1 bg-cream-200 border border-warmGray-300 rounded text-[10px] font-mono font-bold text-charcoal-800">
                {fmt}
              </span>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={startUploadSimulation}
              disabled={isUploading}
              className="px-6 py-3 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-widest shadow-luxury transition-all disabled:opacity-50"
            >
              {isUploading ? 'Uploading 5,000 RAW Frames...' : 'Browse Computer Files'}
            </button>

            <button
              onClick={() => onNavigate('ai-culling')}
              className="px-5 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-widest shadow-gold-glow transition-all"
            >
              Simulate Complete Upload (5,000 Frames)
            </button>
          </div>

        </div>

        {/* Upload Progress Status Card */}
        <div className="bg-charcoal-950 text-cream-100 rounded-lg p-6 sm:p-8 border border-charcoal-800 shadow-luxury-dark space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-gold-400" />
              <div>
                <span className="font-mono text-xs text-gold-400 font-bold block">
                  Batch: 2026_06_20_RAHUL_PRIYA_WEDDING_RAW
                </span>
                <span className="text-[11px] text-warmGray-400">
                  {uploadedCount.toLocaleString('en-IN')} of 5,000 files uploaded (82.4 GB)
                </span>
              </div>
            </div>

            <span className="font-mono text-sm font-bold text-gold-400">
              {uploadProgress}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-charcoal-800 rounded-full h-2.5 overflow-hidden border border-charcoal-700">
            <div 
              className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-charcoal-850 text-warmGray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Original camera metadata & EXIF tags intact. Non-destructive XMP ready.</span>
            </div>

            <button
              onClick={() => onNavigate('ai-culling')}
              className="text-xs uppercase font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 self-end sm:self-auto"
            >
              <span>Proceed to AI Culling Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
