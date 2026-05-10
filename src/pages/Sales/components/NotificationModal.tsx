import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Plus } from 'lucide-react';

const NotificationModal = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: '',
    type: 'Quan trọng',
    target: 'Tất cả',
    content: ''
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
              <div className=\"w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-inner\">
                <Mail size={24} />
              </div>
              <div>
                <h2 className=\"font-headline-sm text-headline-sm text-on-surface\">Thông báo nhóm</h2>
                <p className=\"text-xs text-on-surface-variant font-medium\">Gửi tin nhắn broadcast cho toàn bộ nhân sự</p>
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
              <h3 className=\"text-2xl font-bold text-on-surface mb-2\">Đã gửi thông báo!</h3>
              <p className=\"text-on-surface-variant max-w-[240px]\">Toàn bộ nhân viên sẽ nhận được thông báo này.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className=\"space-y-4\">
              <div className=\"space-y-2\">
                <label className=\"text-sm font-bold text-on-surface-variant\">Tiêu đề thông báo</label>
                <input required placeholder=\"Ví dụ: Họp khẩn cấp cuối ngày...\" className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none\" value={notificationData.title} onChange={(e) => setNotificationData({...notificationData, title: e.target.value})} />
              </div>
              <div className=\"grid grid-cols-2 gap-4\">
                <div className=\"space-y-2\">
                  <label className=\"text-sm font-bold text-on-surface-variant\">Loại tin</label>
                  <select className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none\" value={notificationData.type} onChange={(e) => setNotificationData({...notificationData, type: e.target.value})}>
                    <option value=\"Quan trọng\">Quan trọng</option>
                    <option value=\"Khẩn cấp\">Khẩn cấp</option>
                    <option value=\"Tin tức\">Tin tức</option>
                    <option value=\"Nhắc nhở\">Nhắc nhở</option>
                  </select>
                </div>
                <div className=\"space-y-2\">
                  <label className=\"text-sm font-bold text-on-surface-variant\">Đối tượng</label>
                  <select className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none\" value={notificationData.target} onChange={(e) => setNotificationData({...notificationData, target: e.target.value})}>
                    <option value=\"Tất cả\">Tất cả nhân sự</option>
                    <option value=\"Quản lý\">Chỉ Quản lý</option>
                    <option value=\"Sale\">Chỉ Field Sales</option>
                  </select>
                </div>
              </div>
              <div className=\"space-y-2\">
                <label className=\"text-sm font-bold text-on-surface-variant\">Nội dung tin nhắn</label>
                <textarea required rows={4} placeholder=\"Nhập nội dung thông báo tại đây...\" className=\"w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none\" value={notificationData.content} onChange={(e) => setNotificationData({...notificationData, content: e.target.value})} />
              </div>
              <div className=\"flex gap-4 pt-4\">
                <button type=\"button\" onClick={onClose} className=\"flex-1 py-4 bg-slate-100 text-on-surface font-bold rounded-2xl hover:bg-slate-200 transition-colors\">Hủy</button>
                <button type=\"submit\" disabled={isSubmitting} className=\"flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200/50 transition-all disabled:opacity-50\">
                  {isSubmitting ? \"Đang gửi...\" : \"Gửi Broadcast\"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
