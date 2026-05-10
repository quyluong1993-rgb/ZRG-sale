import React from 'react';
import { MapPin, Phone, Calendar, MoreVertical, Edit2, Trash2, History, ChevronRight } from 'lucide-react';

interface EmployeeCardProps {
  employee: any;
  onViewHistory: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onViewHistory, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className=\"bg-white border-2 border-outline-variant rounded-3xl p-5 hover:shadow-xl hover:border-primary/20 transition-all group relative\">
      <div className=\"flex justify-between items-start mb-4\">
        <div className=\"flex gap-4\">
          <div className=\"w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl shadow-inner\">
            {employee[\"Full Name\"]?.substring(0, 1) || \"?\"}
          </div>
          <div>
            <h3 className=\"font-bold text-on-surface text-lg leading-tight group-hover:text-primary transition-colors\">{employee[\"Full Name\"]}</h3>
            <div className=\"flex items-center gap-1.5 mt-1\">
              <span className=\"px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-wider\">{employee[\"Employee ID\"]}</span>
              <span className=\"px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider\">{employee[\"Position\"]}</span>
            </div>
          </div>
        </div>
        <div className=\"relative\">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className=\"p-2 hover:bg-slate-50 rounded-full transition-colors text-on-surface-variant\"
          >
            <MoreVertical size={20} />
          </button>
          
          {showMenu && (
            <div className=\"absolute right-0 mt-2 w-48 bg-white border border-outline-variant rounded-2xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-150\">
              <button onClick={() => { onEdit(); setShowMenu(false); }} className=\"w-full px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-on-surface hover:bg-slate-50 transition-colors\">
                <Edit2 size={16} /> Chỉnh sửa
              </button>
              <button onClick={() => { onViewHistory(); setShowMenu(false); }} className=\"w-full px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-on-surface hover:bg-slate-50 transition-colors\">
                <History size={16} /> Lịch sử check-in
              </button>
              <div className=\"h-px bg-outline-variant mx-2 my-1\"></div>
              <button onClick={() => { onDelete(); setShowMenu(false); }} className=\"w-full px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors\">
                <Trash2 size={16} /> Xóa nhân sự
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=\"space-y-3 mb-6\">
        <div className=\"flex items-center gap-3 text-on-surface-variant\">
          <MapPin size={16} className=\"text-primary\" />
          <span className=\"text-sm font-medium\">{employee[\"Working Area\"]}</span>
        </div>
        <div className=\"flex items-center gap-3 text-on-surface-variant\">
          <Phone size={16} className=\"text-primary\" />
          <span className=\"text-sm font-medium font-mono\">{employee[\"Phone\"]}</span>
        </div>
        <div className=\"flex items-center gap-3 text-on-surface-variant\">
          <Calendar size={16} className=\"text-primary\" />
          <span className=\"text-sm font-medium\">Gia nhập: {employee[\"Join Date\"]}</span>
        </div>
      </div>

      <div className=\"bg-slate-50 rounded-2xl p-4\">
        <div className=\"flex justify-between items-center mb-2\">
          <span className=\"text-[10px] font-black text-on-surface-variant uppercase tracking-widest\">Doanh số tháng này</span>
          <span className=\"text-xs font-black text-primary\">75%</span>
        </div>
        <div className=\"w-full bg-white rounded-full h-2 mb-1\">
          <div className=\"bg-primary h-full rounded-full\" style={{ width: '75%' }}></div>
        </div>
        <div className=\"flex justify-between text-[11px] font-bold mt-2\">
          <span className=\"text-on-surface\">150.0M / 200.0M</span>
          <span className=\"text-on-surface-variant\">VNĐ</span>
        </div>
      </div>

      <button 
        onClick={onViewHistory}
        className=\"w-full mt-4 py-3 bg-white border-2 border-outline-variant rounded-2xl font-black text-xs text-on-surface-variant uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2\"
      >
        Xem lộ trình thực địa <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default EmployeeCard;
