import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, MapPin, Users2 } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dash' },
    { to: '/customers', icon: Users2, label: 'Dist' },
    { to: '/orders', icon: ShoppingCart, label: 'Order' },
    { to: '/inventory', icon: Package, label: 'Stock' },
    { to: '/checkin', icon: MapPin, label: 'Check' },
  ];

  return (
    <nav className=\"lg:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t-2 border-outline-variant z-50 px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]\">
      <div className=\"flex justify-between items-center h-16 max-w-md mx-auto\">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center flex-1 gap-1 h-full transition-all duration-200
              ${isActive ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-on-surface'}
            `}
          >
            <div className={`
              p-1.5 rounded-xl transition-all duration-200
              ${({ isActive }: any) => isActive ? 'bg-primary/10' : ''}
            `}>
              <item.icon size={22} strokeWidth={2.5} />
            </div>
            <span className=\"text-[9px] font-black uppercase tracking-tighter\">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
