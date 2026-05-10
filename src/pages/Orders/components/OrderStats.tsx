import React from 'react';

interface OrderStatsProps {
  orders: any[];
}

const OrderStats: React.FC<OrderStatsProps> = ({ orders = [] }) => {
  const safeOrders = Array.isArray(orders) ? orders : [];
  const stats = [
    { label: 'Tất cả', val: safeOrders.length.toString(), color: 'border-l-primary' },
    { label: 'Đơn mới', val: safeOrders.filter(o => o.Status?.toUpperCase() === 'MỚI' || o.Status?.toUpperCase() === 'NEW').length.toString(), color: 'border-l-amber-500' },
    { label: 'Đang xử lý', val: safeOrders.filter(o => o.Status?.toUpperCase() === 'ĐANG XỬ LÝ' || o.Status?.toUpperCase() === 'PROCESSING').length.toString(), color: 'border-l-blue-500' },
    { label: 'Hoàn thành', val: safeOrders.filter(o => o.Status?.toUpperCase() === 'HOÀN THÀNH' || o.Status?.toUpperCase() === 'DELIVERED').length.toString(), color: 'border-l-emerald-500' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 mb-6 mt-4">
      {stats.map((s, i) => (
        <div key={i} className={`bg-white p-3 border border-slate-200 rounded-xl border-l-4 ${s.color} shadow-sm`}>
          <div className="text-slate-500 text-[9px] font-bold uppercase mb-0.5 tracking-wider">{s.label}</div>
          <div className="text-xl font-black text-slate-900">{s.val.padStart(2, '0')}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;
