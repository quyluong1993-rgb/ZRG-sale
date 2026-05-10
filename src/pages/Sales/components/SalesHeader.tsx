import React from 'react';
import { Mail, CreditCard, Calendar, Plus } from 'lucide-react';

interface SalesHeaderProps {
  onShowNotification: () => void;
  onShowExpense: () => void;
  onShowLeave: () => void;
  onShowAdd: () => void;
}

const SalesHeader: React.FC<SalesHeaderProps> = ({ 
  onShowNotification, 
  onShowExpense, 
  onShowLeave, 
  onShowAdd 
}) => {
  return (
    <div className=\"mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4\">
      <div>
        <h1 className=\"font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-2 text-primary\">Đội ngũ Sales Force</h1>
        <p className=\"font-body-md text-body-md text-on-surface-variant\">Quản lý hồ sơ, khu vực làm việc và chỉ tiêu doanh số hàng tháng.</p>
      </div>
      <div className=\"flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap\">
        <button onClick={onShowNotification} className=\"flex-shrink-0 flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-outline-variant rounded-xl font-label-bold text-xs md:text-sm text-on-surface hover:bg-slate-50 transition-colors shadow-sm\">
          <Mail size={16} /> <span className=\"whitespace-nowrap\">Thông báo</span>
        </button>
        <button onClick={onShowExpense} className=\"flex-shrink-0 flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-outline-variant rounded-xl font-label-bold text-xs md:text-sm text-on-surface hover:bg-slate-50 transition-colors shadow-sm\">
          <CreditCard size={16} className=\"text-amber-600\" /> <span className=\"whitespace-nowrap\">Quyết toán</span>
        </button>
        <button onClick={onShowLeave} className=\"flex-shrink-0 flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-outline-variant rounded-xl font-label-bold text-xs md:text-sm text-on-surface hover:bg-slate-50 transition-colors shadow-sm\">
          <Calendar size={16} className=\"text-blue-600\" /> <span className=\"whitespace-nowrap\">Nghỉ phép</span>
        </button>
        <button onClick={onShowAdd} className=\"flex-shrink-0 flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-on-primary rounded-xl font-label-bold text-xs md:text-sm hover:shadow-lg transition-all shadow-primary/20\">
          <Plus size={16} /> <span className=\"whitespace-nowrap\">Thêm mới</span>
        </button>
      </div>
    </div>
  );
};

export default SalesHeader;
