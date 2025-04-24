import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Payrolls from './pages/Payrolls';
import Attendance from './pages/Attendance';
import MyPayslips from './pages/MyPayslips';
import MyAttendance from './pages/MyAttendance';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/payrolls" element={<Payrolls />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/my-payslips" element={<MyPayslips />} />
        <Route path="/my-attendance" element={<MyAttendance />} />
      </Routes>
    </Router>
  );
}

export default App;
