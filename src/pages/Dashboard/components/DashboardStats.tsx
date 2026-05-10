import React from 'react';
import { Users, ShoppingBag, Box, Store } from 'lucide-react';
import StatCard from './StatCard';

interface Props {
  stats: any;
  isLoading: boolean;
}

const DashboardStats = ({ stats, isLoading }: Props) => {
  const statConfig = [
    { label: 'Tổng Nhân Viên', value: stats.totalSales, icon: Users, color: 'primary', trend: '+2 tuần này' },
    { label: 'Nhân Sự Online', value: stats.activeSales, icon: Users, color: 'emerald', trend: 'Live' },
    { label: 'Tổng Đại Lý', value: stats.totalAgents, icon: Store, color: 'amber', trend: 'Toàn quốc' },
    { label: 'Tồn Kho (Thùng)', value: stats.totalStock, icon: Box, color: 'blue', trend: 'Vừa cập nhật' }
  ];

  return (
    <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter\">
      {statConfig.map((stat, i) => (
        <StatCard 
          key={i}
          label={stat.label}
          value={isLoading ? '...' : stat.value}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
