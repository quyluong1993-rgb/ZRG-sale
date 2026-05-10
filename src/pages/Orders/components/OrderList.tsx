import React from 'react';
import { Package, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface OrderListProps {
  orders: any[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'HOÀN THÀNH':
      case 'DELIVERED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'ĐANG XỬ LÝ':
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'MỚI':
      case 'NEW':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'HOÀN THÀNH': return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
      case 'ĐANG XỬ LÝ': return <Clock className="w-3.5 h-3.5 mr-1" />;
      case 'MỚI': return <AlertCircle className="w-3.5 h-3.5 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="px-4 pb-20">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Đơn hàng</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Đại lý / Shop</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Tổng tiền</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order, idx) => (
                <tr key={order.Order_ID || idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">#{order.Order_ID || 'N/A'}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{order.Date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center mr-2 border border-slate-200">
                        <Package className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 leading-tight">{order.Shop_ID || 'N/A'}</span>
                        <span className="text-[10px] text-slate-500">{order.Employee_ID || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-black text-slate-900">{order.Total_Amount || '0'}đ</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(order.Status)}`}>
                      {getStatusIcon(order.Status)}
                      {order.Status || 'MỚI'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
