import { getFromGAS } from './config';

export const DashboardDataService = {
  getSummary: async () => {
    try {
      return await getFromGAS('getDashboard');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return null;
    }
  },
};
