import React from 'react';
import { useDashboardLogic } from './components/useDashboardLogic';
import DashboardHeader from './components/DashboardHeader';
import DashboardStats from './components/DashboardStats';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import InventorySummary from './components/InventorySummary';
import PersonnelMap from './components/PersonnelMap';
import ExpenseModal from './components/ExpenseModal';
import LeaveModal from './components/LeaveModal';
import ApprovalModal from './components/ApprovalModal';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const logic = useDashboardLogic();

  if (logic.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-label-md text-on-surface-variant animate-pulse">Đang kết nối dữ liệu Google Sheets...</p>
        </div>
      </div>
    );
  }

  const stats = logic.data?.stats || { activeStaff: 0 };

  return (
    <div className="bg-[#F5F7F9] text-on-surface font-body-md min-h-screen relative overflow-x-hidden p-margin-edge">
      <AnimatePresence>
        {logic.isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[200] bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-3 border border-white/20 backdrop-blur-md"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            Thao tác thành công!
          </motion.div>
        )}
      </AnimatePresence>

      <DashboardHeader />
      <DashboardStats 
        employeesCount={logic.employees.length} 
        activeStaff={stats.activeStaff || 0}
        totalTarget={stats.totalTarget || 0}
        achievedSales={stats.achievedSales || 0}
        totalInventory={stats.totalInventory || 0}
        totalRetailers={stats.totalRetailers || 0}
        pendingExpenses={stats.pendingExpenses}
        pendingExpensesTotal={stats.pendingExpensesTotal}
        pendingLeaves={stats.pendingLeaves}
        onExpenseClick={() => logic.setShowApprovalType('expense')}
        onLeaveClick={() => logic.setShowApprovalType('leave')}
      />
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-gutter">
        <PersonnelMap locations={logic.data?.staffLocations || []} />
        <InventorySummary inventory={logic.data?.inventory || []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-gutter">
        <RecentActivity activities={logic.data?.recentActivity || []} />
      </div>

      {logic.showExpenseModal && <ExpenseModal onClose={() => logic.setShowExpenseModal(false)} />}
      {logic.showLeaveModal && <LeaveModal onClose={() => logic.setShowLeaveModal(false)} />}
      
      {logic.showApprovalType && (
        <ApprovalModal 
          type={logic.showApprovalType}
          items={logic.showApprovalType === 'expense' ? logic.pendingExpensesItems : logic.pendingLeaveItems}
          onClose={() => logic.setShowApprovalType(null)}
          onApprove={logic.handleApprove}
          onReject={logic.handleReject}
          isSubmitting={logic.isSubmitting}
        />
      )}
    </div>
  );
};

export default Dashboard;
