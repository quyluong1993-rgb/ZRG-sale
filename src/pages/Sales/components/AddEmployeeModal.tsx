import React, { useState } from 'react';
import { X, Camera, ShieldCheck, User, MapPin, Briefcase, Calendar, Phone, Mail, FileText, Plus, CheckCircle2 } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { DashboardService } from '../../../services/api';

const AddEmployeeModal = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    id: `ZRG${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    name: '',
    pos: 'Field Sales',
    area: '',
    phone: '',
    email: '',
    cccd: '',
    target: '200000000',
    joinDate: new Date().toISOString().split('T')[0],
    bank: '',
    bankAccount: '',
    address: '',
    status: 'Đang làm việc'
  });

  const handleOCR = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanProgress(0);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const { data: { text, lines } } = await Tesseract.recognize(reader.result as string, 'vie+eng', {
          logger: m => {
            if (m.status === 'recognizing text') setScanProgress(Math.floor(m.progress * 100));
          }
        });

        const cccdMatch = text.match(/\d{12}/);
        if (cccdMatch) setFormData(prev => ({ ...prev, cccd: cccdMatch[0] }));

        const nameLine = lines.find(l => 
          (l.text.includes('Họ và tên') || l.text.includes('Name')) && l.text.length > 5
        );
        if (nameLine) {
          const name = nameLine.text.split(/[:|-]/).pop()?.trim();
          if (name) setFormData(prev => ({ ...prev, name }));
        }

        const birthdayMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);
        if (birthdayMatch) setFormData(prev => ({ ...prev, address: text.split('\n').pop() || '' }));

      } catch (err) {
        console.error(\"OCR Error:\", err);
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

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
      await DashboardService.addEmployee(payload);
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
        
        {/* Left Side - OCR & Status */}
        <div className=\"md:w-1/3 bg-slate-50 border-r border-outline-variant p-8 flex flex-col justify-between\">
          <div>
            <div className=\"w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20\">
              <Plus size={32} />
            </div>
            <h2 className=\"text-2xl font-black text-on-surface mb-2 uppercase tracking-tight\">Thêm Nhân Sự</h2>
            <p className=\"text-sm text-on-surface-variant leading-relaxed\">Sử dụng tính năng quét AI để tự động điền thông tin từ CCCD của nhân sự mới.</p>
            
            <div className=\"mt-8 space-y-4\">
              <label className=\"block cursor-pointer group\">
                <div className=\"border-2 border-dashed border-outline-variant rounded-2xl p-6 text-center group-hover:border-primary group-hover:bg-primary/5 transition-all\">
                  {isScanning ? (
                    <div className=\"flex flex-col items-center gap-3\">
                      <div className=\"w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin\"></div>
                      <span className=\"font-black text-xs text-primary\">ĐANG QUÉT {scanProgress}%</span>
                    </div>
                  ) : (
                    <div className=\"flex flex-col items-center gap-2\">
                      <Camera size={32} className=\"text-on-surface-variant group-hover:text-primary transition-colors\" />
                      <span className=\"font-bold text-sm text-on-surface\">Quét AI CCCD</span>
                      <span className=\"text-[10px] text-on-surface-variant uppercase font-bold\">Hỗ trợ: JPG, PNG</span>
                    </div>
                  )}
                </div>
                <input type=\"file\" className=\"hidden\" accept=\"image/*\" onChange={handleOCR} disabled={isScanning} />
              </label>
            </div>
          </div>

          <div className=\"space-y-3\">
            <div className=\"flex items-center gap-3 p-3 bg-white rounded-xl border border-outline-variant\">
              <ShieldCheck size={18} className=\"text-emerald-500\" />
              <span className=\"text-[11px] font-bold text-on-surface-variant uppercase\">Bảo mật dữ liệu chuẩn ZRG</span>
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
                <h3 className=\"text-3xl font-black text-on-surface mb-2\">THÀNH CÔNG!</h3>
                <p className=\"text-on-surface-variant\">Hồ sơ nhân sự đã được lưu vào Google Sheets.</p>
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
                  <FormField label=\"Email\" icon={<Mail size={16}/>} value={formData.email} onChange={(v) => setFormData({...formData, email: v})} type=\"email\" />
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
                    {isSubmitting ? <div className=\"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin\"></div> : \"Lưu hồ sơ nhân sự\"}
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

export default AddEmployeeModal;
