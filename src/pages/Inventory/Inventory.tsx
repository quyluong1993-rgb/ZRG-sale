import React from 'react';
import { useInventoryLogic } from './components/useInventoryLogic';
import InventoryHeader from './components/InventoryHeader';
import InventoryStats from './components/InventoryStats';
import InventoryTable from './components/InventoryTable';
import AddStockModal from './components/AddStockModal';

const Inventory = () => {
  const logic = useInventoryLogic();

  return (
    <div className="bg-[#F5F7F9] min-h-screen relative pb-10">
      <InventoryHeader onAddClick={() => logic.setShowAddModal(true)} />
      
      <InventoryStats totalSku={logic.inventory.length} />

      <InventoryTable 
        inventory={logic.inventory} 
        isLoading={logic.isLoading} 
        onRefresh={logic.fetchInventory} 
      />

      {logic.showAddModal && (
        <AddStockModal 
          newStock={logic.newStock}
          setNewStock={logic.setNewStock}
          isSubmitting={logic.isSubmitting}
          onClose={() => logic.setShowAddModal(false)}
          onSubmit={logic.handleAddStock}
        />
      )}
    </div>
  );
};

export default Inventory;
