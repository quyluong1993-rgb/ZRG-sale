import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardService } from '../../../services/api';
import { useCheckinState } from './useCheckinState';
import { useLocationTracking } from './useLocationTracking';
import { usePhotoOCR } from './usePhotoOCR';
import { useCheckinSubmit } from './useCheckinSubmit';

export const useCheckinLogic = () => {
  const state = useCheckinState();
  const navigate = useNavigate();

  const { refreshLocation } = useLocationTracking(
    state.checkinData.employeeId,
    state.setLocation,
    state.setAddress,
    state.setLocationError,
    (err) => {
      state.setTrackingError(err);
      setTimeout(() => state.setTrackingError(null), 5000);
    }
  );

  const { handlePhotoCaptured } = usePhotoOCR(
    state.setPhoto,
    state.setIsScanning,
    state.setScanProgress,
    state.setCheckinData
  );

  const { handleSubmit } = useCheckinSubmit(
    state.checkinData,
    state.photo,
    state.location,
    state.address,
    state.isCheckedIn,
    state.setIsSubmitting,
    state.setIsCheckedIn,
    state.setPhoto,
    state.setIsSuccess,
    state.setCheckinData
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await DashboardService.getEmployees();
        state.setEmployees(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhân sự:", error);
      } finally {
        state.setLoading(false);
      }
    };
    fetchEmployees();
    refreshLocation();
    const locInterval = setInterval(refreshLocation, 30000);
    return () => clearInterval(locInterval);
  }, []);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const emp = state.employees.find(emp => emp["Employee ID"] === e.target.value);
    state.setCheckinData({
      ...state.checkinData,
      employeeId: e.target.value,
      employeeName: emp ? emp["Full Name"] : ''
    });
  };

  return { ...state, navigate, handlePhotoCaptured, handleEmployeeChange, handleSubmit };
};
