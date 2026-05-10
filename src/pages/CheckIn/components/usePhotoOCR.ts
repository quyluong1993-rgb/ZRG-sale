import Tesseract from 'tesseract.js';

export const usePhotoOCR = (
  setPhoto: (val: string | null) => void,
  setIsScanning: (val: boolean) => void,
  setScanProgress: (val: number) => void,
  setCheckinData: (val: any) => void
) => {
  const handlePhotoCaptured = async (photoData: string) => {
    setPhoto(photoData);
    setIsScanning(true);
    setScanProgress(0);

    try {
      const { data: { text } } = await Tesseract.recognize(photoData, 'vie', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setScanProgress(Math.round(m.progress * 100));
          }
        }
      });

      console.log("OCR Text:", text);
      // Logic trích xuất tên cửa hàng từ text (ví dụ đơn giản)
      const lines = text.split('\n');
      const shopLine = lines.find(l => l.toUpperCase().includes('CỬA HÀNG') || l.toUpperCase().includes('ĐẠI LÝ'));
      if (shopLine) {
        const extractedName = shopLine.replace(/CỬA HÀNG|ĐẠI LÝ|:| - /gi, '').trim();
        if (extractedName) {
          setCheckinData((prev: any) => ({ ...prev, shopName: extractedName }));
        }
      }
    } catch (error) {
      console.error("OCR error:", error);
    } finally {
      setIsScanning(false);
      setScanProgress(100);
    }
  };

  return { handlePhotoCaptured };
};
