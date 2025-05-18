//import GetALLEmployee from '../components/GetALLEmployee'

// // function Dashboard() {
// //     return (
// //       <div className="p-4">
// //         <div className="flex ">
// //           <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
// //         </div>
// //         <div className="grid grid-cols-3 gap-4">
// //           <div className="bg-green-100 p-4 rounded shadow">Total Employees: 10</div>
// //           <div className="bg-blue-100 p-4 rounded shadow">Total Payrolls: ₹50000</div>
// //           <div className="bg-yellow-100 p-4 rounded shadow">Attendance Today: 8</div>
// //         </div>
// //       </div>
// //     );
// //   }
  
// //   export default Dashboard;
  
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [attendanceToday, setAttendanceToday] = useState(0);
//   const [attendanceHistory, setAttendanceHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `${token}` };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const empRes = await axios.get('http://localhost:5000/api/admin/employees/all', { headers });
//         const attRes = await axios.get('http://localhost:5000/api/attendance/today', { headers });
//         const histRes = await axios.get('http://localhost:5000/api/attendance/history', { headers });

//         setEmployees(empRes.data);
//         setAttendanceToday(attRes.data.presentCount);
//         setAttendanceHistory(histRes.data);
//       } catch (err) {
//         console.error('Error fetching admin dashboard data', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const markAttendance = async (empId, status) => {
//     try {
//       await axios.post(
//         'http://localhost:5000/api/attendance/mark',
//         { employeeId: empId, status, date: new Date() },
//         { headers }
//       );
//       alert('Attendance marked');
//     } catch (err) {
//       alert('Failed to mark attendance');
//     }
//   };

//   const generatePayslip = async (empId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/payroll/generate/${empId}`,
//         { headers, responseType: 'blob' } // if PDF
//       );
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `payslip_${empId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//     } catch (err) {
//       alert('Failed to generate payslip');
//     }
//   };

//   const grantLeave = async (empId) => {
//     try {
//       await axios.post(
//         `http://localhost:5000/api/leave/grant`,
//         { employeeId: empId, date: new Date() },
//         { headers }
//       );
//       alert('Leave granted');
//     } catch (err) {
//       alert('Failed to grant leave');
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading admin data...</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-8">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         <div className="bg-white shadow-md p-6 rounded">
//           <h2 className="text-lg font-semibold">Total Employees</h2>
//           <p className="text-3xl mt-2">{employees.length}</p>
//         </div>
//         <div className="bg-white shadow-md p-6 rounded">
//           <h2 className="text-lg font-semibold">Present Today</h2>
//           <p className="text-3xl mt-2">{attendanceToday}</p>
//         </div>
//       </div>

//       {/* Employee List + Actions */}
//       <div className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Manage Employees</h2>
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left border-b">
//               <th className="p-2">Name</th>
//               <th className="p-2">Department</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => (
//               <tr key={emp._id} className="border-b">
//                 <td className="p-2">{emp.name}</td>
//                 <td className="p-2">{emp.department}</td>
//                 <td className="p-2 space-x-2">
//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                     onClick={() => generatePayslip(emp._id)}
//                   >
//                     Payroll
//                   </button>
//                   <button
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                     onClick={() => markAttendance(emp._id, 'Present')}
//                   >
//                     Mark Present
//                   </button>
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                     onClick={() => grantLeave(emp._id)}
//                   >
//                     Grant Leave
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Attendance History */}
//       <div className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Attendance History</h2>
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left border-b">
//               <th className="p-2">Employee</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceHistory.map((entry, idx) => (
//               <tr key={idx} className="border-b">
//                 <td className="p-2">{entry.employee?.name || 'N/A'}</td>
//                 <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
//                 <td className="p-2">{entry.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };



// const AdminDashboard = () => {
//   return (
//     <div>
//       <GetALLEmployee />
//     </div>
//   )
// }

// export default AdminDashboard


//export default AdminDashboard;

import React from 'react';
import OverviewCard from '../../components/admin/OverviewCard';
import ActionCard from '../../components/admin/ActionCard';
import Sidebar from '../../components/admin/Sidebar';

function AdminDashboard() {
  return (
    <div className="flex">
     
      <div className="ml-64 flex-1 min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <OverviewCard title="Total Employees" value="52" color="border-blue-600" />
          <OverviewCard title="Present Today" value="48" color="border-green-600" />
          <OverviewCard title="Pending Leave Requests" value="4" color="border-red-600" />
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
