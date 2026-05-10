import { getFromGAS, postToGAS } from './config';

export interface Retailer {
  retailerId: string;
  retailerName: string;
  address: string;
  phone: string;
  distributorId: string;
  ownerName?: string;
  status?: string;
  totalOrders?: number;
  lastOrderDate?: string;
}

export const RetailerService = {
  getRetailersByDistributor: async (distributorId: string): Promise<Retailer[]> => {
    try {
      const data = await getFromGAS('getRetailers', { distributorId });
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching retailers by distributor:', error);
      return [];
    }
  },

  addRetailer: async (retailer: Omit<Retailer, 'retailerId'>): Promise<any> => {
    return postToGAS('addRetailer', retailer);
  }
};
