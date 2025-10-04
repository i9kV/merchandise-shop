import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  to: string;
}
interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', to: '/dashboard' },
    { icon: <FaSignOutAlt />, label: 'Logout', to: '/' },
  ];
  

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-gradient-to-b from-blue-800 to-blue-900 text-white min-h-screen transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {!collapsed && <span className="text-2xl font-bold">Admin Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </button>
        </div>

        <nav className="flex flex-col mt-6 gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded hover:bg-blue-700 transition ${
                  isActive ? 'bg-blue-700' : ''
                }`
              }
            >
              {item.icon}
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>
      </div>

{/* Mobile Sidebar */}
<div
  className={`md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 transform ${
    mobileOpen ? 'translate-x-0' : '-translate-x-full'
  } transition-transform duration-300`}
>
  <div className="bg-gradient-to-b from-blue-800 to-blue-900 w-64 h-full text-white p-4">
    <div className="flex justify-between items-center mb-6">
      <span className="text-2xl font-bold">Admin Panel</span>
      <button onClick={() => setMobileOpen(false)}>&times;</button>
    </div>

    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded hover:bg-blue-700 transition ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
          onClick={() => setMobileOpen(false)}
        >
          {item.icon} {item.label}
        </NavLink>
      ))}
    </nav>
  </div>
</div>

    </>
  );
};

export default Sidebar;
