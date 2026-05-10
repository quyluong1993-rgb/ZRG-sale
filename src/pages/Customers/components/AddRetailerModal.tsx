import React, { useState } from 'react';
import { ShoppingBag, MapPin, Phone, User, X, Plus, Loader2 } from 'lucide-react';
import { RetailerService } from '../../../services/api/retailer';

interface AddRetailerModalProps {
  distributorId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddRetailerModal: React.FC<AddRetailerModalProps> = ({ distributorId, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    retailerName: '',
    address: '',
    phone: '',
    ownerName: '',
    city: '',
    region: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await RetailerService.addRetailer({
        ...formData,
        distributorId,
        status: 'Active'
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add retailer:', error);
      alert('Có lỗi xảy ra khi thêm cửa hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight">Thêm Cửa Hàng Mới</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-on-surface-variant uppercase flex items-center gap-2">
                <ShoppingBag size={12} /> Tên Cửa Hàng / Đại lý
              </label>
              <input 
                required 
                placeholder="Ví dụ: Đại lý Hòa Bình"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                value={formData.retailerName}
                onChange={(e) => setFormData({ ...formData, retailerName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase flex items-center gap-2">
                  <User size={12} /> Chủ sở hữu
                </label>
                <input 
                  required 
                  placeholder="Họ tên chủ"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase flex items-center gap-2">
                  <Phone size={12} /> Số điện thoại
                </label>
                <input 
                  required 
                  placeholder="09..."
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-mono font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-on-surface-variant uppercase flex items-center gap-2">
                <MapPin size={12} /> Địa chỉ chi tiết
              </label>
              <input 
                required 
                placeholder="Số nhà, tên đường..."
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase flex items-center gap-2">
                  <MapPin size={12} /> Thành phố / Tỉnh
                </label>
                <input 
                  placeholder="Ví dụ: Nam Định"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase flex items-center gap-2">
                  <MapPin size={12} /> Khu vực / Huyện
                </label>
                <input 
                  placeholder="Ví dụ: Giao Thủy"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-on-surface-variant uppercase flex items-center gap-2">
                <User size={12} /> Ghi chú thêm
              </label>
              <textarea 
                placeholder="Thông tin bổ sung về cửa hàng..."
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold min-h-[80px] resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="pt-6 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-xl bg-slate-100 text-on-surface font-black hover:bg-slate-200 transition-colors uppercase tracking-wider text-sm"
              >
                Hủy bỏ
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 rounded-xl bg-primary text-white font-black hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 uppercase tracking-wider text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Plus size={20} />
                )}
                {isSubmitting ? 'Đang lưu...' : 'Thêm ngay'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRetailerModal;
