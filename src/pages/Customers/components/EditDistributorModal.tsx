import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, User, X, Save, Loader2 } from 'lucide-react';
import { DistributorService } from '../../../services/api/distributor';

interface EditDistributorModalProps {
  distributor: any;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditDistributorModal: React.FC<EditDistributorModalProps> = ({ distributor, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    contact: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (distributor) {
      setFormData({
        name: distributor.distributorName || '',
        area: distributor.region || '',
        contact: distributor.contactPerson || '',
        phone: distributor.phone || '',
        address: distributor.address || ''
      });
    }
  }, [distributor]);

  const formatPhone = (val: string) => {
    if (!val) return "";
    let p = val.toString().trim();
    if (p && !p.startsWith('0') && /^\d+$/.test(p)) {
      p = '0' + p;
    }
    return p;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await DistributorService.updateDistributor({
        distributorId: distributor.distributorId,
        distributorName: formData.name,
        region: formData.area,
        contactPerson: formData.contact,
        phone: formData.phone,
        address: formData.address,
        status: distributor.status || 'Active'
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to update distributor:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight">Sửa Nhà Phân Phối</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-on-surface-variant uppercase flex items-center gap-2">
                <Building2 size={14} /> Tên Nhà Phân Phối
              </label>
              <input 
                required 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-on-surface"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-black text-on-surface-variant uppercase flex items-center gap-2">
                  <MapPin size={14} /> Khu vực
                </label>
                <input 
                  required 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-on-surface-variant uppercase flex items-center gap-2">
                  <Phone size={14} /> Số điện thoại
                </label>
                <input 
                  required 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-mono font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-on-surface-variant uppercase flex items-center gap-2">
                <User size={14} /> Người liên hệ
              </label>
              <input 
                required 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-on-surface-variant uppercase flex items-center gap-2">
                <MapPin size={14} /> Địa chỉ chi tiết
              </label>
              <textarea 
                rows={2}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="pt-6 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl bg-slate-100 text-on-surface font-black hover:bg-slate-200 transition-colors uppercase tracking-wider"
              >
                Hủy bỏ
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 rounded-2xl bg-primary text-white font-black hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                {isSubmitting ? 'Đang lưu...' : 'Cập nhật'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDistributorModal;
