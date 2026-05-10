import { useState, useEffect } from 'react';
import { DashboardService } from '../../../services/api';

export const useDashboardLogic = () => {
  const [data, setData] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showApprovalType, setShowApprovalType] = useState<'expense' | 'leave' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock data for pending items
  const [pendingExpensesItems, setPendingExpensesItems] = useState([
    { id: '1', user: 'Nguyễn Văn A', title: 'Công tác Hà Nội', amount: '2.500.000', date: '2024-05-08', status: 'pending' },
    { id: '2', user: 'Trần Thị B', title: 'Tiếp khách đối tác ZRG', amount: '1.200.000', date: '2024-05-07', status: 'pending' },
    { id: '3', user: 'Lê Văn C', title: 'Mua văn phòng phẩm', amount: '800.000', date: '2024-05-06', status: 'pending' },
  ]);

  const [pendingLeaveItems, setPendingLeaveItems] = useState([
    { id: 'L1', user: 'Phạm Văn D', title: 'Nghỉ ốm', type: 'Nghỉ ốm', date: '2024-05-10', status: 'pending' },
    { id: 'L2', user: 'Hoàng Thị E', title: 'Việc gia đình', type: 'Việc riêng', date: '2024-05-12', status: 'pending' },
  ]);

  const fetchDashboardData = async () => {
    try {
      const [summary, empList, retailerList, checkinList, inventoryList] = await Promise.all([
        DashboardService.getSummary(),
        DashboardService.getEmployees(),
        DashboardService.getRetailers(),
        DashboardService.getCheckins(),
        DashboardService.getInventory()
      ]);
      
      // Tính toán tổng chỉ tiêu từ danh sách nhân sự
      const totalTarget = empList.reduce((sum: number, emp: any) => {
        const target = parseFloat(emp["Target"] || emp["Monthly Target"] || 0);
        return sum + target;
      }, 0);

      // Tính toán doanh số đã đạt được (giả định từ đơn hàng trong summary)
      const achievedSales = (summary?.orders || []).reduce((sum: number, order: any) => {
        return sum + parseFloat(order["Total Amount"] || 0);
      }, 0);

      // Tính toán tổng hàng tồn kho từ dữ liệu thực tế
      const totalInventory = (inventoryList || []).reduce((sum: number, item: any) => {
        const qty = parseFloat(item["Quantity"] || item["Stock"] || 0);
        return sum + qty;
      }, 0);

      const staffLocationsMap = new Map();
      
      // Combine activity and checkins for maximum coverage
      const allEvents = [
        ...(summary?.recentActivity || []),
        ...(checkinList || [])
      ].sort((a, b) => {
        const timeA = new Date(a.Timestamp || a["Timestamp"] || 0).getTime();
        const timeB = new Date(b.Timestamp || b["Timestamp"] || 0).getTime();
        return timeB - timeA;
      });

      allEvents.forEach((act: any) => {
        const empId = act.Employee_ID || act["Employee ID"];
        const lat = act.lat || act.Latitude || act["Latitude"];
        const lng = act.lng || act.Longitude || act["Longitude"];
        const time = act.Timestamp || act["Timestamp"];
        const shop = act.Shop_ID || act["Shop Name"] || act.shopName;

        if (lat && lng && empId && !staffLocationsMap.has(empId)) {
          staffLocationsMap.set(empId, {
            id: empId,
            name: `NV: ${empId}`,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            lastUpdate: time ? new Date(time).toLocaleTimeString() : 'N/A',
            shopName: shop
          });
        }
      });

      // If no locations found, generate mock data for demo/first-use
      if (staffLocationsMap.size === 0 && empList.length > 0) {
        const hanoi = { lat: 21.0285, lng: 105.8542 };
        empList.forEach((emp: any, index: number) => {
          const id = emp.ID || emp.id || `EMP00${index + 1}`;
          staffLocationsMap.set(id, {
            id: id,
            name: `NV: ${emp.Name || id}`,
            lat: hanoi.lat + (Math.random() - 0.5) * 0.05,
            lng: hanoi.lng + (Math.random() - 0.5) * 0.05,
            lastUpdate: 'Dữ liệu mẫu',
            shopName: 'Đang di chuyển'
          });
        });
      }

      setData({
        ...summary,
        staffLocations: Array.from(staffLocationsMap.values()),
        stats: {
          ...(summary?.stats || {}),
          totalTarget,
          achievedSales,
          totalInventory,
          totalRetailers: retailerList.length,
          pendingExpenses: pendingExpensesItems.length,
          pendingExpensesTotal: pendingExpensesItems.reduce((sum, item) => sum + parseInt(item.amount.replace(/\./g, '')), 0),
          pendingLeaves: pendingLeaveItems.length
        }
      });
      setEmployees(empList);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu Dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (showApprovalType === 'expense') {
      setPendingExpensesItems(prev => prev.filter(item => item.id !== id));
    } else {
      setPendingLeaveItems(prev => prev.filter(item => item.id !== id));
    }
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleReject = async (id: string) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (showApprovalType === 'expense') {
      setPendingExpensesItems(prev => prev.filter(item => item.id !== id));
    } else {
      setPendingLeaveItems(prev => prev.filter(item => item.id !== id));
    }
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, [pendingExpensesItems.length, pendingLeaveItems.length]);

  return {
    data,
    employees,
    loading,
    showExpenseModal,
    setShowExpenseModal,
    showLeaveModal,
    setShowLeaveModal,
    showApprovalType,
    setShowApprovalType,
    pendingExpensesItems,
    pendingLeaveItems,
    handleApprove,
    handleReject,
    isSubmitting,
    setIsSubmitting,
    isSuccess,
    setIsSuccess,
    fetchDashboardData,
  };
};
