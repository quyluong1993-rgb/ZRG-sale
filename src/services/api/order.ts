import { getFromGAS, postToGAS } from './config';

export const OrderService = {
  getOrders: () => getFromGAS('getOrders'),
  submitOrder: (data: any) => postToGAS('submitOrder', data),
};
