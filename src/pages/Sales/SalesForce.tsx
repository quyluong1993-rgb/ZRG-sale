import React from 'react';
import { useSalesForceLogic } from './components/useSalesForceLogic';
import SalesHeader from './components/SalesHeader';
import SalesToolbar from './components/SalesToolbar';
import EmployeeCard from './components/EmployeeCard';
import AddEmployeeModal from './components/AddEmployeeModal';
import EditEmployeeModal from './components/EditEmployeeModal';
import HistoryModal from './components/HistoryModal';
import ExpenseModal from './components/ExpenseModal';
import LeaveModal from './components/LeaveModal';
import NotificationModal from './components/NotificationModal';
import { motion, AnimatePresence } from 'framer-motion';

const SalesForce = () => {
  const logic = useSalesForceLogic();

  return (
    <div className=\"bg-[#F5F7F9] min-h-screen relative pb-20\">
      <SalesHeader 
        onShowNotification={() => logic.setShowNotificationModal(true)}
        onShowExpense={() => logic.setShowExpenseModal(true)}
        onShowLeave={() => logic.setShowLeaveModal(true)}
        onShowAdd={() => logic.setShowAddModal(true)}
      />

      <SalesToolbar 
        searchTerm={logic.searchTerm}
        onSearchChange={logic.setSearchTerm}
      />

      {logic.loading ? (
        <div className=\"flex flex-col items-center justify-center py-20 gap-4\">
          <div className=\"w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin\"></div>
          <p className=\"font-label-md text-on-surface-variant\">Đang tải dữ liệu đội ngũ...</p>
        </div>
      ) : (
        <div className=\"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500\">
          {logic.filteredEmployees.map((emp) => (
            <EmployeeCard 
              key={emp[\"Employee ID\"]}
              employee={emp}
              onViewHistory={() => logic.handleViewHistory(emp)}
              onEdit={() => logic.handleEditClick(emp)}
              onDelete={() => logic.handleDeleteEmployee(emp[\"Employee ID\"])}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {logic.showAddModal && (
          <AddEmployeeModal 
            onClose={() => logic.setShowAddModal(false)}
            onSuccess={logic.fetchEmployees}
          />
        )}

        {logic.showEditModal && (
          <EditEmployeeModal 
            employee={logic.selectedEmployee}
            onClose={() => logic.setShowEditModal(false)}
            onSuccess={logic.fetchEmployees}
          />
        )}

        {logic.showHistoryModal && (
          <HistoryModal 
            employee={logic.selectedEmployee}
            checkins={logic.checkins}
            onClose={() => logic.setShowHistoryModal(false)}
          />
        )}

        {logic.showExpenseModal && (
          <ExpenseModal onClose={() => logic.setShowExpenseModal(false)} />
        )}

        {logic.showLeaveModal && (
          <LeaveModal onClose={() => logic.setShowLeaveModal(false)} />
        )}

        {logic.showNotificationModal && (
          <NotificationModal onClose={() => logic.setShowNotificationModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalesForce;
