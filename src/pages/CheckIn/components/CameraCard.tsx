import React from 'react';
import { Camera, Image as ImageIcon, ScanText, X } from 'lucide-react';

interface Props {
  photo: string | null;
  setPhoto: (p: string | null) => void;
  ocrResult: string | null;
}

const CameraCard = ({ photo, setPhoto, ocrResult }: Props) => (
  <div className=\"bg-white border-2 border-outline-variant rounded-[24px] p-6 shadow-sm\">
    <div className=\"flex items-center gap-3 mb-4\">
      <div className=\"w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center\">
        <Camera size={22} />
      </div>
      <h3 className=\"font-bold text-on-surface\">Chụp ảnh cửa hàng</h3>
    </div>

    {photo ? (
      <div className=\"relative rounded-2xl overflow-hidden border-2 border-outline-variant group\">
        <img src={photo} alt=\"Check-in\" className=\"w-full aspect-video object-cover\" />
        <button 
          onClick={() => setPhoto(null)}
          className=\"absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors\"
        >
          <X size={18} />
        </button>
        {ocrResult && (
          <div className=\"absolute bottom-0 inset-x-0 bg-primary/90 text-white p-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2\">
            <ScanText size={12} /> OCR: {ocrResult}
          </div>
        )}
      </div>
    ) : (
      <div className=\"aspect-video bg-slate-50 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center gap-3 text-on-surface-variant hover:bg-slate-100 transition-colors cursor-pointer\">
        <ImageIcon size={32} className=\"opacity-30\" />
        <p className=\"text-xs font-bold uppercase tracking-wider\">Nhấn để chụp ảnh hoặc tải lên</p>
        <input 
          type=\"file\" 
          accept=\"image/*\" 
          capture=\"environment\"
          className=\"absolute inset-0 opacity-0 cursor-pointer\"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (re) => setPhoto(re.target?.result as string);
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
    )}
  </div>
);

export default CameraCard;
