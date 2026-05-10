import React from 'react';
import { X, Package, ChevronRight, CheckCircle2 } from 'lucide-react';
import { productCatalog } from './useInventoryLogic';

interface Props {
  newStock: any;
  setNewStock: (val: any) => void;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddStockModal = ({ newStock, setNewStock, isSubmitting, onClose, onSubmit }: Props) => (
  <div className=\"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200\">
    <div className=\"bg-white w-full max-w-lg rounded-[28px] shadow-2xl overflow-hidden border border-outline-variant animate-in zoom-in-95 duration-200\">
      <div className=\"p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low\">
        <div className=\"flex items-center gap-3\">
          <div className=\"w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20\">
            <Package size={20} />
          </div>
          <div>
            <h2 className=\"text-xl font-bold text-on-surface uppercase tracking-tight\">Nhập Kho Mới</h2>
            <p className=\"text-[10px] font-black text-on-surface-variant uppercase tracking-widest\">Google Sheets Real-time</p>
          </div>
        </div>
        <button onClick={onClose} className=\"p-2 hover:bg-slate-100 rounded-full transition-colors text-on-surface-variant\">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className=\"p-8 space-y-6\">
        <div className=\"space-y-2\">
          <label className=\"text-[11px] font-black text-on-surface-variant uppercase tracking-wider\">Chọn sản phẩm</label>
          <select 
            required
            className=\"w-full px-4 py-3 bg-slate-50 border border-outline-variant rounded-xl font-bold text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none transition-all\"
            value={newStock.itemID}
            onChange={(e) => setNewStock({...newStock, itemID: e.target.value})}
          >
            <option value=\"\">-- Chọn mã bỉm --</option>
            {Object.entries(productCatalog).map(([id, info]) => (
              <option key={id} value={id}>{id} - {info.name}</option>
            ))}
          </select>
        </div>

        <div className=\"grid grid-cols-2 gap-4\">
          <div className=\"space-y-2\">
            <label className=\"text-[11px] font-black text-on-surface-variant uppercase tracking-wider\">Số lượng (Thùng)</label>
            <input 
              type=\"number\" 
              required 
              min=\"1\"
              placeholder=\"0\"
              className=\"w-full px-4 py-3 bg-slate-50 border border-outline-variant rounded-xl font-bold text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all\"
              value={newStock.quantity}
              onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
            />
          </div>
          <div className=\"space-y-2\">
            <label className=\"text-[11px] font-black text-on-surface-variant uppercase tracking-wider\">Loại nhập</label>
            <select 
              className=\"w-full px-4 py-3 bg-slate-50 border border-outline-variant rounded-xl font-bold text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none transition-all\"
              value={newStock.status}
              onChange={(e) => setNewStock({...newStock, status: e.target.value})}
            >
              <option value=\"Nhập mới\">Nhập mới</option>
              <option value=\"Hoàn hàng\">Hoàn hàng</option>
              <option value=\"Chuyển kho\">Chuyển kho</option>
            </select>
          </div>
        </div>

        <div className=\"space-y-2\">
          <label className=\"text-[11px] font-black text-on-surface-variant uppercase tracking-wider\">Kho nhận</label>
          <input 
            type=\"text\" 
            className=\"w-full px-4 py-3 bg-slate-100 border border-outline-variant rounded-xl font-bold text-sm text-on-surface-variant cursor-not-allowed\"
            value={newStock.location}
            readOnly
          />
        </div>

        <div className=\"flex gap-4 pt-4\">
          <button type=\"button\" onClick={onClose} className=\"flex-1 py-4 bg-slate-100 text-on-surface font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-slate-200 transition-colors\">Hủy</button>
          <button 
            type=\"submit\" 
            disabled={isSubmitting}
            className=\"flex-[2] py-4 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2\"
          >
            {isSubmitting ? (
              <div className=\"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin\"></div>
            ) : (
              <>Xác nhận nhập kho <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default AddStockModal;
