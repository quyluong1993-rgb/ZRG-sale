import React from 'react';
import { Plus, Download, Printer } from 'lucide-react';

interface Props {
  onAddClick: () => void;
}

const InventoryHeader = ({ onAddClick }: Props) => (
  <div className=\"mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4\">
    <div>
      <h1 className=\"font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-2 text-primary\">Quản lý Kho Bỉm</h1>
      <p className=\"font-body-md text-body-md text-on-surface-variant\">Theo dõi tồn kho real-time và nhập/xuất hàng hóa từ Google Sheets.</p>
    </div>
    <div className=\"flex gap-2\">
      <button className=\"flex items-center gap-2 px-4 py-2 bg-white border-2 border-outline-variant rounded-xl font-label-bold text-sm text-on-surface hover:bg-slate-50 transition-colors shadow-sm\">
        <Download size={18} /> <span className=\"hidden sm:inline\">Xuất File</span>
      </button>
      <button onClick={onAddClick} className=\"flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-bold text-sm hover:shadow-lg transition-all shadow-primary/20\">
        <Plus size={18} /> <span>Nhập Kho</span>
      </button>
    </div>
  </div>
);

export default InventoryHeader;
