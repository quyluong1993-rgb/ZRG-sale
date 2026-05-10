import { getFromGAS, postToGAS } from './config';

export const DistributorService = {
  getDistributors: () => getFromGAS('getDistributors'),
  addDistributor: (data: any) => postToGAS('addDistributor', data),
  updateDistributor: (data: any) => postToGAS('updateDistributor', data),
};
