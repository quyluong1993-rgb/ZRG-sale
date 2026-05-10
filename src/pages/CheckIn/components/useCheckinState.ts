import { useState } from 'react';

export const useCheckinState = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  
  const [checkinData, setCheckinData] = useState({
    employeeId: '',
    employeeName: '',
    shopName: '',
  });

  return {
    employees, setEmployees,
    loading, setLoading,
    isSubmitting, setIsSubmitting,
    isSuccess, setIsSuccess,
    isCheckedIn, setIsCheckedIn,
    location, setLocation,
    address, setAddress,
    photo, setPhoto,
    scanProgress, setScanProgress,
    isScanning, setIsScanning,
    locationError, setLocationError,
    trackingError, setTrackingError,
    checkinData, setCheckinData
  };
};
