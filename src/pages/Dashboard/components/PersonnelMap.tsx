import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, User, MapPin, Clock, Camera, Navigation } from 'lucide-react';

// Fix for default marker icons in Vite/React
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Tăng cường tính năng cho Map
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

interface PersonnelMapProps {
  locations: any[];
}

const PersonnelMap: React.FC<PersonnelMapProps> = ({ locations = [] }) => {
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const defaultCenter: [number, number] = [10.762622, 106.660172]; // HCM City

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest border-2 border-outline-variant rounded-2xl overflow-hidden shadow-sm flex flex-col h-[500px]">
      <div className="p-4 border-b-2 border-outline-variant flex justify-between items-center bg-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
          <span className="font-headline-sm text-sm uppercase tracking-widest font-black text-on-surface-variant">VỊ TRÍ NHÂN SỰ THỰC ĐỊA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-black uppercase tracking-tighter">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            {locations.length} ONLINE
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <MapContainer 
          center={defaultCenter} 
          zoom={13} 
          className="h-full w-full"
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          
          {locations.map((staff) => (
            <Marker 
              key={staff.id} 
              position={[staff.lat, staff.lng]}
              eventHandlers={{
                click: () => setSelectedStaff(staff),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[150px]">
                  <div className="font-black text-primary text-xs uppercase mb-1">{staff.name}</div>
                  <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                    <MapPin size={10} /> {staff.lastCheckinShop}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {selectedStaff && <MapController center={[selectedStaff.lat, selectedStaff.lng]} />}
        </MapContainer>

        {/* Overlay Panel khi chọn nhân sự */}
        {selectedStaff && (
          <div className="absolute top-4 left-4 z-[1000] w-64 bg-white/95 backdrop-blur-md border-2 border-primary/20 rounded-2xl shadow-xl animate-in slide-in-from-left duration-300">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <button 
                  onClick={() => setSelectedStaff(null)}
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <h3 className="font-black text-on-surface uppercase leading-tight mb-1">{selectedStaff.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Mã NV: {selectedStaff.id}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400"><MapPin size={14} /></div>
                  <div className="font-medium text-on-surface-variant truncate">{selectedStaff.lastCheckinShop}</div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400"><Clock size={14} /></div>
                  <div className="font-medium text-on-surface-variant">Check-in: {selectedStaff.lastTime}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <button className="flex-1 py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-1.5">
                  <Camera size={12} /> XEM ẢNH
                </button>
                <button className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5">
                  <Navigation size={12} /> CHỈ ĐƯỜNG
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonnelMap;
