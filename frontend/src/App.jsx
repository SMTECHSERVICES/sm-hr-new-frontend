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



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
        
        <Route path="/empdashboard" element={<EmployeeDashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/payrolls" element={<Payrolls />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/my-payslips" element={<MyPayslips />} />
        <Route path="/my-attendance" element={<MyAttendance />} />

        {/* Admin only routes */}

        <Route path='/admin' element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path='/admin/attendance' element={<AdminLayout><MarkAttendance /></AdminLayout>} />
        <Route path='/admin/employee/:id' element={<AdminLayout><EmployeeDetail /></AdminLayout>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
