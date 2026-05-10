import React, { useState } from 'react';
import { X, Calendar, MessageSquare, Clock, FileText, CheckCircle2, Plus } from 'lucide-react';

const LeaveModal = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leaveData, setLeaveData] = useState({
    type: 'Nghỉ phép năm',
    startDate: '',
    endDate: '',
    reason: ''
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
              <div className=\"w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-inner\">
                <Calendar size={24} />
              </div>
              <div>
                <h2 className=\"font-headline-sm text-headline-sm text-on-surface\">Yêu cầu nghỉ phép</h2>
                <p className=\"text-xs text-on-surface-variant font-medium\">Đăng ký nghỉ phép hoặc vắng mặt</p>
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
              <p className=\"text-on-surface-variant max-w-[240px]\">Hệ thống sẽ cập nhật sau khi quản lý phê duyệt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className=\"space-y-4\">
              <div className=\"space-y-2\">
                <label className=\"text-sm font-bold text-on-surface-variant\">Loại nghỉ phép</label>
                <select className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none\" value={leaveData.type} onChange={(e) => setLeaveData({...leaveData, type: e.target.value})}>
                  <option value=\"Nghỉ phép năm\">Nghỉ phép năm</option>
                  <option value=\"Nghỉ ốm\">Nghỉ ốm</option>
                  <option value=\"Việc riêng\">Việc riêng (Không lương)</option>
                  <option value=\"Khác\">Khác</option>
                </select>
              </div>
              <div className=\"grid grid-cols-2 gap-4\">
                <div className=\"space-y-2\">
                  <label className=\"text-sm font-bold text-on-surface-variant\">Từ ngày</label>
                  <input type=\"date\" required className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none\" value={leaveData.startDate} onChange={(e) => setLeaveData({...leaveData, startDate: e.target.value})} />
                </div>
                <div className=\"space-y-2\">
                  <label className=\"text-sm font-bold text-on-surface-variant\">Đến ngày</label>
                  <input type=\"date\" required className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none\" value={leaveData.endDate} onChange={(e) => setLeaveData({...leaveData, endDate: e.target.value})} />
                </div>
              </div>
              <div className=\"space-y-2\">
                <label className=\"text-sm font-bold text-on-surface-variant\">Lý do nghỉ</label>
                <textarea required rows={3} placeholder=\"Nhập lý do chi tiết...\" className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none\" value={leaveData.reason} onChange={(e) => setLeaveData({...leaveData, reason: e.target.value})} />
              </div>
              <div className=\"flex gap-4 pt-4\">
                <button type=\"button\" onClick={onClose} className=\"flex-1 py-4 bg-slate-100 text-on-surface font-bold rounded-2xl hover:bg-slate-200 transition-colors\">Hủy</button>
                <button type=\"submit\" disabled={isSubmitting} className=\"flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all disabled:opacity-50\">
                  {isSubmitting ? \"Đang gửi...\" : \"Gửi yêu cầu\"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
