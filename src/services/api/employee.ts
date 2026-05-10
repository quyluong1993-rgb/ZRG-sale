import { getFromGAS, postToGAS } from './config';

export const EmployeeService = {
  getEmployees: () => getFromGAS('getEmployees'),
  addEmployee: (data: any) => postToGAS('addEmployee', data),
  updateEmployee: (data: any) => postToGAS('updateEmployee', data),
};
