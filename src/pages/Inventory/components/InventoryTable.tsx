import React from 'react';
import { Package, Filter } from 'lucide-react';

interface Props {
  inventory: any[];
  isLoading: boolean;
  onRefresh: () => void;
}

const InventoryTable = ({ inventory, isLoading, onRefresh }: Props) => (
  <div className=\"bg-surface-container-lowest border-2 border-outline-variant rounded-2xl overflow-hidden shadow-sm\">
    <div className=\"p-4 md:p-5 border-b-2 border-outline-variant flex justify-between items-center bg-surface-container-low\">
      <div className=\"flex items-center gap-3\">
        <div className=\"w-1.5 h-6 bg-primary rounded-full\"></div>
        <span className=\"font-headline-sm text-xs md:text-sm uppercase tracking-widest font-black text-on-surface-variant\">DANH SÁCH SẢN PHẨM</span>
      </div>
      <button onClick={onRefresh} className=\"flex items-center gap-2 px-3 py-1.5 bg-white border border-outline-variant rounded-lg font-label-bold text-[10px] md:text-xs hover:bg-slate-50 transition-colors shadow-sm\">
        <Filter size={14} /> <span className=\"hidden sm:inline\">LÀM MỚI</span>
      </button>
    </div>

    <div className=\"overflow-x-auto\">
      {isLoading ? (
        <LoadingState />
      ) : inventory.length === 0 ? (
        <EmptyState />
      ) : (
        <table className=\"w-full text-left border-collapse min-w-[600px]\">
          <thead>
            <tr className=\"bg-slate-50 border-b border-outline-variant\">
              {['Item ID', 'Tên sản phẩm', 'Phân loại', 'Số lượng (Thùng)', 'Vị trí', 'Trạng thái'].map(h => (
                <th key={h} className=\"p-4 text-[10px] md:text-xs font-black uppercase tracking-tighter text-on-surface-variant\">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index} className=\"border-b border-outline-variant hover:bg-slate-50/50 transition-colors\">
                <td className=\"p-4 font-bold text-primary text-xs md:text-sm\">{item[\"Item ID\"]}</td>
                <td className=\"p-4 font-medium text-xs md:text-sm\">{item[\"Item Name\"]}</td>
                <td className=\"p-4\"><Badge text={item[\"Category\"]} /></td>
                <td className=\"p-4 font-black text-on-surface text-sm md:text-base\">{item[\"Quantity\"]} Thùng</td>
                <td className=\"p-4 text-on-surface-variant text-[11px] md:text-sm\">{item[\"Location\"]}</td>
                <td className=\"p-4\"><StatusBadge status={item[\"Status\"]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

const LoadingState = () => (
  <div className=\"p-20 text-center flex flex-col items-center gap-4\">
    <div className=\"w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin\" />
    <p className=\"text-on-surface-variant font-medium\">Đang tải dữ liệu từ Google Sheets...</p>
  </div>
);

const EmptyState = () => (
  <div className=\"p-20 text-center flex flex-col items-center gap-4\">
    <Package size={48} className=\"opacity-20\" />
    <p className=\"text-on-surface-variant font-medium\">Chưa có dữ liệu tồn kho nào.</p>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <span className=\"px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap\">{text}</span>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = status === 'Nhập mới' ? 'bg-emerald-100 text-emerald-700' : status === 'Hoàn hàng' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600';
  return <span className={`px-2 py-1 rounded text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap ${styles}`}>{status}</span>;
};

export default InventoryTable;
