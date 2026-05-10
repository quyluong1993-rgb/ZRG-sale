import React from 'react';
import { Package } from 'lucide-react';

interface OrderHeaderProps {
  onAddClick: () => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ onAddClick }) => (
  <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
    <div>
      <h1 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-2">Quản lý Đơn hàng</h1>
      <p className="font-body-md text-body-md text-on-surface-variant">Theo dõi luồng đơn hàng từ thực địa về kho trung tâm.</p>
    </div>
    <button 
      onClick={onAddClick}
      className="w-full md:w-auto px-6 py-3 bg-primary text-on-primary rounded-xl font-label-bold hover:shadow-lg transition-all shadow-primary/20 flex items-center justify-center gap-2"
    >
      <Package size={20} />
      Tạo đơn hàng mới
    </button>
  </div>
);

export default OrderHeader;
