import { getFromGAS } from './config';

export const DashboardDataService = {
  getStats: () => getFromGAS('getDashboardStats'),
  getRecentActivity: () => getFromGAS('getRecentActivity'),
};
