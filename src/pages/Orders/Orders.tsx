import React from 'react';
import OrderHeader from './components/OrderHeader';
import OrderStats from './components/OrderStats';
import EmptyState from './components/EmptyState';
import OrderList from './components/OrderList';
import AddOrderModal from './components/AddOrderModal';
import { useOrderLogic } from './components/useOrderLogic';

const Orders = () => {
  const logic = useOrderLogic();

  return (
    <div className="bg-[#F5F7F9] min-h-screen pb-20">
      <OrderHeader onAddClick={() => logic.setShowAddModal(true)} />
      <OrderStats orders={logic.orders} />
      
      {logic.orders && logic.orders.length > 0 ? (
        <OrderList orders={logic.orders} />
      ) : (
        <EmptyState />
      )}
      
      {logic.showAddModal && (
        <AddOrderModal 
          {...logic} 
          onClose={() => logic.setShowAddModal(false)} 
          onSubmit={logic.handleCreateOrder} 
        />
      )}
    </div>
  );
};

export default Orders;
