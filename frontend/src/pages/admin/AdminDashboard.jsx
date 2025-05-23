

import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios'
import OverviewCard from '../../components/admin/OverviewCard';
import ActionCard from '../../components/admin/ActionCard';
import Sidebar from '../../components/admin/Sidebar';

function AdminDashboard() {

    const [summary, setSummary] = useState({
    employeesCount: 0,
    presentCount: 0,
    absentCount: 0,
    leaveCount: 0,
  });

   const token = localStorage.getItem('token');
  const headers = { Authorization: `${token}` };

   useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/employees/allDetails', { headers });
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to load dashboard summary:', err);
      }
    };

    fetchSummary();
  }, []);
  
  return (
    <div className="flex">
     
      <div className="ml-64 flex-1 min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <OverviewCard title="Total Employees" value={summary.employeesCount} color="border-blue-600" />
          <OverviewCard title="Present Today" value={summary.presentCount} color="border-green-600" />
          <OverviewCard title="Absent Today" value={summary.absentCount} color="border-green-600" />
          <OverviewCard title="On Leave " value={summary.leaveCount} color="border-red-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard title="Employee Attendance" buttonLabel="Mark Attendance" path="/admin/attendance" bgColor="bg-blue-500" />
          <ActionCard title="Payroll Management" buttonLabel="Generate Payroll PDF" path="/admin/payroll" bgColor="bg-green-500" />
          <ActionCard title="Leave Management" buttonLabel="View Leave Requests" path="/admin/leave-requests" bgColor="bg-yellow-500" />
          <ActionCard title="Attendance History" buttonLabel="View Attendance Records" path="/admin/attendance-history" bgColor="bg-purple-500" />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
