import React from 'react';
import { User, LogOut } from 'lucide-react';

export const MobileHeader = () => {
  return (
    <header className="md:hidden flex items-center justify-between px-margin-edge py-4 bg-surface border-b border-outline-variant sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary text-on-primary rounded flex items-center justify-center font-black text-lg shadow-premium">B</div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight leading-none text-on-surface">BABE-MICCI</span>
          <span className="text-[8px] font-black tracking-widest text-primary uppercase">DMS GLOBAL</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors">
          <User size={18} />
        </button>
        <button className="w-9 h-9 rounded-full bg-error-container/20 flex items-center justify-center text-error hover:bg-error-container/40 transition-colors">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
