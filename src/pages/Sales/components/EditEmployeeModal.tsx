import React, { useState } from 'react';
import { X, ShieldCheck, User, MapPin, Briefcase, Calendar, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { DashboardService } from '../../../services/api';

const EditEmployeeModal = ({ employee, onClose, onSuccess }: { employee: any, onClose: () => void, onSuccess: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    id: employee[\"Employee ID\"],
    name: employee[\"Full Name\"],
    pos: employee[\"Position\"] || 'Field Sales',
    area: employee[\"Working Area\"],
    phone: employee[\"Phone\"]?.replace(/'/g, '') || '',
    email: employee[\"Email\"] || '',
    cccd: employee[\"ID Number\"]?.replace(/'/g, '') || '',
    target: employee[\"Monthly Target\"] || '200000000',
    joinDate: employee[\"Join Date\"] || new Date().toISOString().split('T')[0],
    bank: employee[\"Bank Name\"] || '',
    bankAccount: employee[\"Bank Account\"]?.replace(/'/g, '') || '',
    address: employee[\"Address\"] || '',
    status: employee[\"Status\"] || 'Đang làm việc'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        \"Employee ID\": formData.id,
        \"Full Name\": formData.name,
        \"Position\": formData.pos,
        \"Working Area\": formData.area,
        \"Phone\": `'${formData.phone}`,
        \"Email\": formData.email,
        \"ID Number\": `'${formData.cccd}`,
        \"Monthly Target\": formData.target,
        \"Join Date\": formData.joinDate,
        \"Bank Name\": formData.bank,
        \"Bank Account\": `'${formData.bankAccount}`,
        \"Address\": formData.address,
        \"Status\": formData.status
      };
      await DashboardService.addEmployee(payload); // GAS handles update if ID exists
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      alert(\"Lỗi hệ thống!\");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=\"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200\">
      <div className=\"bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant flex flex-col md:flex-row animate-in zoom-in-95 duration-300\">
        
        {/* Left Side */}
        <div className=\"md:w-1/3 bg-slate-50 border-r border-outline-variant p-8 flex flex-col justify-between\">
          <div>
            <div className=\"w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20 font-black text-2xl\">
              {formData.name.substring(0, 1)}
            </div>
            <h2 className=\"text-2xl font-black text-on-surface mb-2 uppercase tracking-tight\">Sửa Hồ Sơ</h2>
            <p className=\"text-sm text-on-surface-variant leading-relaxed\">Cập nhật thông tin nhân sự: {formData.name}</p>
          </div>

          <div className=\"space-y-3\">
            <div className=\"p-3 bg-white rounded-xl border border-outline-variant\">
              <div className=\"text-[10px] font-black text-slate-400 uppercase mb-1\">Mã nhân viên</div>
              <div className=\"text-lg font-black text-primary\">{formData.id}</div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className=\"flex-1 flex flex-col overflow-hidden\">
          <div className=\"p-4 border-b border-outline-variant flex justify-end\">
            <button onClick={onClose} className=\"p-2 hover:bg-slate-50 rounded-full transition-colors text-on-surface-variant\"><X size={24} /></button>
          </div>

          <div className=\"flex-1 overflow-y-auto p-8\">
            {isSuccess ? (
              <div className=\"h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500\">
                <div className=\"w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-100\">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className=\"text-3xl font-black text-on-surface mb-2\">ĐÃ CẬP NHẬT!</h3>
                <p className=\"text-on-surface-variant\">Thông tin đã được đồng bộ với hệ thống.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className=\"space-y-8\">
                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
                  <FormField label=\"Mã Nhân Viên\" icon={<Briefcase size={16}/>} value={formData.id} onChange={(v) => setFormData({...formData, id: v})} readOnly />
                  <FormField label=\"Họ Tên\" icon={<User size={16}/>} value={formData.name} onChange={(v) => setFormData({...formData, name: v})} required />
                  <FormField label=\"Chức Vụ\" icon={<ShieldCheck size={16}/>} value={formData.pos} onChange={(v) => setFormData({...formData, pos: v})} />
                  <FormField label=\"Số Điện Thoại\" icon={<Phone size={16}/>} value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} required />
                  <FormField label=\"Khu Vực\" icon={<MapPin size={16}/>} value={formData.area} onChange={(v) => setFormData({...formData, area: v})} required />
                  <FormField label=\"Số CCCD\" icon={<FileText size={16}/>} value={formData.cccd} onChange={(v) => setFormData({...formData, cccd: v})} required />
                  <FormField label=\"Trạng Thái\" icon={<ShieldCheck size={16}/>} value={formData.status} onChange={(v) => setFormData({...formData, status: v})} />
                  <FormField label=\"Ngày Gia Nhập\" icon={<Calendar size={16}/>} value={formData.joinDate} onChange={(v) => setFormData({...formData, joinDate: v})} type=\"date\" />
                </div>

                <div className=\"bg-slate-50 p-6 rounded-2xl space-y-4\">
                  <h4 className=\"text-xs font-black text-on-surface-variant uppercase tracking-widest\">Thông tin tài chính & Địa chỉ</h4>
                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                    <FormField label=\"Ngân Hàng\" value={formData.bank} onChange={(v) => setFormData({...formData, bank: v})} />
                    <FormField label=\"Số Tài Khoản\" value={formData.bankAccount} onChange={(v) => setFormData({...formData, bankAccount: v})} />
                    <div className=\"md:col-span-2\">
                      <FormField label=\"Địa Chỉ Thường Trú\" value={formData.address} onChange={(v) => setFormData({...formData, address: v})} />
                    </div>
                  </div>
                </div>

                <div className=\"flex gap-4 pt-4 sticky bottom-0 bg-white\">
                  <button type=\"button\" onClick={onClose} className=\"flex-1 py-4 bg-slate-100 text-on-surface font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-slate-200 transition-colors\">Hủy bỏ</button>
                  <button type=\"submit\" disabled={isSubmitting} className=\"flex-[2] py-4 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2\">
                    {isSubmitting ? <div className=\"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin\"></div> : \"Cập nhật hồ sơ\"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, icon, value, onChange, type = \"text\", required = false, readOnly = false }: any) => (
  <div className=\"space-y-2\">
    <label className=\"text-[11px] font-black text-on-surface-variant uppercase tracking-wider flex items-center gap-2\">
      {icon} {label} {required && <span className=\"text-rose-500\">*</span>}
    </label>
    <input 
      type={type} required={required} readOnly={readOnly}
      className={`w-full px-4 py-3 bg-slate-50 border border-outline-variant rounded-xl font-bold text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all ${readOnly ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`}
      value={value} onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default EditEmployeeModal;
