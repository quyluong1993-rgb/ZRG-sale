import { api, GAS_URL } from './config';
import { EmployeeService } from './employee';
import { InventoryService } from './inventory';
import { OrderService } from './order';
import { CheckinService } from './checkin';
import { AdminService } from './admin';
import { DashboardDataService } from './dashboard';

export { api, GAS_URL };

/**
 * Service xử lý dữ liệu Dashboard
 * Re-exporting all modular services into a single object for backward compatibility
 */
export const DashboardService = {
  ...DashboardDataService,
  ...InventoryService,
  ...CheckinService,
  ...EmployeeService,
  ...OrderService,
  ...AdminService,
};
