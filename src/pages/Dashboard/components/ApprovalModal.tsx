import React from 'react';
import { Check, X, Clock, User, DollarSign, Calendar } from 'lucide-react';

interface ApprovalItem {
  id: string;
  user: string;
  title: string;
  amount?: string;
  type?: string;
  date: string;
  status: string;
}

interface Props {
  type: 'expense' | 'leave';
  items: ApprovalItem[];
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isSubmitting?: boolean;
}

const ApprovalModal = ({ type, items, onClose, onApprove, onReject, isSubmitting }: Props) => {
  const isExpense = type === 'expense';
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl overflow-hidden border border-outline-variant animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div>
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              {isExpense ? <DollarSign size={24} className="text-amber-600" /> : <Calendar size={24} className="text-rose-600" />}
              Phê duyệt {isExpense ? 'Quyết toán' : 'Nghỉ phép'}
            </h2>
            <p className="text-xs text-on-surface-variant font-medium">Danh sách các yêu cầu đang chờ xử lý</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-variant rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 bg-slate-50">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <Clock size={48} className="mx-auto text-slate-300 mb-2" />
              <p className="text-slate-500 font-medium">Không có yêu cầu nào chờ phê duyệt</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm flex justify-between items-center hover:border-primary/30 transition-all">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface">{item.user}</div>
                    <div className="text-sm text-on-surface-variant font-medium">{item.title}</div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                        <Clock size={10} /> {item.date}
                      </span>
                      {item.amount && (
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">
                          {item.amount} VNĐ
                        </span>
                      )}
                      {item.type && (
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => onReject(item.id)}
                    disabled={isSubmitting}
                    className="w-10 h-10 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Từ chối"
                  >
                    <X size={20} />
                  </button>
                  <button 
                    onClick={() => onApprove(item.id)}
                    disabled={isSubmitting}
                    className="w-10 h-10 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Phê duyệt"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Check size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 bg-white border-t border-outline-variant flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-slate-100 text-on-surface font-bold rounded-xl hover:bg-slate-200 transition-colors">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
