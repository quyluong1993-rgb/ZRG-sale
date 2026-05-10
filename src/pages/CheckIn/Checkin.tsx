import React from 'react';
import { useCheckinLogic } from './components/useCheckinLogic';
import CheckinHeader from './components/CheckinHeader';
import EmployeeSelector from './components/EmployeeSelector';
import ShopInput from './components/ShopInput';
import PhotoCapture from './components/PhotoCapture';
import LocationInfo from './components/LocationInfo';
import ActionButtons from './components/ActionButtons';
import StatusSidebar from './components/StatusSidebar';
import CheckinFormContainer from './components/CheckinFormContainer';
import { motion, AnimatePresence } from 'framer-motion';

const Checkin = () => {
  const {
    employees, isSubmitting, isSuccess, isCheckedIn, location, address, photo, scanProgress, isScanning,
    locationError, trackingError, checkinData, setCheckinData, handlePhotoCaptured, handleEmployeeChange, handleSubmit
  } = useCheckinLogic();

  return (
    <div className="bg-[#F5F7F9] min-h-screen pb-10 relative overflow-x-hidden">
      <AnimatePresence>
        {trackingError && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-6 right-6 z-[200] bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-3 border border-white/20 backdrop-blur-md"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">signal_cellular_off</span>
            </div>
            {trackingError}
          </motion.div>
        )}
        
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[200] bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-3 border border-white/20 backdrop-blur-md"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            Check-in thành công!
          </motion.div>
        )}
      </AnimatePresence>

      <CheckinHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-margin-edge">
        <div className="lg:col-span-2 space-y-6">
          <CheckinFormContainer>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {locationError && (
                <div className="bg-error-container/20 border-2 border-error p-4 rounded-lg flex items-start gap-3 animate-pulse">
                  <span className="material-symbols-outlined text-error">location_off</span>
                  <div className="flex flex-col">
                    <span className="font-label-bold text-error">Yêu cầu quyền vị trí</span>
                    <span className="text-body-md text-on-error-container leading-tight">{locationError}</span>
                  </div>
                </div>
              )}
              <EmployeeSelector employees={employees} employeeId={checkinData.employeeId} onChange={handleEmployeeChange} />
              <ShopInput shopName={checkinData.shopName} onChange={(val) => setCheckinData({ ...checkinData, shopName: val })} />
              <PhotoCapture 
                photo={photo} 
                isScanning={isScanning} 
                scanProgress={scanProgress} 
                onPhotoCaptured={handlePhotoCaptured} 
              />
              <LocationInfo location={location} address={address} />
              <ActionButtons isSubmitting={isSubmitting} isSuccess={isSuccess} isCheckedIn={isCheckedIn} location={location} />
            </form>
          </CheckinFormContainer>
        </div>
        <StatusSidebar location={location} />
      </div>
    </div>
  );
};

export default Checkin;
