import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Package, Users2, MapPin } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/sales', icon: Users, label: 'Sales Force' },
    { to: '/customers', icon: Users2, label: 'Distributors' },
    { to: '/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/inventory', icon: Package, label: 'Inventory' },
    { to: '/checkin', icon: MapPin, label: 'Field Check-in' },
  ];

  return (
    <aside className=\"hidden lg:flex flex-col w-64 bg-surface-container-lowest border-r-2 border-outline-variant h-screen sticky top-0\">
      <div className=\"p-8 border-b-2 border-outline-variant bg-surface-container-low\">
        <div className=\"flex items-center gap-3\">
          <div className=\"w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20\">
            <span className=\"font-black text-xl tracking-tighter\">Z</span>
          </div>
          <div>
            <h1 className=\"font-black text-lg text-on-surface leading-none tracking-tight\">ZRG SALES</h1>
            <p className=\"text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1\">Precision DMS</p>
          </div>
        </div>
      </div>

      <nav className=\"flex-1 p-6 space-y-2\">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-xl font-label-bold transition-all duration-200
              ${isActive 
                ? 'bg-primary text-on-primary shadow-md shadow-primary/20' 
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface hover:translate-x-1'}
            `}
          >
            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className=\"text-sm tracking-tight\">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className=\"p-6 border-t-2 border-outline-variant bg-surface-container-low\">
        <div className=\"flex items-center gap-3 p-3 rounded-xl border border-outline-variant bg-white\">
          <div className=\"w-8 h-8 rounded-full bg-slate-200 border border-outline-variant overflow-hidden\">
            <img src=\"https://api.dicebear.com/7.x/avataaars/svg?seed=Admin\" alt=\"avatar\" />
          </div>
          <div className=\"flex-1 min-w-0\">
            <p className=\"text-[11px] font-black text-on-surface truncate uppercase\">Quản trị viên</p>
            <p className=\"text-[9px] text-emerald-600 font-bold uppercase tracking-widest\">Hệ thống online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
