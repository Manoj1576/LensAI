import React, { useState } from 'react';
import { UserRole, ViewMode } from '../../types';
import { Sparkles, ArrowRight, Lock, Mail, Camera, ShieldCheck, Users, Heart } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onNavigateToOnboarding: () => void;
  onNavigateToMarketing: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToOnboarding,
  onNavigateToMarketing
}) => {
  const [email, setEmail] = useState('karthik.raja@lenscraft.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  const handleQuickRoleLogin = (role: UserRole) => {
    if (role === 'admin') {
      setEmail('karthik.raja@lenscraft.ai');
    } else if (role === 'assistant') {
      setEmail('swathi.m@lenscraft.ai');
    } else {
      setEmail('rahul.priya.wedding@gmail.com');
    }
    setSelectedRole(role);
    onLoginSuccess(role);
  };

  return (
    <div className="min-h-screen w-full bg-cream-100 flex flex-col lg:flex-row select-none">
      
      {/* LEFT COLUMN: 55-60% CINEMATIC PHOTOGRAPHY HERO */}
      <div className="relative lg:w-[58%] min-h-[40vh] lg:min-h-screen bg-charcoal-950 flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
            alt="Cinematic Wedding Masterpiece"
            className="w-full h-full object-cover filter brightness-[0.45] contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-charcoal-950/30 backdrop-blur-[0.5px]"></div>
        </div>

        {/* Top Branding */}
        <div 
          onClick={onNavigateToMarketing}
          className="relative z-10 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full border border-gold-500/80 bg-charcoal-900/90 flex items-center justify-center text-gold-400 group-hover:rotate-45 transition-transform duration-500 shadow-gold-glow">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
              <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
              <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
              <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
              <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
              <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
            </svg>
          </div>
          <div>
            <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-cream-50 uppercase block">
              LENSCRAFT<span className="text-gold-500 font-sans text-xs ml-1 font-light">AI</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-warmGray-400">
              Photographer Operating System
            </span>
          </div>
        </div>

        {/* Center Emotional Tagline */}
        <div className="relative z-10 max-w-lg my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900/80 border border-gold-500/30 text-gold-400 text-[10px] uppercase tracking-[0.25em] font-semibold mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Multi-Role Studio Architecture</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-cream-50 leading-[1.1]">
            Your photography business, <br />
            <span className="italic font-editorial-display font-normal text-gold-400">beautifully organized.</span>
          </h1>
          <p className="text-xs sm:text-sm text-warmGray-300 mt-4 leading-relaxed font-light max-w-md">
            Lead inquiry → quotation → booking → RAW upload → AI culling → client gallery & payment collection.
          </p>
        </div>

        {/* Bottom Credits & Quote */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-warmGray-400 border-t border-charcoal-800/80 pt-4">
          <span>Shoot: Rahul & Priya • Coimbatore</span>
          <span>45MP RAW • AI Curated</span>
        </div>

      </div>

      {/* RIGHT COLUMN: 40-45% CREAM LOGIN PANEL */}
      <div className="lg:w-[42%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-cream-100 text-charcoal-900">
        
        <div className="max-w-md w-full mx-auto space-y-6">
          
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 font-bold block mb-1">
              AUTHENTICATE & DETECT ROLE
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
              Sign In
            </h2>
            <p className="text-xs text-charcoal-600 mt-1">
              Select your role or enter credentials to load your workspace.
            </p>
          </div>

          {/* Quick 1-Click Role Login Selector */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-warmGray-500 block">
              1-CLICK DEMO LOGIN AS:
            </span>

            <div className="grid grid-cols-3 gap-2">
              {/* Admin */}
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('admin')}
                className="p-3 bg-charcoal-950 text-cream-100 rounded border border-gold-500/80 hover:border-gold-400 transition-all text-center flex flex-col items-center justify-center gap-1 group shadow-sm hover:scale-105"
              >
                <Camera className="w-4 h-4 text-gold-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider block">1. Admin</span>
                <span className="text-[8px] text-warmGray-400">Karthik Raja</span>
              </button>

              {/* Assistant */}
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('assistant')}
                className="p-3 bg-white text-charcoal-900 rounded border border-warmGray-300 hover:border-charcoal-900 transition-all text-center flex flex-col items-center justify-center gap-1 group shadow-sm hover:scale-105"
              >
                <Users className="w-4 h-4 text-charcoal-800" />
                <span className="text-[10px] font-bold uppercase tracking-wider block">2. Assistant</span>
                <span className="text-[8px] text-warmGray-500">Swathi M.</span>
              </button>

              {/* Client */}
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('client')}
                className="p-3 bg-white text-charcoal-900 rounded border border-warmGray-300 hover:border-charcoal-900 transition-all text-center flex flex-col items-center justify-center gap-1 group shadow-sm hover:scale-105"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-wider block">3. Client</span>
                <span className="text-[8px] text-warmGray-500">Rahul & Priya</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-warmGray-300"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-warmGray-400 tracking-wider">or sign in with password</span>
            <div className="flex-grow border-t border-warmGray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-charcoal-700 font-bold mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-warmGray-300 rounded text-sm text-charcoal-950 outline-none focus:border-charcoal-900"
                />
                <Mail className="w-4 h-4 text-warmGray-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] uppercase tracking-widest text-charcoal-700 font-bold">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Reset link sent.'); }} className="text-[10px] uppercase text-gold-700 hover:text-charcoal-950">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-warmGray-300 rounded text-sm text-charcoal-950 outline-none focus:border-charcoal-900 font-mono"
                />
                <Lock className="w-4 h-4 text-warmGray-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-charcoal-900 hover:bg-charcoal-950 text-cream-50 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-luxury transition-all flex items-center justify-center gap-2"
            >
              <span>LOG IN TO WORKSPACE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* First time setup */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onNavigateToOnboarding}
              className="text-xs uppercase font-semibold text-gold-700 hover:text-charcoal-950 tracking-wider"
            >
              First Time Setup? Launch Onboarding Wizard →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
