import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Clock, Camera, Navigation } from 'lucide-react';

// Fix for default marker icons in Vite/React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface PersonnelLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lastUpdate: string;
  shopName?: string;
}

const SetViewOnClick = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords]);
  return null;
};

const PersonnelMap = ({ locations }: { locations: PersonnelLocation[] }) => {
  const [selectedStaff, setSelectedStaff] = useState<PersonnelLocation | null>(null);
  const defaultCenter: [number, number] = [21.0285, 105.8542]; // Hanoi
  
  // Use first location or Hanoi center
  const center = locations.length > 0 ? [locations[0].lat, locations[0].lng] as [number, number] : defaultCenter;

  return (
    <div className="lg:col-span-2 rugged-card overflow-hidden h-[450px] relative">
      <div className="absolute top-4 left-4 z-[1000] bg-surface/90 backdrop-blur-sm p-3 rounded-lg border border-outline-variant shadow-lg pointer-events-none">
        <h3 className="font-label-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">distance</span>
          Bản đồ Thực địa (Real-time)
        </h3>
        <p className="text-[10px] text-on-surface-variant">Đang giám sát {locations.length} nhân sự</p>
      </div>

      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc) => (
            <Marker 
              key={loc.id} 
              position={[loc.lat, loc.lng]}
              eventHandlers={{
                click: () => setSelectedStaff(loc)
              }}
            >
              <Tooltip permanent direction="top" offset={[0, -40]} className="rugged-tooltip">
                <span className="font-label-bold text-xs">{loc.name}</span>
              </Tooltip>
            </Marker>
          ))}
          {locations.length > 0 && <SetViewOnClick coords={center} />}
        </>
      </MapContainer>

      <AnimatePresence>
        {selectedStaff && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-80 z-[2000] bg-white shadow-2xl border-l border-outline-variant flex flex-col"
          >
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={18} />
                </div>
                <h3 className="font-bold text-on-surface">Chi tiết Nhân sự</h3>
              </div>
              <button 
                onClick={() => setSelectedStaff(null)}
                className="p-1 hover:bg-surface-variant rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Họ tên nhân viên</div>
                  <div className="text-lg font-bold text-on-surface">{selectedStaff.name}</div>
                  <div className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Đang trực tuyến
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Cập nhật cuối</div>
                    <div className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <Clock size={12} className="text-primary" />
                      {selectedStaff.lastUpdate}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Cửa hàng hiện tại</div>
                    <div className="text-xs font-bold text-on-surface flex items-center gap-1 truncate">
                      <MapPin size={12} className="text-primary" />
                      {selectedStaff.shopName || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-3 flex justify-between items-center">
                  Lộ trình hôm nay
                  <span className="text-primary hover:underline cursor-pointer">Xem tất cả</span>
                </div>
                <div className="space-y-3 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  <div className="flex gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                      <Navigation size={12} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Vị trí hiện tại</div>
                      <div className="text-[10px] text-on-surface-variant">{selectedStaff.shopName || 'Đang di chuyển'}</div>
                    </div>
                  </div>
                  <div className="flex gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                      <MapPin size={12} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Cửa hàng ZRG #12</div>
                      <div className="text-[10px] text-on-surface-variant">09:15 - Check-in thành công</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-3">Ảnh check-in mới nhất</div>
                <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-outline-variant group relative cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <Camera size={24} className="text-white drop-shadow-md" />
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300"></div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-outline-variant bg-slate-50">
              <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Navigation size={18} />
                Chỉ đường tới vị trí
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonnelMap;
