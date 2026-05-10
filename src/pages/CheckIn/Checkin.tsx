import React from 'react';
import { useCheckinState } from './components/useCheckinState';
import { useLocationTracking } from './components/useLocationTracking';
import LocationCard from './components/LocationCard';
import CameraCard from './components/CameraCard';
import CheckinHeader from './components/CheckinHeader';
import OrderSheet from './components/OrderSheet';
import SubmitSection from './components/SubmitSection';

const Checkin = () => {
  const state = useCheckinState();
  const location = useLocationTracking();

  return (
    <div className=\"bg-[#F5F7F9] min-h-screen pb-24 md:pb-10\">
      <CheckinHeader />
      
      <div className=\"max-w-2xl mx-auto px-4 space-y-6\">
        <LocationCard 
          coords={location.coords} 
          error={location.error} 
          isLoading={location.isLoading} 
        />

        <CameraCard 
          photo={state.photo} 
          setPhoto={state.setPhoto} 
          ocrResult={state.ocrResult}
        />

        <OrderSheet 
          orders={state.orders} 
          onAddOrder={state.addOrder} 
        />

        <SubmitSection 
          isSubmitting={state.isSubmitting}
          onCheckin={() => state.submit(location.coords)}
        />
      </div>
    </div>
  );
};

export default Checkin;
