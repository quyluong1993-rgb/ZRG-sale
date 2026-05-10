import { useState } from 'react';
import { DashboardService } from '../../../services/api';

export const useCheckinState = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addOrder = (order: any) => setOrders([...orders, order]);

  const submit = async (coords: {lat: number, lng: number} | null) => {
    if (!coords) {
      alert('Chưa có tọa độ GPS! Vui lòng cho phép truy cập vị trí.');
      return;
    }
    setIsSubmitting(true);
    try {
      const data = {
        timestamp: new Date().toISOString(),
        coords,
        photo: photo ? 'PHOTO_ATTACHED' : 'NO_PHOTO',
        ordersCount: orders.length
      };
      await DashboardService.submitCheckin(data);
      alert('Check-in thành công!');
      setPhoto(null);
      setOrders([]);
    } catch (e) {
      alert('Lỗi gửi dữ liệu Check-in!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { photo, setPhoto, ocrResult, orders, addOrder, isSubmitting, submit };
};
