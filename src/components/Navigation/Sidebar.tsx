import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Package, MapPin, Settings, LogOut, Building2 } from 'lucide-react';

const NavItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded transition-all group ${
        isActive 
          ? 'bg-primary text-on-primary' 
          : 'text-on-surface-variant hover:bg-surface-container-high'
      }`}
    >
      <Icon size={20} className={isActive ? 'text-on-primary' : 'text-on-surface-variant group-hover:text-on-surface'} />
      <span className="font-label-md text-label-md">{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 bg-surface-container-low border-r-2 border-outline-variant flex-col sticky top-0 h-screen">
      <div className="p-6 border-b-2 border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-on-primary rounded flex items-center justify-center font-black text-xl">B</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight leading-none text-on-surface">BABE-MICCI</span>
            <span className="text-[10px] font-black tracking-widest text-primary uppercase mt-1">DMS GLOBAL</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 flex flex-col gap-1">
        <NavItem icon={LayoutDashboard} label="Bảng điều khiển" path="/" />
        <NavItem icon={Users} label="Đội ngũ Sales" path="/sales" />
        <NavItem icon={ShoppingCart} label="Đơn hàng" path="/orders" />
        <NavItem icon={Package} label="Kho hàng" path="/inventory" />
        <NavItem icon={Building2} label="Nhà phân phối" path="/customers" />
        <NavItem icon={MapPin} label="Check-in GPS" path="/checkin" />
        <div className="my-4 border-t border-outline-variant/30"></div>
        <NavItem icon={Settings} label="Cấu hình hệ thống" path="/settings" />
      </nav>

      <div className="p-4 border-t-2 border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-3 p-2 rounded hover:bg-surface-container-high transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
            <LogOut size={16} className="text-on-secondary-container" />
          </div>
          <span className="font-label-md text-on-surface-variant group-hover:text-on-surface">Đăng xuất</span>
        </div>
      </div>
    </aside>
  );
};
