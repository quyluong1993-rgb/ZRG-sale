import { postToGAS } from './config';

export const AdminService = {
  submitExpense: async (expenseData: any) => {
    try {
      return await postToGAS('submitExpense', expenseData);
    } catch (error) {
      console.error('Error submitting expense:', error);
      throw error;
    }
  },

  requestLeave: async (leaveData: any) => {
    try {
      return await postToGAS('requestLeave', leaveData);
    } catch (error) {
      console.error('Error requesting leave:', error);
      throw error;
    }
  },

  sendNotification: async (notificationData: any) => {
    try {
      return await postToGAS('sendNotification', notificationData);
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  },
};
