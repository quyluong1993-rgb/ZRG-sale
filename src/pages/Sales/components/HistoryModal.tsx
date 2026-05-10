import React from 'react';
import { X, MapPin, Clock, Navigation, Calendar, CalendarDays } from 'lucide-react';

const HistoryModal = ({ employee, checkins, onClose }: { employee: any, checkins: any[], onClose: () => void }) => {
  return (
    <div className=\"fixed inset-0 z-[100] flex items-center justify-end bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-300\">
      <div className=\"bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500\">
        
        {/* Header */}
        <div className=\"p-6 border-b border-outline-variant bg-surface-container-low flex justify-between items-center\">
          <div className=\"flex items-center gap-4\">
            <div className=\"w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20\">
              {employee[\"Full Name\"]?.substring(0, 1)}
            </div>
            <div>
              <h2 className=\"font-bold text-on-surface text-lg leading-tight\">Lộ trình Thực địa</h2>
              <p className=\"text-xs text-on-surface-variant font-medium\">NV: {employee[\"Full Name\"]} • {employee[\"Employee ID\"]}</p>
            </div>
          </div>
          <button onClick={onClose} className=\"p-2 hover:bg-slate-100 rounded-full transition-colors text-on-surface-variant\">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className=\"flex-1 overflow-y-auto bg-slate-50\">
          <div className=\"p-6\">
            <div className=\"bg-white rounded-3xl border border-outline-variant p-6 mb-6 shadow-sm\">
              <div className=\"flex items-center gap-2 mb-6\">
                <CalendarDays size={20} className=\"text-primary\" />
                <h3 className=\"font-black text-xs text-on-surface-variant uppercase tracking-widest\">Hoạt động hôm nay</h3>
              </div>

              {checkins.length === 0 ? (
                <div className=\"py-12 text-center\">
                  <div className=\"w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300\">
                    <Navigation size={32} />
                  </div>
                  <p className=\"text-on-surface-variant font-medium\">Chưa có hoạt động nào được ghi nhận hôm nay.</p>
                </div>
              ) : (
                <div className=\"space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100\">
                  {checkins.map((check, i) => (
                    <div key={i} className=\"flex gap-6 relative z-10\">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${i === 0 ? 'bg-primary text-white' : 'bg-white border-2 border-slate-100 text-slate-400'}`}>
                        {i === 0 ? <Navigation size={18} /> : <MapPin size={18} />}
                      </div>
                      <div className=\"flex-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 hover:border-primary/20 transition-all\">
                        <div className=\"flex justify-between items-start mb-2\">
                          <h4 className=\"font-bold text-on-surface leading-tight\">{check.shopName}</h4>
                          <div className=\"flex flex-col items-end\">
                             <span className=\"text-[10px] font-black text-primary uppercase\">{check.timestamp?.split(' ')[1]}</span>
                             <span className=\"text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter\">{check.timestamp?.split(' ')[0]}</span>
                          </div>
                        </div>
                        <p className=\"text-xs text-on-surface-variant mb-4 font-medium flex items-center gap-1\">
                          <MapPin size={10} /> {check.address || 'Đang cập nhật địa chỉ...'}
                        </p>
                        
                        {check.photo && (
                          <div className=\"aspect-video rounded-xl overflow-hidden border border-outline-variant bg-slate-200 group relative\">
                            <img src={check.photo} alt=\"Check-in\" className=\"w-full h-full object-cover\" />
                            <div className=\"absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors\"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <div className=\"bg-white rounded-3xl border border-outline-variant p-2 shadow-sm aspect-video relative overflow-hidden\">
              {checkins.length > 0 ? (
                <iframe 
                  width=\"100%\" 
                  height=\"100%\" 
                  style={{ border: 0, borderRadius: '20px' }}
                  loading=\"lazy\" 
                  allowFullScreen 
                  src={`https://maps.google.com/maps?q=${checkins[0].lat},${checkins[0].lng}&z=15&output=embed`}
                ></iframe>
              ) : (
                <div className=\"w-full h-full bg-slate-100 flex items-center justify-center text-on-surface-variant font-bold text-sm italic\">
                  Bản đồ lộ trình nhân sự
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className=\"p-6 border-t border-outline-variant bg-white\">
          <button onClick={onClose} className=\"w-full py-4 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all\">
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
