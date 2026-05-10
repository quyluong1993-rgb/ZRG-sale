import React from 'react';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';

interface Props {
  coords: { lat: number; lng: number } | null;
  error: string | null;
  isLoading: boolean;
}

const LocationCard = ({ coords, error, isLoading }: Props) => (
  <div className=\"bg-white border-2 border-outline-variant rounded-[24px] p-6 shadow-sm\">
    <div className=\"flex items-center justify-between mb-4\">
      <div className=\"flex items-center gap-3\">
        <div className=\"w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center\">
          <MapPin size={22} />
        </div>
        <h3 className=\"font-bold text-on-surface\">Vị trí hiện tại</h3>
      </div>
      {isLoading && <RefreshCw size={18} className=\"text-primary animate-spin\" />}
    </div>

    {error ? (
      <div className=\"bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3 text-rose-700\">
        <Navigation size={18} />
        <p className=\"text-xs font-bold uppercase\">{error}</p>
      </div>
    ) : coords ? (
      <div className=\"space-y-3\">
        <div className=\"flex justify-between p-3 bg-slate-50 rounded-xl border border-outline-variant\">
          <span className=\"text-[10px] font-black uppercase text-on-surface-variant\">Vĩ độ (Lat)</span>
          <span className=\"text-sm font-black text-primary\">{coords.lat.toFixed(6)}</span>
        </div>
        <div className=\"flex justify-between p-3 bg-slate-50 rounded-xl border border-outline-variant\">
          <span className=\"text-[10px] font-black uppercase text-on-surface-variant\">Kinh độ (Lng)</span>
          <span className=\"text-sm font-black text-primary\">{coords.lng.toFixed(6)}</span>
        </div>
      </div>
    ) : (
      <p className=\"text-center py-4 text-on-surface-variant text-sm font-medium italic\">Đang lấy tọa độ GPS...</p>
    )}
  </div>
);

export default LocationCard;
