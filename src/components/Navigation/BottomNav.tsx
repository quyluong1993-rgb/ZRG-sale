import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, MapPin, MoreHorizontal } from 'lucide-react';

const NavItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link
      to={path}
      className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${
        isActive 
          ? 'text-primary' 
          : 'text-on-surface-variant'
      }`}
    >
      <div className={`p-1 px-4 rounded-full transition-all ${isActive ? 'bg-secondary-container' : ''}`}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-label-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
        {label}
      </span>
    </Link>
  );
};

export const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-low border-t border-outline-variant px-2 py-2 flex items-center justify-around z-50 pb-[safe-area-inset-bottom]">
      <NavItem icon={LayoutDashboard} label="Home" path="/" />
      <NavItem icon={ShoppingCart} label="Đơn hàng" path="/orders" />
      <NavItem icon={MapPin} label="Check-in" path="/checkin" />
      <NavItem icon={Package} label="Kho" path="/inventory" />
      <NavItem icon={MoreHorizontal} label="Thêm" path="/sales" />
    </div>
  );
};
