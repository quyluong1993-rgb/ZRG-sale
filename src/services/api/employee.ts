import { getFromGAS, postToGAS } from './config';

export const EmployeeService = {
  getEmployees: async () => {
    try {
      const data = await getFromGAS('getEmployees');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  },

  addEmployee: async (employeeData: any) => {
    try {
      return await postToGAS('addEmployee', employeeData);
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  },

  deleteEmployee: async (employeeId: string) => {
    try {
      return await postToGAS('deleteEmployee', { employeeId });
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  },

  updateEmployee: async (employeeData: any) => {
    try {
      return await postToGAS('updateEmployee', employeeData);
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },
};
