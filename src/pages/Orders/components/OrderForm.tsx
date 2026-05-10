import React from 'react';
import { Store, User, DollarSign, Package, ShieldCheck } from 'lucide-react';
interface OrderFormProps {
  newOrder: any;
  setNewOrder: (order: any) => void;
  employees: any[];
  distributors: any[];
  filteredRetailers: any[];
  products: any[];
  quantities: Record<string, number>;
  setQuantities: (q: any) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  calculateGrandTotal: () => string;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  newOrder, setNewOrder, employees, distributors, filteredRetailers, products, quantities, setQuantities, isSubmitting, onSubmit, onCancel, calculateGrandTotal 
}) => {
  const isPinned = !!newOrder["Customer Name"] && !!newOrder["Distributor"];

  const handleQtyChange = (productId: string, val: string) => {
    const qty = parseInt(val) || 0;
    setQuantities({ ...quantities, [productId]: qty });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col max-h-[70vh]">
      {/* VÙNG 1: TRÌNH BÀY ĐƠN HÀNG (TOP ZONE) */}
      <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 mb-6 shrink-0">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 grid grid-cols-2 gap-4">
            {/* NHÀ PHÂN PHỐI */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" /> Nhà phân phối
              </label>
              {isPinned ? (
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-black text-sm text-on-surface shadow-sm">
                  {distributors.find(d => d.distributorId === newOrder["Distributor"])?.distributorName || newOrder["Distributor"]}
                </div>
              ) : (
                <select 
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm appearance-none shadow-sm"
                  value={newOrder["Distributor"]} 
                  onChange={(e) => setNewOrder({...newOrder, "Distributor": e.target.value, "Customer Name": ""})}
                >
                  <option value="">Chọn NPP</option>
                  {distributors.map((dist, i) => <option key={i} value={dist.distributorId}>{dist.distributorName}</option>)}
                </select>
              )}
            </div>

            {/* ĐẠI LÝ / CỬA HÀNG */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Store size={14} className="text-primary" /> Đại lý
              </label>
              {isPinned ? (
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-black text-sm text-on-surface flex justify-between items-center shadow-sm">
                  {newOrder["Customer Name"]}
                  <ShieldCheck size={14} className="text-primary" />
                </div>
              ) : (
                <select 
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm appearance-none shadow-sm disabled:opacity-50"
                  value={newOrder["Customer Name"]} 
                  disabled={!newOrder["Distributor"]}
                  onChange={(e) => setNewOrder({...newOrder, "Customer Name": e.target.value})}
                >
                  <option value="">Chọn đại lý</option>
                  {filteredRetailers.map((ret, i) => <option key={i} value={ret.retailerName}>{ret.retailerName}</option>)}
                </select>
              )}
            </div>

            {/* NGƯỜI TẠO */}
            <div className="space-y-1.5 col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={14} /> Nhân viên (Sales)
              </label>
              <select 
                required 
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm appearance-none shadow-sm"
                value={newOrder["Sales Rep"]} 
                onChange={(e) => setNewOrder({...newOrder, "Sales Rep": e.target.value})}
              >
                <option value="">Chọn nhân viên</option>
                {employees.map((emp, i) => <option key={i} value={emp["Full Name"]}>{emp["Full Name"]}</option>)}
              </select>
            </div>
          </div>

          {/* TỔNG TIỀN */}
          <div className="col-span-4 flex flex-col justify-end text-right">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 justify-end mb-2">
              <DollarSign size={14} className="text-primary" /> Tổng giá trị
            </label>
            <div className="text-4xl font-black text-primary tracking-tighter">
              {calculateGrandTotal()}
              <span className="text-sm ml-2 text-primary/40 uppercase">VND</span>
            </div>
          </div>
        </div>
      </div>

      {/* VÙNG 2: DANH SÁCH SKU (BOTTOM ZONE) */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 sticky top-0 bg-white pb-2 z-10">
          <Package size={14} className="text-primary" /> Danh mục sản phẩm (SKU)
        </label>
        <div className="grid gap-2">
          {products.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-bold bg-slate-50 rounded-2xl border border-dashed border-slate-200 uppercase tracking-widest">
              Đang tải danh mục từ kho...
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-white border border-transparent hover:border-primary/20 rounded-2xl transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-black text-xs shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                    {product.shortName}
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-sm uppercase leading-tight">{product.name}</div>
                    <div className="text-[10px] text-slate-400 font-black tracking-wider uppercase mt-0.5">
                      {product.price.toLocaleString()} VND / Sản phẩm
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    min="0"
                    placeholder="0"
                    className="w-20 px-3 py-2 bg-white border border-slate-200 rounded-xl font-black text-center text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                    value={quantities[product.id] || ''}
                    onChange={(e) => handleQtyChange(product.id, e.target.value)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 pt-8 shrink-0">
        <button 
          type="button" 
          onClick={onCancel} 
          className="flex-1 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl uppercase text-[11px] tracking-widest hover:bg-slate-200 transition-all" 
          disabled={isSubmitting}
        >
          Hủy bỏ
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className={`flex-1 py-4 font-black rounded-2xl uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 ${isSubmitting ? 'bg-slate-300' : 'bg-primary text-on-primary hover:bg-primary-dark'}`}
        >
          {isSubmitting ? 'Đang tạo đơn...' : 'Xác nhận lên đơn'}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
