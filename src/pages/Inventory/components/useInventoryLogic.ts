import { useState, useEffect } from 'react';
import { DashboardService } from '../../../services/api';

export const productCatalog: {[key: string]: {name: string, category: string}} = {
  // Bỉm Dán (Tapes) - Đưa lên đầu theo yêu cầu
  \"BM-NB68\": { name: \"Babe-micci Dán NB68\", category: \"Tã dán\" },
  \"BM-S54\": { name: \"Babe-micci Dán S54\", category: \"Tã dán\" },
  \"BM-M50\": { name: \"Babe-micci Dán M50\", category: \"Tã dán\" },

  // Bỉm Quần (Pants)
  \"BM-M48\": { name: \"Babe-micci Quần M48\", category: \"Tã quần\" },
  \"BM-L44\": { name: \"Babe-micci Quần L44\", category: \"Tã quần\" },
  \"BM-XL42\": { name: \"Babe-micci Quần XL42\", category: \"Tã quần\" },
  \"BM-XXL38\": { name: \"Babe-micci Quần XXL38\", category: \"Tã quần\" },
  \"BM-3XL36\": { name: \"Babe-micci Quần 3XL36\", category: \"Tã quần\" },
};

export const useInventoryLogic = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newStock, setNewStock] = useState({
    itemID: '',
    quantity: '',
    location: 'Kho chính',
    status: 'Nhập mới'
  });

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const data = await DashboardService.getInventory();
      if (Array.isArray(data)) setInventory(data);
    } catch (error) {
      console.error(\"Lỗi load kho:\", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const productInfo = productCatalog[newStock.itemID];
      const dataToSubmit = {
        \"Item ID\": newStock.itemID,
        \"Item Name\": productInfo.name,
        \"Category\": productInfo.category,
        \"Quantity\": Number(newStock.quantity),
        \"Location\": newStock.location,
        \"Status\": newStock.status
      };
      await DashboardService.updateInventory(dataToSubmit);
      alert(`Đã nhập kho thành công: ${productInfo.name}`);
      setShowAddModal(false);
      setNewStock({ itemID: '', quantity: '', location: 'Kho chính', status: 'Nhập mới' });
      fetchInventory();
    } catch (error) {
      alert('Lỗi kết nối hệ thống!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    showAddModal, setShowAddModal, isSubmitting, inventory, isLoading, 
    newStock, setNewStock, fetchInventory, handleAddStock
  };
};
