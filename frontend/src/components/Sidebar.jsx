import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-8 flex gap-2"><img src='/smlogo.png' className='h-11 w-11 ' alt="" />sm-hr-admin</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/empdashboard" className="hover:text-gray-300">Dashboard</NavLink>
        <NavLink to="/my-attendance" className="hover:text-gray-300">Attendance History</NavLink>
        {/* <NavLink to="/admin/payroll" className="hover:text-gray-300">Payroll</NavLink> */}
        <NavLink to="/leave-request" className="hover:text-gray-300">Leave Request</NavLink>
        <NavLink to="/leave-history" className="hover:text-gray-300">Leave History</NavLink>
        <NavLink to="/mark-attendance" className="hover:text-gray-300">Mark your attendance</NavLink>
        
      </nav>
    </div>
  );
}

export default Sidebar;