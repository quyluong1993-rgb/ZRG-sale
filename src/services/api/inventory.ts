import { getFromGAS, postToGAS } from './config';

export const InventoryService = {
  getInventory: async () => {
    try {
      return await getFromGAS('getInventory');
    } catch (error) {
      console.error("Lỗi khi lấy danh sách kho:", error);
      return [];
    }
  },

  updateInventory: async (inventoryData: any) => {
    try {
      return await postToGAS('updateInventory', { data: inventoryData });
    } catch (error) {
      console.error("Lỗi khi cập nhật kho:", error);
      return { success: false, error };
    }
  },
};
