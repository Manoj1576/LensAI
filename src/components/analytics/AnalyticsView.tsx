import React from 'react';
import { ViewMode } from '../../types';
import { 
  BarChart3, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  Calendar, 
  Smile, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface AnalyticsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 280000, shoots: 12 },
    { month: 'Feb', revenue: 340000, shoots: 15 },
    { month: 'Mar', revenue: 310000, shoots: 14 },
    { month: 'Apr', revenue: 420000, shoots: 19 },
    { month: 'May', revenue: 460000, shoots: 24 },
    { month: 'Jun', revenue: 485000, shoots: 28 },
  ];

  const categoryShare = [
    { name: 'Weddings', percentage: 58, count: '16 Shoots', amount: '₹2,81,300' },
    { name: 'Pre-Weddings', percentage: 22, count: '6 Shoots', amount: '₹1,06,700' },
    { name: 'Portraits & Fashion', percentage: 12, count: '4 Shoots', amount: '₹58,200' },
    { name: 'Commercial Architecture', percentage: 8, count: '2 Shoots', amount: '₹38,800' },
  ];

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-1">
                STUDIO INTELLIGENCE & PERFORMANCE
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950">
                Your Business, In Frame.
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Financial health, client velocity, and tangible AI time savings.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-cream-200 border border-warmGray-300 rounded text-xs font-mono text-charcoal-800">
                Q2 2026 Season Analysis
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* 4 Large Editorial Metrics (No colorful SaaS cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-cream-50 rounded p-6 sm:p-8 border border-warmGray-300">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal-700 block mb-2">
              MONTHLY REVENUE
            </span>
            <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-charcoal-950 font-mono block">
              ₹4,85,000
            </span>
            <div className="mt-4 pt-3 border-t border-warmGray-200 text-xs text-emerald-800 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% vs last month</span>
            </div>
          </div>

          <div className="bg-cream-50 rounded p-6 sm:p-8 border border-warmGray-300">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal-700 block mb-2">
              CONFIRMED BOOKINGS
            </span>
            <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-charcoal-950 block">
              28
            </span>
            <div className="mt-4 pt-3 border-t border-warmGray-200 text-xs text-charcoal-600">
              Across 4 major Indian cities
            </div>
          </div>

          <div className="bg-cream-50 rounded p-6 sm:p-8 border border-warmGray-300">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal-700 block mb-2">
              COMPLETED SHOOTS
            </span>
            <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-charcoal-950 block">
              21
            </span>
            <div className="mt-4 pt-3 border-t border-warmGray-200 text-xs text-charcoal-600">
              100% on-time gallery handover
            </div>
          </div>

          <div className="bg-cream-50 rounded p-6 sm:p-8 border border-warmGray-300">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal-700 block mb-2">
              CLIENT SATISFACTION
            </span>
            <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-charcoal-950 block">
              4.8 <span className="text-xl font-normal text-warmGray-500 font-sans">/ 5.0</span>
            </span>
            <div className="mt-4 pt-3 border-t border-warmGray-200 text-xs text-gold-700 font-medium">
              ★ 42 Five-star reviews recorded
            </div>
          </div>

        </div>

        {/* TIME SAVED WITH AI — SIGNATURE VALUE SPOTLIGHT */}
        <div className="bg-charcoal-950 text-cream-100 rounded-lg p-8 sm:p-12 border border-gold-500 shadow-luxury-dark space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-charcoal-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold">
                  AI BUSINESS VALUE & ROI
                </span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-cream-50">
                Time Saved With AI
              </h2>
            </div>
            <p className="text-xs text-warmGray-400 max-w-md">
              By offloading repetitive blink detection, blur rejection, and burst grouping to LensCraft AI, your studio recaptures hundreds of billable creative hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-charcoal-900 rounded border border-charcoal-800">
              <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-gold-400 block">
                42,850
              </span>
              <span className="text-xs uppercase tracking-widest text-warmGray-400 block mt-2">
                Photos Analyzed
              </span>
            </div>

            <div className="p-6 bg-charcoal-900 rounded border border-charcoal-800">
              <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-cream-50 block">
                36 Hours
              </span>
              <span className="text-xs uppercase tracking-widest text-warmGray-400 block mt-2">
                Estimated Time Saved
              </span>
            </div>

            <div className="p-6 bg-charcoal-900 rounded border border-charcoal-800">
              <span className="font-serif-luxury text-4xl sm:text-5xl font-bold text-emerald-400 font-mono block">
                ₹1,44,000
              </span>
              <span className="text-xs uppercase tracking-widest text-warmGray-400 block mt-2">
                Assistant Cost Equivalent
              </span>
            </div>
          </div>

        </div>

        {/* Visual Charts & Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Monthly Trends Chart (8 cols) */}
          <div className="lg:col-span-8 bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
                Revenue Trajectory (2026)
              </h3>
              <span className="text-xs font-mono text-charcoal-600">Monthly in INR (₹)</span>
            </div>

            {/* Minimal SVG Bar & Line Chart */}
            <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-4 border-b border-warmGray-300">
              {monthlyRevenueData.map((d) => {
                const heightPct = Math.round((d.revenue / 500000) * 100);
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono font-bold text-charcoal-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{(d.revenue / 1000).toFixed(0)}k
                    </span>
                    <div 
                      className="w-full max-w-[48px] bg-charcoal-900 group-hover:bg-gold-500 rounded-t transition-all duration-300"
                      style={{ height: `${heightPct}%` }}
                    ></div>
                    <span className="text-xs font-mono text-charcoal-700 uppercase font-semibold">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shoot Categories Breakdown (4 cols) */}
          <div className="lg:col-span-4 bg-cream-50 rounded-lg p-6 sm:p-8 border border-warmGray-300 space-y-5">
            <h3 className="font-serif-luxury text-2xl font-bold uppercase text-charcoal-950">
              Revenue By Category
            </h3>

            <div className="space-y-4">
              {categoryShare.map((cat) => (
                <div key={cat.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-charcoal-950 font-bold">{cat.name}</span>
                    <span className="font-mono text-charcoal-700">{cat.percentage}% ({cat.amount})</span>
                  </div>
                  <div className="w-full bg-cream-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-charcoal-900 h-full rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
