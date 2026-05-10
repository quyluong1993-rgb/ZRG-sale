import Tesseract from 'tesseract.js';

export const usePhotoOCR = (
  setPhoto: (photo: string | null) => void,
  setIsScanning: (scanning: boolean) => void,
  setScanProgress: (progress: number) => void,
  setCheckinData: (fn: (prev: any) => any) => void
) => {
  const handlePhotoCaptured = async (base64: string) => {
    setPhoto(base64);
    setIsScanning(true);
    setScanProgress(0);
    
    try {
      const { data: { lines } } = await Tesseract.recognize(base64, 'vie+eng', {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            setScanProgress(Math.floor(m.progress * 100));
          }
        }
      }) as any;

      const shopKeywords = ["shop", "cửa hàng", "đại lý", "tạp hóa", "mẹ & bé", "mẹ và bé", "bebe", "mart", "store", "baby", "bỉm", "sữa", "thế giới", "kids"];
      const filteredLines = (lines as any[]).map((l: any) => l.text.trim()).filter((t: string) => t.length > 2 && t.length < 60);

      let foundShopName = filteredLines.find((l: string) => shopKeywords.some(kw => l.toLowerCase().includes(kw.toLowerCase()))) || 
                        filteredLines.find((l: string) => /^[A-ZÀ-ỹ\s0-9&]+$/.test(l) && l.length > 5) || 
                        filteredLines[0] || "";

      if (foundShopName) {
        foundShopName = foundShopName.replace(/^[^a-zA-Z0-9À-ỹ]+|[^a-zA-Z0-9À-ỹ]+$/g, '').trim();
        if (foundShopName !== foundShopName.toUpperCase()) {
          foundShopName = foundShopName.toLowerCase().replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
        }
        setCheckinData(prev => ({ ...prev, shopName: foundShopName }));
      }
    } catch (err) {
      console.error("Lỗi quét OCR:", err);
    } finally {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  return { handlePhotoCaptured };
};
