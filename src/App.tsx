import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Navigation/Sidebar';
import { BottomNav } from './components/Navigation/BottomNav';
import { MobileHeader } from './components/Navigation/MobileHeader';
import Dashboard from './pages/Dashboard/Dashboard';
import SalesForce from './pages/Sales/SalesForce';
import Inventory from './pages/Inventory/Inventory';
import Orders from './pages/Orders/Orders';
import Checkin from './pages/CheckIn/Checkin';
import Customers from './pages/Customers';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-surface">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <MobileHeader />
          
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sales" element={<SalesForce />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkin" element={<Checkin />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
