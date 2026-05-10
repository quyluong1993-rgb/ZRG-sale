import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const PendingApprovals = () => {
  const items = [
    { id: 1, type: 'Quyết toán', user: 'Lê Văn Tám', amount: '1.200.000đ', time: '10 phút trước' },
    { id: 2, type: 'Nghỉ phép', user: 'Nguyễn Thị Hoa', amount: '2 ngày', time: '1 giờ trước' },
  ];

  return (
    <div className=\"bg-surface-container-lowest border-2 border-outline-variant rounded-2xl overflow-hidden shadow-sm\">
      <div className=\"p-4 border-b-2 border-outline-variant bg-surface-container-low flex justify-between items-center\">
        <span className=\"font-headline-sm text-[10px] md:text-xs uppercase tracking-widest font-black text-on-surface-variant\">PHÊ DUYỆT CHỜ</span>
        <span className=\"bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full\">{items.length}</span>
      </div>
      <div className=\"divide-y-2 divide-outline-variant\">
        {items.map(item => (
          <div key={item.id} className=\"p-4 hover:bg-slate-50 transition-colors\">
            <div className=\"flex justify-between items-start mb-2\">
              <span className=\"text-[10px] font-black uppercase text-primary tracking-tighter\">{item.type}</span>
              <span className=\"text-[9px] text-on-surface-variant flex items-center gap-1\">
                <Clock size={10} /> {item.time}
              </span>
            </div>
            <p className=\"font-bold text-sm text-on-surface mb-1\">{item.user}</p>
            <p className=\"text-xs font-medium text-on-surface-variant mb-3\">Nội dung: {item.amount}</p>
            <div className=\"flex gap-2\">
              <button className=\"flex-1 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-lg border border-emerald-200 hover:bg-emerald-100\">Duyệt</button>
              <button className=\"flex-1 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase rounded-lg border border-rose-200 hover:bg-rose-100\">Từ chối</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovals;
