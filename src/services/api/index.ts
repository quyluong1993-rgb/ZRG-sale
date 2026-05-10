import { GAS_CONFIG } from './config';

export const DashboardService = {
  // 1. Employees
  getEmployees: async () => {
    const response = await fetch(`${GAS_CONFIG.URL}?action=getEmployees`);
    return response.json();
  },
  
  updateEmployee: async (data: any) => {
    const response = await fetch(GAS_CONFIG.URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'updateEmployee', data })
    });
    return response.json();
  },

  // 2. Inventory
  getInventory: async () => {
    const response = await fetch(`${GAS_CONFIG.URL}?action=getInventory`);
    return response.json();
  },

  updateInventory: async (data: any) => {
    const response = await fetch(GAS_CONFIG.URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'updateInventory', data })
    });
    return response.json();
  },

  // 3. Distributors/Customers
  getDistributors: async () => {
    const response = await fetch(`${GAS_CONFIG.URL}?action=getDistributors`);
    return response.json();
  },

  // 4. Orders
  submitOrder: async (data: any) => {
    const response = await fetch(GAS_CONFIG.URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'submitOrder', data })
    });
    return response.json();
  },

  // 5. Check-in
  submitCheckin: async (data: any) => {
    const response = await fetch(GAS_CONFIG.URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'submitCheckin', data })
    });
    return response.json();
  }
};
