import React from 'react';
import StatCard from './components/StatCard';
import RevenueChart from './components/RevenueChart';
import PersonnelMap from './components/PersonnelMap';
import ActivityFeed from './components/ActivityFeed';
import { useDashboardLogic } from './components/useDashboardLogic';
import DashboardStats from './components/DashboardStats';
import PendingApprovals from './components/PendingApprovals';

const Dashboard = () => {
  const { stats, isLoading, personnel, lastSync } = useDashboardLogic();

  return (
    <div className=\"bg-[#F5F7F9] min-h-screen relative pb-10\">
      <div className=\"mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4\">
        <div>
          <h1 className=\"font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-2 text-primary\">Trung tâm Điều hành ZRG</h1>
          <p className=\"font-body-md text-body-md text-on-surface-variant\">Hệ thống quản trị bán hàng thực địa real-time.</p>
        </div>
        <div className=\"flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-outline-variant shadow-sm\">
          <div className=\"w-2 h-2 bg-emerald-500 rounded-full animate-pulse\"></div>
          <span className=\"font-label-bold text-xs uppercase tracking-wider text-on-surface-variant\">Dữ liệu: {lastSync}</span>
        </div>
      </div>

      <DashboardStats stats={stats} isLoading={isLoading} />

      <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-gutter\">
        <div className=\"lg:col-span-2 space-y-gutter\">
          <PersonnelMap personnel={personnel} />
          <RevenueChart />
        </div>
        
        <div className=\"space-y-gutter\">
          <PendingApprovals />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
