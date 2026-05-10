import { getFromGAS, postToGAS } from './config';

export const CheckinService = {
  submitCheckin: async (checkinData: any) => {
    try {
      return await postToGAS('submitCheckin', checkinData);
    } catch (error) {
      console.error('Error submitting checkin:', error);
      throw error;
    }
  },

  getCheckins: async () => {
    try {
      const data = await getFromGAS('getCheckins');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching checkins:', error);
      return [];
    }
  },

  updateLocation: async (employeeId: string, lat: number, lng: number) => {
    try {
      return await postToGAS('updateLocation', { employeeId, lat, lng });
    } catch (error) {
      console.error('Error updating location:', error);
      return { success: false };
    }
  },
};
