import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import Dashboard from './pages/Dashboard/Dashboard';
import SalesForce from './pages/Sales/SalesForce';
import Inventory from './pages/Inventory/Inventory';
import Orders from './pages/Orders/Orders';
import Checkin from './pages/CheckIn/Checkin';
import Customers from './pages/Customers';
import { Sidebar } from './components/Navigation/Sidebar';
import { BottomNav } from './components/Navigation/BottomNav';
import { MobileHeader } from './components/Navigation/MobileHeader';
import './styles/index.css';

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-margin-edge">
    <div className="mb-8">
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">{title}</h1>
      <p className="font-body-md text-body-md text-on-surface-variant">Babe-micci {title} Module Under Construction</p>
    </div>
    <div className="bg-surface-container-low p-12 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl min-h-[300px]">
      <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
        <Package className="text-on-surface-variant opacity-50" size={32} />
      </div>
      <p className="text-on-surface-variant font-medium">Coming Soon</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-surface flex flex-col md:flex-row font-body overflow-x-hidden">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Sidebar Navigation (Desktop) */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-surface-bright pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sales" element={<SalesForce />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/checkin" element={<Checkin />} />
              <Route path="/settings" element={<Placeholder title="Cấu hình" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        {/* Bottom Navigation (Mobile) */}
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
