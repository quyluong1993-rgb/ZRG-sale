import { DashboardService } from '../../../services/api';

export const useCheckinSubmit = (
  checkinData: any,
  photo: string | null,
  location: { lat: number; lng: number } | null,
  address: string,
  isCheckedIn: boolean,
  setIsSubmitting: (val: boolean) => void,
  setIsCheckedIn: (val: boolean) => void,
  setPhoto: (val: string | null) => void,
  setIsSuccess: (val: boolean) => void,
  setCheckinData: (val: any) => void
) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkinData.employeeId || !checkinData.shopName || !photo || !location) {
      alert("Vui lòng nhập đầy đủ thông tin, chụp ảnh và đợi lấy vị trí!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await DashboardService.submitCheckin({
        ...checkinData,
        photo,
        lat: location.lat,
        lng: location.lng,
        address,
        timestamp: new Date().toISOString()
      });

      if (result.success) {
        setIsCheckedIn(true);
        setIsSuccess(true);
        setPhoto(null);
        setCheckinData({ ...checkinData, shopName: '' });
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Lỗi khi check-in:", error);
      alert("Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit };
};
