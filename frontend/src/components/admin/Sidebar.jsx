import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LogOut } from 'lucide-react';

function Sidebar({ closeSidebar }) {
  const handleLogout = () => {
    localStorage.clear('token');
  };

  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-4 fixed">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-2xl font-bold flex gap-2">
          <img src="/smlogo.png" className="h-11 w-11" alt="logo" /> Admin
        </h4>
        <button onClick={closeSidebar} className="cursor-pointer md:hidden">
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-4 text-2xl">
        <NavLink to="/admin/dashboard" className="hover:text-gray-300">Dashboard</NavLink>
        <NavLink to="/admin/employees" className="hover:text-gray-300">Employees</NavLink>
        <NavLink to="/admin/payroll" className="hover:text-gray-300">Payroll</NavLink>
        <NavLink to="/admin/leave-requests" className="hover:text-gray-300">Leave Requests</NavLink>
        <NavLink to="/admin/attendance-history" className="hover:text-gray-300">Attendance History</NavLink>

        <NavLink to="/admin" className="hover:text-gray-300">
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
