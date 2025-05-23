import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import Employees from './pages/Employees';
import Payrolls from './pages/Payrolls';
import Attendance from './pages/Attendance';
import MyPayslips from './pages/MyPayslips';
import MyAttendance from './pages/MyAttendance';
import RegisterForm from './pages/RegisterForm';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import MarkAttendance from './pages/admin/EmployeeList'
import EmployeeDetail from './pages/admin/EmployeeDetail';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import PersonalAttendance from './pages/PersonalAttendance';
import LeaveRequestForm  from './pages/LeaveRequestForm';
import LeaveHistory from './pages/LeaveHistory';
import LeaveRequests from './pages/admin/LeaveRequests';
import LeaveReasonDetail from './pages/admin/LeaveReasonDetail';
import MarkAttendancePage from './pages/MarkAttendancePage';
import CreatePayroll from './pages/admin/CreatePayroll';
import GetSalarySlip from './pages/GetSalarySlip';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
        
        <Route path="/empdashboard" element={<EmployeeLayout><EmployeeDashboard /></EmployeeLayout>} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/payrolls" element={<Payrolls />} />
        <Route path="/my-attendance" element={<EmployeeLayout><PersonalAttendance /></EmployeeLayout>} />
        <Route path='/leave-request' element={<EmployeeLayout><LeaveRequestForm /></EmployeeLayout>} />
        <Route path='//leave-history' element={<EmployeeLayout><LeaveHistory /></EmployeeLayout>} />
        <Route path="/my-payslips" element={<MyPayslips />} />
         <Route path="/mark-attendance" element={<EmployeeLayout><MarkAttendancePage /></EmployeeLayout>} />
         <Route path="/salary-slip" element={<EmployeeLayout><GetSalarySlip /></EmployeeLayout>} />
        {/* <Route path="/my-attendance" element={<MyAttendance />} /> */}

        {/* Admin only routes */}

        <Route path='/admin' element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path='/admin/employees' element={<AdminLayout><MarkAttendance /></AdminLayout>} />
        
        <Route path='/admin/leave-requests' element={<AdminLayout><LeaveRequests /></AdminLayout>} />
        <Route path='/admin/employee/:id' element={<AdminLayout><EmployeeDetail /></AdminLayout>} />
        <Route path='/admin/leave/:id' element={<AdminLayout><LeaveReasonDetail /></AdminLayout>} />
        <Route path='/admin/payroll/generate/:id' element={<AdminLayout><CreatePayroll /></AdminLayout>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
