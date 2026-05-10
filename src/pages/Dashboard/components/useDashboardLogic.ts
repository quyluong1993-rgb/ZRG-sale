import { useState, useEffect } from 'react';
import { DashboardService } from '../../../services/api';

export const useDashboardLogic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [stats, setStats] = useState({
    totalSales: 0,
    activeSales: 0,
    totalStock: 0,
    totalAgents: 0,
    pendingApprovals: 0
  });
  const [personnel, setPersonnel] = useState<any[]>([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Parallel loading for performance
      const [empData, invData, distData] = await Promise.all([
        DashboardService.getEmployees(),
        DashboardService.getInventory(),
        DashboardService.getDistributors()
      ]);

      const employees = Array.isArray(empData) ? empData : [];
      const inventory = Array.isArray(invData) ? invData : [];
      const distributors = Array.isArray(distData) ? distData : [];

      setStats({
        totalSales: employees.length,
        activeSales: employees.filter((e: any) => e.status === 'Hoạt động' || e.status === 'Đang Check-in').length,
        totalStock: inventory.reduce((sum: number, item: any) => sum + (Number(item.Quantity) || 0), 0),
        totalAgents: distributors.reduce((sum: number, d: any) => sum + (d.retailersCount || 0), 0),
        pendingApprovals: 2 // Mock for now
      });

      setPersonnel(employees);
      setLastSync(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(\"Dashboard Sync Error:\", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // Auto-sync every minute
    return () => clearInterval(interval);
  }, []);

  return { stats, isLoading, personnel, lastSync, refresh: loadData };
};
