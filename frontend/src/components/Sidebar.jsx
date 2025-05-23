import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LogOut } from 'lucide-react';

function Sidebar({ closeSidebar }) {
  const handleLogout = () => {
    localStorage.clear('token');
  };

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-xl font-bold flex gap-2">
          <img src="/smlogo.png" className="h-11 w-11" alt="logo" /> Employee
        </h4>
        <button onClick={closeSidebar} className="cursor-pointer md:hidden">
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        <NavLink to="/empdashboard" className="hover:text-gray-300">Dashboard</NavLink>
        <NavLink to="/my-attendance" className="hover:text-gray-300">Attendance History</NavLink>
        <NavLink to="/leave-request" className="hover:text-gray-300">Leave Request</NavLink>
        <NavLink to="/leave-history" className="hover:text-gray-300">Leave History</NavLink>
        <NavLink to="/mark-attendance" className="hover:text-gray-300">Mark your attendance</NavLink>
        <NavLink to="/salary-slip" className="hover:text-gray-300">Get Your salary slip</NavLink>
        
        <NavLink to="/" className="hover:text-gray-300">
          <button onClick={handleLogout} className="flex items-center gap-2">
            <span>Logout</span>
            <LogOut size={22} />
          </button>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
