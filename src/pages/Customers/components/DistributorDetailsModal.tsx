import React, { useState, useEffect, useCallback } from 'react';
import { X, Store, MapPin, Phone, User, ShoppingBag, Loader2, Plus } from 'lucide-react';
import { RetailerService, Retailer } from '../../../services/api/retailer';
import AddRetailerModal from './AddRetailerModal';
import AddOrderModal from '../../Orders/components/AddOrderModal';
import { useOrderLogic } from '../../Orders/components/useOrderLogic';

interface DistributorDetailsModalProps {
  distributor: any;
  onClose: () => void;
}

const DistributorDetailsModal: React.FC<DistributorDetailsModalProps> = ({ distributor, onClose }) => {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddRetailer, setShowAddRetailer] = useState(false);
  const orderLogic = useOrderLogic();

  const fetchRetailers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await RetailerService.getRetailersByDistributor(distributor.distributorId);
      setRetailers(data || []);
    } catch (error) {
      console.error('Failed to fetch retailers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [distributor.distributorId]);

  const handleAddOrder = (retailer: any) => {
    orderLogic.setNewOrder({
      ...orderLogic.newOrder,
      "Distributor": distributor.distributorId,
      "Customer Name": retailer.retailerName
    });
    orderLogic.setShowAddModal(true);
  };

  useEffect(() => {
    if (distributor?.distributorId) {
      fetchRetailers();
    }
  }, [distributor, fetchRetailers]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-in zoom-in duration-300">
        {/* Header Section */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-primary/30">
                <Store size={32} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-black text-on-surface uppercase tracking-tight">
                    {distributor.distributorName}
                  </h2>
                  <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-black rounded-full uppercase">
                    {distributor.status || 'Active'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant font-bold text-sm uppercase tracking-wide">
                  <span className="flex items-center gap-1.5"><MapPin size={14}/> {distributor.region}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1.5"><User size={14}/> {distributor.contactPerson}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1.5 text-primary"><Phone size={14}/> {distributor.phone}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all text-slate-400 hover:text-on-surface border border-transparent hover:border-slate-100">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-on-surface uppercase tracking-tight flex items-center gap-3">
              DANH SÁCH CỬA HÀNG ({retailers.length})
            </h3>
            <button 
              onClick={() => setShowAddRetailer(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-on-surface text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <Plus size={18} /> THÊM CỬA HÀNG
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="font-bold uppercase tracking-widest text-sm">Đang tải danh sách cửa hàng...</p>
            </div>
          ) : retailers.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
              <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold uppercase text-sm tracking-wide">Chưa có cửa hàng nào nhập hàng</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Cửa hàng</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Chủ sở hữu</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Địa chỉ</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Số điện thoại</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Đơn hàng</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {retailers.map((retailer) => (
                    <tr key={retailer.retailerId} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <ShoppingBag size={16} />
                          </div>
                          <div>
                            <div className="font-black text-on-surface uppercase text-sm">{retailer.retailerName}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">ID: {retailer.retailerId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-on-surface-variant font-bold text-sm">
                          <User size={14} className="text-slate-300" />
                          {retailer.ownerName || '---'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface-variant max-w-[200px] truncate">
                        {retailer.address}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-mono font-black text-primary text-sm">
                          <Phone size={14} className="text-primary/40" />
                          {retailer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-on-surface text-[11px] font-black rounded-lg uppercase">
                          {retailer.totalOrders || 0} Đơn
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-[11px] font-black uppercase transition-all active:scale-95 shadow-sm hover:shadow-md"
                          onClick={() => handleAddOrder(retailer)}
                        >
                          <Plus size={14} /> Thêm đơn
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-4">
          <button onClick={onClose} className="px-8 py-3 bg-white border border-slate-200 text-on-surface rounded-xl font-bold hover:bg-slate-50 transition-all uppercase text-sm tracking-widest shadow-sm">
            Đóng lại
          </button>
        </div>

        {showAddRetailer && (
          <AddRetailerModal 
            distributorId={distributor.distributorId}
            onClose={() => setShowAddRetailer(false)}
            onSuccess={fetchRetailers}
          />
        )}
      </div>

      {orderLogic.showAddModal && (
        <AddOrderModal 
          {...orderLogic} 
          onClose={() => orderLogic.setShowAddModal(false)} 
          onSubmit={orderLogic.handleCreateOrder} 
        />
      )}
    </div>
  );
};

export default DistributorDetailsModal;
