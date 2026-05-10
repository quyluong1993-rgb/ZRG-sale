import { getFromGAS, postToGAS } from './config';

export type Retailer = {
  retailerId: string;
  retailerName: string;
  distributorId: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
};

export const RetailerService = {
  getRetailers: () => getFromGAS('getRetailers'),
  getRetailersByDistributor: (distributorId: string) => getFromGAS('getRetailers', { distributorId }),
  addRetailer: (data: any) => postToGAS('addRetailer', data),
};
