import React, { useState } from 'react';
import { X, CreditCard, DollarSign, Image as ImageIcon, Calendar, FileText, CheckCircle2, Plus } from 'lucide-react';

const ExpenseModal = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: '',
    amount: '',
    category: 'Xăng xe',
    date: new Date().toISOString().split('T')[0],
    note: '',
    photo: null as string | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(onClose, 2000);
    }, 1500);
  };

  return (
    <div className=\"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200\">
      <div className=\"bg-white w-full max-w-xl rounded-[28px] shadow-2xl overflow-hidden border border-outline-variant animate-in zoom-in-95 duration-200\">
        <div className=\"p-8\">
          <div className=\"flex justify-between items-center mb-6\">
            <div className=\"flex items-center gap-3\">
              <div className=\"w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner\">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className=\"font-headline-sm text-headline-sm text-on-surface\">Quyết toán chi phí</h2>
                <p className=\"text-xs text-on-surface-variant font-medium\">Gửi hóa đơn công tác & chi phí thực địa</p>
              </div>
            </div>
            <button onClick={onClose} className=\"p-2 hover:bg-slate-100 rounded-full transition-colors text-on-surface-variant\">
              <Plus size={24} className=\"rotate-45\" />
            </button>
          </div>

          {isSuccess ? (
            <div className=\"py-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300\">
              <div className=\"w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-200/50\">
                <CheckCircle2 size={40} />
              </div>
              <h3 className=\"text-2xl font-bold text-on-surface mb-2\">Đã gửi yêu cầu!</h3>
              <p className=\"text-on-surface-variant max-w-[240px]\">Quản lý sẽ xem xét và phê duyệt trong thời gian sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className=\"space-y-4\">
              <div className=\"space-y-2\">
                <label className=\"text-sm font-bold text-on-surface-variant\">Nội dung chi phí</label>
                <input required placeholder=\"Ví dụ: Xăng xe công tác tháng 5...\" className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none\" value={expenseData.title} onChange={(e) => setExpenseData({...expenseData, title: e.target.value})} />
              </div>
              <div className=\"grid grid-cols-2 gap-4\">
                <div className=\"space-y-2\">
                  <label className=\"text-sm font-bold text-on-surface-variant\">Số tiền (VNĐ)</label>
                  <div className=\"relative\">
                    <DollarSign size={16} className=\"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400\" />
                    <input type=\"number\" required placeholder=\"0\" className=\"w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none\" value={expenseData.amount} onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})} />
                  </div>
                </div>
                <div className=\"space-y-2\">
                  <label className=\"text-sm font-bold text-on-surface-variant\">Phân loại</label>
                  <select className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none\" value={expenseData.category} onChange={(e) => setExpenseData({...expenseData, category: e.target.value})}>
                    <option value=\"Xăng xe\">Xăng xe</option>
                    <option value=\"Tiếp khách\">Tiếp khách</option>
                    <option value=\"Lưu trú\">Lưu trú</option>
                    <option value=\"Khác\">Khác</option>
                  </select>
                </div>
              </div>
              <div className=\"space-y-2 text-center pt-2\">
                <button type=\"button\" className=\"w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-primary/30 transition-all group\">
                  <ImageIcon size={32} className=\"text-slate-300 group-hover:text-primary transition-colors\" />
                  <span className=\"text-sm font-bold text-slate-400 group-hover:text-on-surface\">Chụp hóa đơn / Chứng từ</span>
                </button>
              </div>
              <div className=\"flex gap-4 pt-4\">
                <button type=\"button\" onClick={onClose} className=\"flex-1 py-4 bg-slate-100 text-on-surface font-bold rounded-2xl hover:bg-slate-200 transition-colors\">Hủy</button>
                <button type=\"submit\" disabled={isSubmitting} className=\"flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all disabled:opacity-50\">
                  {isSubmitting ? \"Đang xử lý...\" : \"Gửi quyết toán\"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
