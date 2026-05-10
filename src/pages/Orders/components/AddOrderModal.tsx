import React from 'react';
import { Award, Package, MoreVertical } from 'lucide-react';
import OrderForm from './OrderForm';

interface AddOrderModalProps {
  isSubmitting: boolean;
  saveSuccess: boolean;
  onClose: () => void;
  newOrder: any;
  setNewOrder: (order: any) => void;
  employees: any[];
  distributors: any[];
  filteredRetailers: any[];
  products: any[];
  quantities: Record<string, number>;
  setQuantities: (q: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  calculateGrandTotal: () => string;
}

const AddOrderModal: React.FC<AddOrderModalProps> = (props) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => !props.isSubmitting && props.onClose()}></div>
      <div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          {props.saveSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl"><Award size={48} /></div>
              <h2 className="text-3xl font-black text-on-surface mb-2">Đã tạo đơn hàng!</h2>
              <p className="text-on-surface-variant font-medium">Hệ thống đang gửi dữ liệu về kho...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3"><div className="p-2 bg-primary/10 text-primary rounded-lg"><Package size={24} /></div><h2 className="text-2xl font-bold text-on-surface">Tạo đơn hàng mới</h2></div>
                <button onClick={props.onClose} className="p-2 hover:bg-slate-100 rounded-full" disabled={props.isSubmitting}><MoreVertical size={24} className="rotate-45" /></button>
              </div>
              <OrderForm {...props} onCancel={props.onClose} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOrderModal;
