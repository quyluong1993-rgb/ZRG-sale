import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

interface SalesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SalesToolbar: React.FC<SalesToolbarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className=\"bg-white border-2 border-outline-variant rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm\">
      <div className=\"relative w-full md:max-w-md\">
        <Search className=\"absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant\" size={20} />
        <input 
          type=\"text\"
          placeholder=\"Tìm theo tên, mã nhân viên hoặc khu vực...\"
          className=\"w-full pl-12 pr-4 py-3 bg-slate-50 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all\"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className=\"flex gap-2 w-full md:w-auto\">
        <button className=\"flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl font-label-bold text-sm text-on-surface hover:bg-slate-50 transition-colors\">
          <Filter size={18} /> Lọc
        </button>
        <button className=\"flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl font-label-bold text-sm text-on-surface hover:bg-slate-50 transition-colors\">
          <Download size={18} /> Xuất file
        </button>
      </div>
    </div>
  );
};

export default SalesToolbar;
