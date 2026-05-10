import React from 'react';
import { Users, Plus, Search, MapPin, Building2, Phone, Loader2, Edit2 } from 'lucide-react';
import AddDistributorModal from './components/AddDistributorModal';
import EditDistributorModal from './components/EditDistributorModal';
import DistributorDetailsModal from './components/DistributorDetailsModal';
import { DistributorService } from '../../services/api/distributor';

const Customers = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [distributors, setDistributors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDistributors = async () => {
    setIsLoading(true);
    try {
      const data = await DistributorService.getDistributors();
      setDistributors(data);
    } catch (error) {
      console.error('Failed to fetch distributors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  const filteredDistributors = distributors.filter(dist => 
    dist.distributorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dist.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-on-surface flex items-center gap-3">
            <Users className="text-primary" size={32} />
            HỆ THỐNG NHÀ PHÂN PHỐI
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">Quản lý mạng lưới phân phối toàn quốc</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus size={20} />
          THÊM NHÀ PHÂN PHỐI
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm NPP, khu vực..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Distributors Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-bold uppercase tracking-widest">Đang tải dữ liệu...</p>
        </div>
      ) : filteredDistributors.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <Building2 size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold">Không tìm thấy nhà phân phối nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistributors.map((dist, idx) => (
            <div key={dist.distributorId || idx} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <Building2 size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setSelectedDistributor(dist);
                      setShowEditModal(true);
                    }}
                    className="p-2 bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    dist.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {dist.status || 'Active'}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-on-surface mb-4 uppercase line-clamp-1">{dist.distributorName}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <MapPin size={18} className="text-slate-400 shrink-0" />
                  <span className="font-bold truncate">{dist.region || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Users size={18} className="text-slate-400 shrink-0" />
                  <span className="font-medium truncate">{dist.contactPerson || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Phone size={18} className="text-slate-400 shrink-0" />
                  <span className="font-medium font-mono text-primary">{dist.phone}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedDistributor(dist);
                    setShowDetailsModal(true);
                  }}
                  className="flex-1 py-3 rounded-xl bg-slate-50 text-on-surface font-bold text-sm hover:bg-slate-100 transition-colors"
                >
                  CHI TIẾT
                </button>
                <button className="flex-1 py-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm hover:bg-indigo-100 transition-colors uppercase">
                  XEM TUYẾN
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddDistributorModal 
          onClose={() => setShowAddModal(false)} 
          onSuccess={fetchDistributors}
        />
      )}

      {showEditModal && (
        <EditDistributorModal 
          distributor={selectedDistributor}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDistributor(null);
          }} 
          onSuccess={fetchDistributors}
        />
      )}

      {showDetailsModal && (
        <DistributorDetailsModal 
          distributor={selectedDistributor}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedDistributor(null);
          }} 
        />
      )}
    </div>
  );
};

export default Customers;
