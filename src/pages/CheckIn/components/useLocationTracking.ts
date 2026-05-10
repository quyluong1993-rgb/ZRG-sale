import { useEffect } from 'react';
import { DashboardService } from '../../../services/api';

export const useLocationTracking = (
  employeeId: string,
  setLocation: (loc: { lat: number; lng: number } | null) => void,
  setAddress: (addr: string) => void,
  setLocationError: (err: string | null) => void,
  onTrackingError?: (err: string) => void
) => {
  const refreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`)
            .then(res => res.json())
            .then(data => setAddress(data.display_name))
            .catch(err => console.error("Lỗi lấy địa chỉ:", err));
        },
        (error) => {
          console.error("Lỗi GPS:", error);
          setLocation(null);
          setAddress('');
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError("Vui lòng cấp quyền truy cập vị trí để sử dụng tính năng Check-in.");
          } else {
            setLocationError("Không thể xác định vị trí. Vui lòng kiểm tra cài đặt GPS.");
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError("Trình duyệt của bạn không hỗ trợ định vị GPS.");
    }
  };

  useEffect(() => {
    let intervalId: any;
    const sendLocation = async () => {
      if (employeeId && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await DashboardService.updateLocation(employeeId, position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Location tracking error:", error);
            if (onTrackingError) {
              onTrackingError("Mất kết nối GPS nền. Vui lòng kiểm tra lại thiết bị.");
            }
          },
          { enableHighAccuracy: true }
        );
      }
    };

    if (employeeId) {
      sendLocation();
      intervalId = setInterval(sendLocation, 5 * 60 * 1000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [employeeId]);

  return { refreshLocation };
};
