import React from 'react';
import { ShoppingCart } from 'lucide-react';

const EmptyState = () => (
  <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-3xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center shadow-inner bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
    <div className="bg-white/80 backdrop-blur-sm p-12 rounded-full border border-outline-variant/30 flex flex-col items-center">
      <ShoppingCart size={64} className="text-primary/20 mb-4" />
      <p className="font-body-lg text-on-surface-variant font-bold">Chưa có đơn hàng nào được chọn</p>
      <p className="text-sm text-on-surface-variant/60 mt-1">Chọn một đơn hàng từ danh sách hoặc tạo đơn mới</p>
    </div>
  </div>
);

export default EmptyState;
