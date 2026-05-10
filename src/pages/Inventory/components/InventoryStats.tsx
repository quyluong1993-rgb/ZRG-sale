import React from 'react';
import { Package, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  totalSku: number;
}

const InventoryStats = ({ totalSku }: Props) => (
  <div className=\"grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8\">
    <div className=\"bg-surface-container-lowest p-card-padding border-2 border-outline-variant rounded border-l-4 border-l-primary shadow-sm\">
      <div className=\"flex justify-between items-start\">
        <span className=\"font-label-md text-on-surface-variant uppercase tracking-wider\">TỔNG MÃ SKU</span>
        <Package size={20} className=\"text-primary\" />
      </div>
      <div className=\"mt-2 flex items-baseline gap-2\">
        <span className=\"font-headline-sm text-headline-sm text-on-surface\">{totalSku}</span>
        <span className=\"font-label-bold text-label-bold\">Sản phẩm</span>
      </div>
    </div>

    <div className=\"bg-surface-container-lowest p-card-padding border-2 border-outline-variant rounded border-l-4 border-l-emerald-500 shadow-sm\">
      <div className=\"flex justify-between items-start\">
        <span className=\"font-label-md text-on-surface-variant uppercase tracking-wider\">TRẠNG THÁI KHO</span>
        <ShieldCheck size={20} className=\"text-emerald-500\" />
      </div>
      <div className=\"mt-2 flex items-baseline gap-2\">
        <span className=\"font-headline-sm text-headline-sm text-on-surface\">Ổn định</span>
      </div>
    </div>

    <div className=\"bg-surface-container-lowest p-card-padding border-2 border-outline-variant rounded border-l-4 border-l-amber-500 shadow-sm\">
      <div className=\"flex justify-between items-start\">
        <span className=\"font-label-md text-on-surface-variant uppercase tracking-wider\">CẢNH BÁO TỒN</span>
        <AlertCircle size={20} className=\"text-amber-500\" />
      </div>
      <div className=\"mt-2 flex items-baseline gap-2\">
        <span className=\"font-headline-sm text-headline-sm text-on-surface\">0</span>
        <span className=\"font-label-bold text-label-bold\">Mã sắp hết</span>
      </div>
    </div>
  </div>
);

export default InventoryStats;
