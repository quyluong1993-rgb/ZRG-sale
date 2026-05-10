import { postToGAS } from './config';

export const AdminService = {
  approveExpense: (id: string) => postToGAS('approveExpense', { id }),
  approveLeave: (id: string) => postToGAS('approveLeave', { id }),
};
