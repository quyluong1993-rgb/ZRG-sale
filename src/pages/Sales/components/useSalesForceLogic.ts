import { useState, useEffect } from 'react';
import { DashboardService } from '../../../services/api';

export const useSalesForceLogic = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [checkins, setCheckins] = useState<any[]>([]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await DashboardService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(\"Lỗi khi tải danh sách nhân sự:\", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleViewHistory = async (emp: any) => {
    setSelectedEmployee(emp);
    setShowHistoryModal(true);
    setLoading(true);
    try {
      const allCheckins = await DashboardService.getCheckins();
      const empCheckins = allCheckins.filter((c: any) => c.employeeId === emp[\"Employee ID\"]);
      setCheckins(empCheckins);
    } catch (error) {
      console.error(\"Lỗi khi tải lịch sử:\", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (emp: any) => {
    setSelectedEmployee(emp);
    setShowEditModal(true);
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    if (window.confirm(\"Bạn có chắc chắn muốn xóa nhân viên này không?\")) {
      try {
        await DashboardService.deleteEmployee(employeeId);
        setTimeout(() => fetchEmployees(), 1000);
        alert(\"Đã xóa nhân viên!\");
      } catch (error) {
        alert(\"Lỗi khi xóa nhân viên.\");
      }
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp[\"Full Name\"]?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp[\"Employee ID\"]?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp[\"Working Area\"]?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp[\"Phone\"]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    employees,
    loading,
    searchTerm,
    setSearchTerm,
    showAddModal,
    setShowAddModal,
    showExpenseModal,
    setShowExpenseModal,
    showLeaveModal,
    setShowLeaveModal,
    showHistoryModal,
    setShowHistoryModal,
    showEditModal,
    setShowEditModal,
    showNotificationModal,
    setShowNotificationModal,
    selectedEmployee,
    checkins,
    fetchEmployees,
    handleViewHistory,
    handleEditClick,
    handleDeleteEmployee,
    filteredEmployees
  };
};
