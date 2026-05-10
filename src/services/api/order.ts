import { getFromGAS, postToGAS } from './config';

export const OrderService = {
  getOrders: async () => {
    try {
      const data = await getFromGAS('getOrders');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  createOrder: async (orderData: any) => {
    try {
      return await postToGAS('createOrder', orderData);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getRetailers: async () => {
    try {
      const data = await getFromGAS('getRetailers');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching retailers:', error);
      return [];
    }
  }
};
