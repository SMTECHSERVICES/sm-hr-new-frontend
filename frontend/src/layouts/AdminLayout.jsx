// src/layouts/AdminLayout.jsx
import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import { useState } from 'react';
import { Menu } from 'lucide-react';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar overlay for small screens */}
      <div
        className={` cursor-pointer fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar component */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-blue-800 text-white transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar with hamburger for small screens */}
        <div className="bg-white shadow-md p-4 md:hidden flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="cursor-pointer text-blue-800">
            <Menu size={24} />
          </button>
         {/* { <h1 className="text-lg font-bold text-blue-800">Employee Dashboard</h1>} */}
        </div>

        {/* Page content */}
        <div className="p-4 md:ml-64 bg-gray-100 min-h-screen">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
