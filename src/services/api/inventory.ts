import { getFromGAS, postToGAS } from './config';

export const InventoryService = {
  getInventory: () => getFromGAS('getInventory'),
  updateStock: (data: any) => postToGAS('updateInventory', data),
};
