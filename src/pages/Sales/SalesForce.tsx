import React from 'react';
import { useSalesForceLogic } from './components/useSalesForceLogic';

// Components
import AddEmployeeModal from './components/AddEmployeeModal';
import ExpenseModal from './components/ExpenseModal';
import LeaveModal from './components/LeaveModal';
import HistoryModal from './components/HistoryModal';
import NotificationModal from './components/NotificationModal';
import EmployeeCard from './components/EmployeeCard';
import SalesHeader from './components/SalesHeader';
import SalesToolbar from './components/SalesToolbar';
import EditEmployeeModal from './components/EditEmployeeModal';

const SalesForce = () => {
  const logic = useSalesForceLogic();

  if (logic.loading && logic.employees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-label-md text-on-surface-variant animate-pulse">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7F9] min-h-screen relative">
      {logic.showAddModal && <AddEmployeeModal onClose={() => logic.setShowAddModal(false)} onSuccess={logic.fetchEmployees} />}
      {logic.showEditModal && <EditEmployeeModal emp={logic.selectedEmployee} onClose={() => logic.setShowEditModal(false)} onSuccess={logic.fetchEmployees} />}
      {logic.showExpenseModal && <ExpenseModal onClose={() => logic.setShowExpenseModal(false)} />}
      {logic.showLeaveModal && <LeaveModal onClose={() => logic.setShowLeaveModal(false)} />}
      {logic.showNotificationModal && <NotificationModal onClose={() => logic.setShowNotificationModal(false)} />}
      {logic.showHistoryModal && <HistoryModal selectedEmployee={logic.selectedEmployee} checkins={logic.checkins} loading={logic.loading} onClose={() => logic.setShowHistoryModal(false)} />}

      <SalesHeader 
        onShowNotification={() => logic.setShowNotificationModal(true)}
        onShowExpense={() => logic.setShowExpenseModal(true)}
        onShowLeave={() => logic.setShowLeaveModal(true)}
        onShowAdd={() => logic.setShowAddModal(true)}
      />

      <SalesToolbar searchTerm={logic.searchTerm} onSearchChange={logic.setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {logic.filteredEmployees.map((emp, index) => (
          <EmployeeCard key={index} emp={emp} onDelete={logic.handleDeleteEmployee} onEdit={logic.handleEditClick} onViewHistory={logic.handleViewHistory} />
        ))}
      </div>
    </div>
  );
};

export default SalesForce;
